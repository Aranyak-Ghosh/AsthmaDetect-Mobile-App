import {
  Component,
  NgZone,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList
} from "@angular/core";
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
  @ViewChildren("canvas") charts: QueryList<ElementRef>;
  date: any;
  type: String = "string";
  filterSelected: boolean = false;
  sleepData: any;
  labels: Array<Date>;
  value: Array<String>;
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
    private util: UtilServicesProvider,
    private ngZone: NgZone,
    private el:ElementRef
  ) {
    this.labels = [];
    this.value = [];
  }

  toggleFilter() {
    this.filterSelected = !this.filterSelected;
  }

  async submit() {
    this.ngZone.run(async () => {
      try {
        this.sleepData = await this.fitbit.getSleep(this.date);
        
        this.charts.forEach((element, index) => {
          console.log(index)
          this.labels=[];
          this.value=[];
          this.sleepData[index].levels.data.forEach(x => {
            this.labels.push(new Date(x.dateTime));
            this.value.push(x.level);
          });
          let op = {
            labels: this.labels,
            datasets: [
              {
                fill: false,
                data: this.value,
                label: "HeartRate",
                borderColor: "#fe8b36",
                backgroundColor: "#fe8b36",
                lineTension: 0
              }
            ]
          };
          new Chart(element.nativeElement, {
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
              }
            }
          });
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SleepPage");
    // this.graph = new Chart(this.sleepChart.nativeElement, {
    //   type: "bar",
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)",
    //           "rgba(255, 159, 64, 0.2)"
    //         ],
    //         borderColor: [
    //           "rgba(255,99,132,1)",
    //           "rgba(54, 162, 235, 1)",
    //           "rgba(255, 206, 86, 1)",
    //           "rgba(75, 192, 192, 1)",
    //           "rgba(153, 102, 255, 1)",
    //           "rgba(255, 159, 64, 1)"
    //         ],
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });
  }
}
