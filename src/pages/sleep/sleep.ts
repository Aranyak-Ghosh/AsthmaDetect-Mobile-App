import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { FitbitProvider } from "../../providers/fitbit/fitbit";
import { UtilServicesProvider } from "../../providers/util-services/util-services";

import { Chart } from "chart.js";
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
  @ViewChild("sleepChart")
  sleepChart: ElementRef;
  date: any;
  type: String = "string";
  filterSelected: boolean = false;
  options = {
    from: new Date("January 1, 2018"),
    to: new Date(),
    color: "danger"
  };
  graph: any;
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
      this.date
    );
    console.log(data);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SleepPage");
    this.graph = new Chart(this.sleepChart.nativeElement, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

}
