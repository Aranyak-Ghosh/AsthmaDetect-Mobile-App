import { Component } from "@angular/core";
import { NavController, NavParams, ModalController, Modal } from "ionic-angular";

import {ModalSpiroPage} from "../../modals/spiro/spiro"
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SpirometryPage");
  }

  showModal(){
    this.modalCtrl.create(ModalSpiroPage).present();
  }
}
