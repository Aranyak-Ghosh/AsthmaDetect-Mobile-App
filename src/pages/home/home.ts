import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Diagnostics } from '@ionic-native/diagnostic'

import * as Nonin3230 from '../../providers/nonin/nonin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  errCB = (err) => console.log(err);
  btEnabled: boolean;
  constructor(public navCtrl: NavController, private diagnostics: Diagnostics) {
    this.diagnostics.isBluetoothAvailable().then(state => console.log(`Bluetooth Available? ${state}`), err => console.log(err));
    this.diagnostics.getBluetoothState().then(state=>{
      if(state==this.diagnostics.bluetoothState.POWERED_ON){
        this.btEnabled=true;
      }else{
        this.btEnabled=false;
      }
    }).catch(this.errCB);
  }

}
