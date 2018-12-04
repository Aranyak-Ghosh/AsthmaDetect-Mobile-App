import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Storage } from "@ionic/storage";

/*
  Generated class for the VitalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VitalProvider {
  ip: string = `http://192.168.1.108:8080`;
  url: string = `${this.ip}/vitals`;
  constructor(public http: HttpClient, private storage: Storage) {
    console.log("Hello VitalProvider Provider");
    console.log(this.url);
  }

  /**
   * Submit Vital
   */
  submitVital(vital) {
    return new Promise(async (resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      let type = "";
      if (vital.FEF) type = "Asthma";
      else type = "COPD";

      let body = {
        token: await this.storage.get("AuthToken"),
        type: type,
        value: vital
      };

      this.http.post(`${this.url}/add`, body, { headers: headers }).subscribe(
        data => {
          if (data) resolve(data);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  /**
   * Retireve Vitals
   */
  retrieveVitals(type) {
    return new Promise(async (resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      let body = {
        token: await this.storage.get("AuthToken"),
        type: type
      };
      this.http.post(`${this.url}/get`, body, { headers: headers }).subscribe(
        data => {
          if (data) resolve(data);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }
}
