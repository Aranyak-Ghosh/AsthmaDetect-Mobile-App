import { Component, NgZone } from "@angular/core";
import { NavController } from "ionic-angular";

import { Nonin3230Provider } from '../../providers/nonin3230/nonin3230'
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  spo2: number;
  heartrate: number;
  errCB = err => console.log(err);
  btEnabled: boolean;
  constructor(public navCtrl: NavController, private nonin3230: Nonin3230Provider, private ngzone: NgZone) {
    // this.deffered()
    console.log("In Constructor");
    this.spo2=0;
    this.heartrate=0;
  }

  ionViewDidLoad() {
    console.log("HomePage Loaded");
  }

  scan() {
    this.nonin3230.scanAndConnect().subscribe(data => {
      this.ngzone.run(()=>{
        this.spo2=data.spo2;
        this.heartrate=data.pulse;
      })
    });
  }

  getData() {
    console.log('Starting Listener');

  }
}
