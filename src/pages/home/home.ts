import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { Diagnostic } from "@ionic-native/diagnostic";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  msg: string;
  val: any;
  errCB = err => console.log(err);
  btEnabled: boolean;
  constructor(public navCtrl: NavController, private diagnostics: Diagnostic) {
    // this.deffered()
    console.log("In Constructor");
  }

  ionViewDidLoad() {
    console.log("HomePage Loaded");
  }
  async deffered() {
    this.diagnostics
      .getBluetoothState()
      .then(state => {
        if (state == this.diagnostics.bluetoothState.POWERED_ON) {
          this.btEnabled = true;
          this.msg = `Bluetooth turned on`;
        } else {
          this.btEnabled = false;
          this.msg = `Bluetooth turned off`;
        }
      })
      .catch(this.errCB);
  }

  async getState() {
    console.log("In Function Deffered");
    try {
      let state = await this.diagnostics.isBluetoothAvailable();
      this.msg = `Bluetooth Available? ${state}`;
      debugger;
      console.log(this.msg);
    } catch (err) {
      console.log(err);
    }
  }

  toggleBluetooth(){
    this.diagnostics.setBluetoothState(true);
  }

  getData() {
    console.log('Starting Listener');
    
  }
}
