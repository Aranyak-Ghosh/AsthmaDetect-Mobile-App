import { Component, NgZone } from "@angular/core";
import { NavController } from "ionic-angular";

import { Nonin3230Provider } from "../../providers/nonin3230/nonin3230";
import { FitbitProvider } from "../../providers/fitbit/fitbit";
import { InAppBrowser } from "@ionic-native/in-app-browser";

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
    private fitbit: FitbitProvider
  ) {
    console.log("In Constructor");
    this.spo2 = 0;
    this.heartrate = 0;
    this.deferred();
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
        debugger;
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
    this.fitbit.getSleep();
  }

  scan() {
    this.nonin3230.scanAndConnect().subscribe(data => {
      this.ngzone.run(() => {
        this.spo2 = data.spo2;
        this.heartrate = data.pulse;
      });
    });
  }

  getData() {
    console.log("Starting Listener");
  }
}
