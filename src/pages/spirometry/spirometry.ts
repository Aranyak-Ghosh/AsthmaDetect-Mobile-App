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
  severity: any;
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
      this.severity = await this.vital.retrieveSeverity();
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

  async doRefresh(refresher) {
    try {
      this.data = await this.vital.retrieveVitals();
      this.severity = await this.vital.retrieveSeverity();
      refresher.complete();
    } catch (err) {
      console.log(err);
      this.util.showAlertBasic("Error", "Could not contact server!");
    }
  }

  updateChart(vital) {
    console.log(vital);
    let labels = [];
    let vals = [];
    if (vital != "Severity") {
      this.data.forEach(element => {
        if (element.value[vital]) {
          labels.push(element.time);
          vals.push(element.value[vital]);
        }
      });
    } else {
      this.severity.forEach(element => {
        labels.push(element.time);
        vals.push(element.severity);
      });
    }
    debugger;
    let op = {
      yLabels: ["Severe", "Moderate", "Mild", "Normal", ""],
      labels: labels,

      datasets: [
        {
          fill: false,
          data: vals,
          label: vital,
          borderColor: "#ef6464",
          backgroundColor: "#ef6464"
        }
      ]
    };

    if (vals.length)
      this.ngzone.run(() => {
        this.graph = new Chart(this.chart.nativeElement, {
          type: "line",
          data: op,
          options: {
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
                  type: "category",
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
