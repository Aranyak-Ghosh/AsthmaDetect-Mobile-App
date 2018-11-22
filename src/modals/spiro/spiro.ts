import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";

import { VitalProvider } from "../../providers/vital/vital";
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
    fev1: null,
    fvc: null,
    pef: null,
    fef2575: null
  };
  copdQ: any = [
    {
      placeholder: "FEV1",
      name: "fev1",
      model: "record.fev1"
    },
    {
      placeholder: "FVC",
      name: "fvc",
      model: "record.fvc"
    },
    {
      placeholder: "PEF",
      name: "pef",
      model: "record.pef"
    }
  ];

  asthmaQ: any = [
    {
      placeholder: "FEV1",
      name: "fev1",
      model: "record.fev1"
    },
    {
      placeholder: "FVC",
      name: "fvc",
      model: "record.fvc"
    },
    {
      placeholder: "PEF",
      name: "pef",
      model: "record.pef"
    },
    {
      placeholder: "FEF 25-75",
      name: "fef2575",
      model: "record.fef2575"
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private vital: VitalProvider
  ) {
    this.copd = false;
    this.text = "Ashtma";
    this.question = this.asthmaQ;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  toggleClicked() {
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
    try {
      if (await this.vital.submitVital(this.record)) this.viewCtrl.dismiss();
    } catch (err) {
      console.log(err);
    }
  }
}
