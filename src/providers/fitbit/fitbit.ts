import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

/*
  Generated class for the FitbitProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FitbitProvider {
  url: string = "https://sleepy-eyrie-82836.herokuapp.com/fitbit";
  token: string;
  tokenDuration: number = 28800 * 100;
  constructor(public http: HttpClient, private storage: Storage) {
    console.log("Hello FitbitProvider Provider");
  }

  async getToken() {
    return new Promise(async (resolve, reject) => {
      try {
        this.token = await this.storage.get("FitbitToken");
        console.log("Token", this.token);
        resolve(this.token);
      } catch (err) {
        reject(err);
      }
    });
  }

  async checkTokenExpiry() {
    return new Promise(async (resolve, reject) => {
      try {
        let expiry = await this.storage.get("TokenExpiry");
        resolve(!(Date.now() <= expiry));
      } catch (err) {
        reject(err);
      }
    });
  }

  async refreshToken() {
    return new Promise(async (resolve, reject) => {
      let accessToken = await this.getToken();
      let refreshToken = await this.storage.get("refreshToken");
      let headers = new HttpHeaders();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      this.http
        .post(
          `${this.url}/refreshToken`,
          { accessToken, refreshToken },
          { headers: headers }
        )
        .subscribe(
          data => {
            console.log(data);
            resolve(data);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  async reqToken() {
    return new Promise(async (resolve, reject) => {
      this.http.get(`${this.url}/getToken`).subscribe(async (data: any) => {
        if (data && data.msg) {
          reject("Token unavailable");
        } else {
          this.token = data.access_token;
          try {
            await this.storage.set("FitbitToken", data.access_token);
            await this.storage.set("refreshToken", data.refresh_token);
            let expiry = Date.now() + data.expires_in * 100;
            await this.storage.set("TokenExpiry", expiry);
            resolve(true);
          } catch (err) {
            console.log(err);
          }
        }
      });
    });
  }

  async getSleep(date) {
    return new Promise(async (resolve, reject) => {
      try {
        if (await this.checkTokenExpiry()) {
          await this.refreshToken();
        }
        try {
          let token = await this.getToken();

          this.http
            .get(`${this.url}/sleep?token=${token}&date=${date}`)
            .subscribe(
              data => {
                console.log(data);
                resolve(data);
              },
              err => {
                console.log(err);
                reject(err);
              }
            );
        } catch (err) {
          console.log(err);
          reject(err);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  async getHeartrate(date) {
    return new Promise(async (resolve, reject) => {
      try {
        if (await this.checkTokenExpiry()) {
          await this.refreshToken();
        }
        let token = await this.getToken();

        this.http
          .get(`${this.url}/heartrate?token=${token}&date=${date}`)
          .subscribe(
            data => {
              console.log(data);
              resolve(data);
            },
            err => {
              console.log(err);
              reject(err);
            }
          );
      } catch (err) {
        console.error(err);
      }
    });
  }

  async getAuthURL() {
    return new Promise((resolve, reject) => {
      console.log("Fetching Auth URL");
      this.http.get(this.url + "/auth_url").subscribe(
        data => {
          console.log("URL", data);
          resolve(data);
        },
        err => {
          console.log(err.message);
          reject(err);
        }
      );
    });
  }
}
