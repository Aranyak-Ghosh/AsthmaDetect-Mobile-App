import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";

import { AuthProvider } from "../../providers/auth/auth";
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
    private viewCtrl: ViewController
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    console.log(this.record);
    this.viewCtrl.dismiss();
  }
}
