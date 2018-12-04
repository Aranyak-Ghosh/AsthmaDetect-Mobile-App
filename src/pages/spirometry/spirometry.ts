import { Component, NgZone, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";

import { ModalSpiroPage } from "../../modals/spiro/spiro";

import { Chart } from "chart.js";

import { VitalProvider } from "../../providers/vital/vital";
import { UtilServicesProvider } from "../../providers/util-services/util-services";
/**
 * Generated class for the SpirometryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-spirometry",
  templateUrl: "spirometry.html"
})
export class SpirometryPage {
  filterSelected: boolean = false;
  data: any;
  @ViewChild("spiroChart") chart: ElementRef;
  graph: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private ngzone: NgZone,
    private vital: VitalProvider,
    private util: UtilServicesProvider
  ) {
    this.deffered();
  }
  async deffered() {
    try {
      this.data = await this.vital.retrieveVitals();
      this.util.dismissLoader();
    } catch (err) {
      console.log(err);
      this.util.dismissLoader();
      this.util.showAlertBasic("Error", "Could not contact server!");
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SpirometryPage");
  }

  toggleFilter() {
    this.filterSelected = !this.filterSelected;
  }

  updateChart(vital) {
    console.log(vital);
    let labels = [];
    let vals = [];
    this.data.forEach(element => {
      if (element.value[vital]) {
        labels.push(element.time);
        vals.push(element.value[vital]);
      }
    });

    let op = {
      labels: labels,
      datasets: [
        {
          fill: false,
          data: vals,
          label: vital,
          borderColor: "#fe8b36",
          backgroundColor: "#fe8b36",
          lineTension: 0
        }
      ]
    };

    if (vals.length)
      this.ngzone.run(() => {
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
                  scaleLabel: {
                    display: true,
                    labelString: "Date Recorded"
                  }
                }
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: vital
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
    else {
      this.util.showAlertBasic("Error", "No Values for this vital exist");
    }
  }

  showModal() {
    this.modalCtrl.create(ModalSpiroPage).present();
  }
}
