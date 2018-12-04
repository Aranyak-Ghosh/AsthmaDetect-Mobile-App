import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";

import { VitalProvider } from "../../providers/vital/vital";
import { UtilServicesProvider } from "../../providers/util-services/util-services";

@Component({
  selector: "modal-spiro",
  templateUrl: "spiro.html"
})
export class ModalSpiroPage {
  loadingMeta: boolean = true;
  text: String;
  copd: boolean;
  question: any;
  record = {
    FEV1: null,
    FVC: null,
    PEF: null,
    FEF: null
  };
  copdQ: any = [
    {
      placeholder: "FEV1",
      name: "FEV1",
      model: "record.FEV1"
    },
    {
      placeholder: "FVC",
      name: "FVC",
      model: "record.FVC"
    },
    {
      placeholder: "PEF",
      name: "PEF",
      model: "record.PEF"
    }
  ];

  asthmaQ: any = [
    {
      placeholder: "FEV1",
      name: "FEV1",
      model: "record.FEV1"
    },
    {
      placeholder: "FVC",
      name: "FVC",
      model: "record.FVC"
    },
    {
      placeholder: "PEF",
      name: "PEF",
      model: "record.PEF"
    },
    {
      placeholder: "FEF 25-75",
      name: "FEF",
      model: "record.FEF"
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private vital: VitalProvider,
    private util: UtilServicesProvider
  ) {
    this.copd = false;
    this.text = "Ashtma";
    this.question = this.asthmaQ;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  toggleClicked() {
    // debugger
    if (this.copd) {
      this.text = "COPD";
      this.question = this.copdQ;
    } else {
      this.text = "Asthma";
      this.question = this.asthmaQ;
    }
  }

  async submit() {
    console.log(this.record);
    this.util.showLoader("Submitting Vitals");
    try {
      let severity = await this.vital.submitVital(this.record);
      this.util.dismissLoader();
      if (severity == "Stored") {
        this.util.showToast("Value Recorded");
        this.viewCtrl.dismiss();
      } else {
        this.util.showAlert(
          "Severity",
          `Asthma Severity: ${severity}`,
          "Dismiss",
          () => {
            this.viewCtrl.dismiss();
          }
        );
      }
    } catch (err) {
      this.util.dismissLoader();
      console.log(err);
      this.util.showAlertBasic(
        "Error",
        "An error occured while submitting the values! Try again later."
      );
    }
  }
}
