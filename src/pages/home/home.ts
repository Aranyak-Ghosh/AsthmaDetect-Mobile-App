import { Component } from "@angular/core";
import { NavController } from "ionic-angular";


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  msg: string;
  val: any;
  errCB = err => console.log(err);
  btEnabled: boolean;
  constructor(public navCtrl: NavController) {
    // this.deffered()
    console.log("In Constructor");
    
  }

  ionViewDidLoad() {
    console.log("HomePage Loaded");
  }


  getData() {
    console.log('Starting Listener');
    
  }
}
