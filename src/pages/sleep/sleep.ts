import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { FitbitProvider } from "../../providers/fitbit/fitbit";
import { UtilServicesProvider } from "../../providers/util-services/util-services";

/**
 * Generated class for the SleepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-sleep",
  templateUrl: "sleep.html"
})
export class SleepPage {
  date: any;
  type: "string";
  filterSelected: boolean = false;
  options = {
    from: new Date("January 1, 2018"),
    to: new Date(),
    color: "danger"
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fitbit: FitbitProvider,
    private util: UtilServicesProvider
  ) {}

  toggleFilter() {
    this.filterSelected = !this.filterSelected;
  }

  async submit() {
    let data = await this.fitbit.getSleep(
      this.date.toISOString().split("T")[0]
    );
    console.log(data);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SleepPage");
  }

  onChange(event) {
    // console.log(event.toISOString());
    console.log(this.date.toISOString().split("T")[0]);
  }
}
