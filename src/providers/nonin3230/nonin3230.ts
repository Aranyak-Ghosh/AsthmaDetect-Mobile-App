// import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { BLE } from "@ionic-native/ble";

/*
  Generated class for the Nonin3230Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Nonin3230Provider {
  data_observer: any;
  SERVICE_UUID: string = "46A970E0-0D5F-11E2-8B5E-0002A5D5C51B";
  CHAR_UUID: string = "0AAD7EA0-0D60-11E2-8E3C-0002A5D5C51B";
  constructor(private ble: BLE) {
    console.log("Hello Nonin3230Provider Provider");
  }

  scanAndConnect() {
    this.data_observer = Observable.create(observer => {
      this.ble.startScan([this.SERVICE_UUID]).subscribe(peripheral => {
        console.log(peripheral);

        if (
          peripheral &&
          peripheral.name &&
          peripheral.name.indexOf("Nonin3230_") > -1 &&
          peripheral.id
        ) {
          this.ble.stopScan();
          this.ble.connect(peripheral.id).subscribe(status => {
            console.log(status);
            this.ble
              .startNotification(status.id, this.SERVICE_UUID, this.CHAR_UUID)
              .subscribe(data => {
                console.log(data);

                let temp = new Uint8Array(data);
                let spo2 = temp[7];
                let pulse = temp[8] * 256 + temp[9];
                if (pulse < 500) observer.next({ spo2, pulse });
              });
          });
        }
      });
    });

    return this.data_observer;
  }
}
