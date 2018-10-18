import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";

import { VitalProvider } from "../../providers/vital/vital";
@Component({
  selector: "modal-spiro",
  templateUrl: "spiro.html"
})
export class ModalSpiroPage {
  loadingMeta: boolean = true;
  record = {
    fev1: null,
    fvc: null,
    pef: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private vital: VitalProvider
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
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
