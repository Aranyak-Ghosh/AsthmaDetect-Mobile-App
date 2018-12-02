import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  Modal
} from "ionic-angular";

import { ModalSpiroPage } from "../../modals/spiro/spiro";
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
  date: any;
  type: String = "string";
  filterSelected: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SpirometryPage");
  }

  toggleFilter() {
    this.filterSelected = !this.filterSelected;
  }

  submit() {
    //TODO: Implement sending date and receiving list of all values
  }

  showModal() {
    this.modalCtrl.create(ModalSpiroPage).present();
  }
}
