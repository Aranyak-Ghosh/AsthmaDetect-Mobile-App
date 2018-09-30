import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth'
import { UtilServicesProvider } from '../../providers/util-services/util-services'

import { HomePage } from '../home/home'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = { username: null, password: null };
  constructor(public navCtrl: NavController, public navParams: NavParams, private util: UtilServicesProvider, private auth: AuthProvider) {
    // this.credentials
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login() {
    this.util.showLoader('Logging In');
    try {
      let data: any = await this.auth.login(this.credentials);
      this.util.dismissLoader();
      if (data) {
        this.navCtrl.push(HomePage);
      } else {
        console.log(data.msg == 'CheckIfUserExists');
        this.util.showAlertBasic('Error', 'Incorrect Email or Password! Try Again.');
      }

    } catch (err) {
      this.util.dismissLoader();
      this.util.showAlertBasic('Error', 'There was an error logging you in. Try again later.');
    }
  }

  register() {
    // this.navCtrl.push()
  }

}
