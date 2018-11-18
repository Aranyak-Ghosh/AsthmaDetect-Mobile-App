import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { FitbitProvider } from "../../providers/fitbit/fitbit";
import { UtilServicesProvider } from "../../providers/util-services/util-services";

import { Chart } from "chart.js";

/**
 * Generated class for the HeartratePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-heartrate",
  templateUrl: "heartrate.html"
})
export class HeartratePage {
  @ViewChild("heartratechart") heartRate: ElementRef;
  date: any;
  labels: Array<Date>;
  hr: Array<Number>;
  type: String = "string";
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
  ) {
    this.labels = new Array<Date>();
    this.hr = new Array<Number>();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HeartratePage");
  }

  toggleFilter() {
    this.filterSelected = !this.filterSelected;
  }

  async submit() {
    try {
      let data: any = await this.fitbit.getHeartrate(this.date);

      if (data.dataset && data.dataset.length) {
        data.dataset.forEach(element => {
          let yyyy = this.date.split("-")[0];
          let mm = this.date.split("-")[1];
          let dd = this.date.split("-")[2];
          let h = element.time.split(":")[0];
          let m = element.time.split(":")[1];
          this.labels.push(new Date(yyyy, mm, dd, h, m));
          this.hr.push(element.value);
        });
      }

      let op = {
        labels: this.labels,
        datasets: [
          {
            fill: false,
            data: this.hr,
            label: "HeartRate",
            borderColor: "#fe8b36",
            backgroundColor: "#fe8b36",
            lineTension: 0
          }
        ]
      };
      new Chart(this.heartRate.nativeElement, {
        type: "line",
        data: op,
        options: {
          fill: false,
          responsive: true,
          scales: {
            xAxes: [
              {
                type: "time",
                display: true,
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
          }
        }
      });
    } catch (err) {
      this.util.showToast(
        "An Error Occured requesting information. Try again letter"
      );
      console.log(err);
    }
  }
}
