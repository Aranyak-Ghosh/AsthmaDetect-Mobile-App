import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BLE } from '@ionic-native/ble';

/*
  Generated class for the Nonin3230Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Nonin3230Provider {

  SERVICE_UUID: string = '46a970e00d5f11e28b5e0002a5d5c51b';
  CHAR_UUID: string = '0aad7ea00d6011e28e3c0002a5d5c51b';
  constructor(public http: HttpClient, private ble: BLE) {
    console.log('Hello Nonin3230Provider Provider');
  }

  scanAndConnect() {
    this.ble.startScan([this.SERVICE_UUID]).subscribe(peripheral => {
      debugger;
      console.log(peripheral);

      if (peripheral && peripheral.name && peripheral.name.indexOf('Nonin3230_') > -1 && peripheral.id) {
        this.ble.stopScan();
        this.ble.connect(peripheral.id).subscribe(status=>{
          console.log(status);
          debugger;
        })
      }
    })
  }


}
