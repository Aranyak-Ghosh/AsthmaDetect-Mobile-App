import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { Nonin3230Provider} from '../../providers/nonin3230/nonin3230'
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  msg: string;
  val: any;
  errCB = err => console.log(err);
  btEnabled: boolean;
  constructor(public navCtrl: NavController, private nonin3230: Nonin3230Provider) {
    // this.deffered()
    console.log("In Constructor");
    
  }

  ionViewDidLoad() {
    console.log("HomePage Loaded");
  }

  scan(){
    this.nonin3230.scanAndConnect();
  }

  getData() {
    console.log('Starting Listener');
    
  }
}
