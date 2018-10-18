import { Component, NgZone } from "@angular/core";
import { NavController } from "ionic-angular";
import { Diagnostic } from "@ionic-native/diagnostic";

import { Nonin3230Provider } from "../../providers/nonin3230/nonin3230";
import { FitbitProvider } from "../../providers/fitbit/fitbit";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Platform } from "ionic-angular";
import { UtilServicesProvider } from "../../providers/util-services/util-services";

import { SleepPage } from "../sleep/sleep";
import { SpirometryPage } from "../spirometry/spirometry";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  spo2: number;
  heartrate: number;
  errCB = err => console.log(err);
  btEnabled: boolean;

  constructor(
    public navCtrl: NavController,
    private nonin3230: Nonin3230Provider,
    private ngzone: NgZone,
    private inAppBrowser: InAppBrowser,
    private fitbit: FitbitProvider,
    private diagnostic: Diagnostic,
    private utilService: UtilServicesProvider,
    private platform: Platform
  ) {
    console.log("In Constructor");
    this.spo2 = 0;
    this.heartrate = 0;
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

  spirometry() {
    this.navCtrl.push(SpirometryPage);
  }
  ionViewDidLoad() {
    console.log("HomePage Loaded");
  }

  async deferred() {
    let token;
    try {
      token = await this.fitbit.getToken();
      // debugger
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

  sleep() {
    console.log("sleep");
    this.navCtrl.push(SleepPage);
  }

  scan() {
    this.nonin3230.scanAndConnect().subscribe(data => {
      this.ngzone.run(() => {
        this.spo2 = data.spo2;
        this.heartrate = data.pulse;
      });
    });
  }
}
