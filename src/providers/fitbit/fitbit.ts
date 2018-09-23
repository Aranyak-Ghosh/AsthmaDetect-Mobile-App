import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

/*
  Generated class for the FitbitProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FitbitProvider {
    url: string = 'http://localhost:8080/fitbit';
    token: string;

    constructor(public http: HttpClient, private storage: Storage) {
        console.log('Hello FitbitProvider Provider');
    }

    async getToken() {
        return new Promise(async (resolve, reject) => {
            try {
                this.token = await this.storage.get('fitbitToken');

                resolve(this.token);

            } catch (err) {
                reject(err);
            }
        });
    }

    async getAuthURL() {
        return new Promise((resolve, reject) => {
            let headers=new HttpHeaders();
            headers.set('Access-Control-Allow-Origin','*');
            this.http.get(this.url + '/auth_url',{headers}).subscribe(data => {
                resolve(data);
            }, err => reject(err));
        })
    }

}
