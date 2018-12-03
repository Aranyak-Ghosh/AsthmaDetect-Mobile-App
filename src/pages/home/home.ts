import { Component, NgZone, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "ionic-angular";
import { Diagnostic } from "@ionic-native/diagnostic";

import { Nonin3230Provider } from "../../providers/nonin3230/nonin3230";
import { FitbitProvider } from "../../providers/fitbit/fitbit";
import { AuthProvider } from "../../providers/auth/auth";
import { UtilServicesProvider } from "../../providers/util-services/util-services";

import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Platform } from "ionic-angular";
import { Chart } from "chart.js";

import { SleepPage } from "../sleep/sleep";
import { SpirometryPage } from "../spirometry/spirometry";
import { HeartratePage } from "../heartrate/heartrate";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("chart")
  chart: ElementRef;
  spo2: number;
  heartrate: number;
  btEnabled: boolean;
  graph: any;
  spo2arr = [];
  heartRatearr = [];
  labels: Array<Date>;
  vitals: Array<Number>;

  pages = {
    heartrate: HeartratePage,
    sleep: SleepPage,
    spirometry: SpirometryPage
  };

  constructor(
    public navCtrl: NavController,
    private nonin3230: Nonin3230Provider,
    private ngzone: NgZone,
    private inAppBrowser: InAppBrowser,
    private fitbit: FitbitProvider,
    private auth: AuthProvider,
    private diagnostic: Diagnostic,
    private utilService: UtilServicesProvider,
    private platform: Platform
  ) {
    console.log("In Constructor");
    this.spo2 = 0;
    this.heartrate = 0;
    this.labels = new Array<Date>();
    this.vitals = new Array<Number>();

    this.diagnostic.registerBluetoothStateChangeHandler(state => {
      if (state == this.diagnostic.bluetoothState.POWERED_OFF) {
        this.utilService.showConfirm(
          "Bluetooth",
          "Please Turn on Bluetooth",
          "Close App",
          "Turn on Bluetooth",
          () => {
            this.platform.exitApp();
          },
          () => {
            this.diagnostic.setBluetoothState(true);
          }
        );
      } else if (state == this.diagnostic.bluetoothState.POWERED_ON) {
        this.scan();
      }
    });
    this.platform.registerBackButtonAction(() => {
      this.platform.exitApp();
    }, 10);
    this.deferred();
  }

  doRefresh(refresher) {
    this.scan();
    setTimeout(refresher.complete(), 1000);
  }

  ionViewDidLoad() {
    console.log("HomePage Loaded");
  }

  async deferred() {
    let token;
    try {
      token = await this.fitbit.getToken();

      if (token == null) {
        let data: any = await this.fitbit.getAuthURL();
        let win = this.inAppBrowser.create(
          `${data.auth_url}`,
          "_blank",
          "location=yes"
        );
        win.on("exit").subscribe(data => {
          this.fitbit.reqToken();
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  scan() {
    this.nonin3230.scanAndConnect().subscribe(data => {
      this.spo2arr.push({ t: new Date(), y: data.spo2 });
      this.heartRatearr.push({ t: new Date(), y: data.heartrate });
      this.vitals.push(data.pulse);
      this.labels.push(new Date());
      let op = {
        labels: this.labels,
        datasets: [
          {
            fill: false,
            data: this.vitals,
            label: "HeartRate",
            borderColor: "#fe8b36",
            backgroundColor: "#fe8b36",
            lineTension: 0
          }
        ]
      };
      this.ngzone.run(() => {
        this.spo2 = data.spo2;
        this.heartrate = data.pulse;
        this.graph = new Chart(this.chart.nativeElement, {
          type: "line",
          data: op,
          options: {
            fill: false,
            responsive: true,
            scales: {
              xAxes: [
                {
                  type: "time",
                  display: false,
                  scaleLabel: {
                    display: true,
                    labelString: "Time"
                  },
                  ticks: {
                    display: false //this will remove only the label
                  }
                }
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Heart Rate"
                  }
                }
              ]
            },
            animation: {
              duration: 0
            }
          }
        });
      });
    });
  }

  async logout() {
    let success = await this.auth.logout();
    if (success) this.navCtrl.popToRoot();
    else
      this.utilService.showAlertBasic(
        "Error",
        "There was an error logging you out! Try Again Later."
      );
  }

  navToPage(page) {
    this.navCtrl.push(this.pages[page]);
  }
}
