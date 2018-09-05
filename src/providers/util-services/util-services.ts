import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  NavController,
  AlertController,
  ToastController,
  LoadingController
} from "ionic-angular";

import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

import { Storage } from "@ionic/storage";

/*
  Generated class for the UtilServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilServicesProvider {

  loader: any;
  loaderArray: any = [];
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    momentDurationFormatSetup(moment);
  }
  public showLoader(msg: string = "Please wait...") {
    if (!this.loader || this.loader._detached) {
      this.loader = this.loadingCtrl.create({
        content: msg
      });
      this.loaderArray.push(this.loader);
      this.loader.present();
    }
  }

  public dismissLoader() {
    //check if there is a loader
    if (this.loader && !this.loader._detached) {
      this.loader.dismiss();
      this.loader = null;
    }
  }

  /**
   * Toast that has no timeout
   * @param msg Message to display
   * @param fn Optional -> a function to execute on dismissing toast
   */
  showToast(msg: string, fn: any = () => { }) {
    //TODO to be replaced with actual messages
    const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: "bottom"
    });
    toast.onDidDismiss(() => {
      fn();
    });
    toast.present();
  }

  /**
   * Toast that times out
   * @param msg Message to display
   * @param duration Optional -> Duration of the toast in ms, defaults to 3 seconds
   * @param fn Optional -> a function to execute on dismissing toast
   */
  showToastTimed(msg: string, duration: number = 3000, fn: any = () => { }) {
    const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: "Ok",
      duration,
      position: "bottom"
    });
    toast.onDidDismiss(() => {
      fn();
    });
    toast.present();
  }

  showAlert(title: string, subTitle: string, button:string, dismiss: any) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [button]
    });
    alert.onDidDismiss(() => {
      dismiss();
    });
    alert.present();
  }

  showAlertBasic(title: string, msg: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  navToDoc(link) {
    window.open(
      `https://docs.google.com/viewer?url=${link}`,
      "_system",
      "location=yes"
    );
  }

  navToLink(link) {
    window.open(`${link}`, "_system", "location=yes");
  }

  showConfirm(
    title: string,
    subTitle: string,
    disagree: string,
    agree: string,
    disagreeCallback: any,
    agreeCallback: any
  ) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: subTitle,
      buttons: [
        {
          text: disagree,
          handler: disagreeCallback
        },
        {
          text: agree,
          handler: agreeCallback
        }
      ]
    });
    confirm.present();
  }

  showConfirmBasic(title: string, message: string) {
    return new Promise(resolve => {
      let alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Confirm: Cancel clicked");
              resolve(false);
            }
          },
          {
            text: "OK",
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      alert.present();
    });
  }

  presentPrompt(title: string, message: string, input: string) {
    return new Promise(resolve => {
      let alert = this.alertCtrl.create({
        title: title,
        message: message,
        inputs: [
          {
            name: input
          }
        ],
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: data => {
              console.log("Cancel clicked");
            }
          },
          {
            text: "OK",
            handler: data => {
              // console.log(data);
              resolve(data);
            }
          }
        ]
      });
      alert.present();
    });
  }
}
