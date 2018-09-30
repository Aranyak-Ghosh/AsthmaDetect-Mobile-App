import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

import { UtilServicesProvider } from "../util-services/util-services"
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  ip: String = `192.168.1.108`;
  url: String = `http://${this.ip}:8080/user`;
  constructor(public http: HttpClient, private storage: Storage, private utilService: UtilServicesProvider) {
    console.log('Hello AuthProvider Provider');
  }

  async login(cred: any) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // headers.append('Accept', 'application/json');
      headers.append('withCredentials', 'true');
      this.http.post(`${this.url}/login`, cred, { headers: headers }).subscribe((data: any) => {
        if (data.token) {
          this.storage.set('AuthToken', data.token);
          resolve(true);
        } else {
          resolve(data);
        }
      }, err => {
        console.log(err);
        reject(err);
      });

    });
  }

  async autoLogin() {
    return new Promise(async (resolve, reject) => {
      let token = await this.storage.get('AuthToken');
      if (token) {
        let query = `token=${token}`;
        this.http.get(`${this.url}/validateToken?${query}`).subscribe((data: any) => {
          if (data.token) {
            resolve(true);
          } else if (data.msg == 'Internal error') {
            reject(data);
          } else if (data.status == 'invalidToken') {
            resolve(false);
          }
        }, err => {
          console.log(err);
          reject(err);
        })
      }
      else
        resolve(false);

    });
  }

}
