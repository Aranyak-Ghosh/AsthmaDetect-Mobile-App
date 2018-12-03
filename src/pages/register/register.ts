import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { AuthProvider } from "../../providers/auth/auth";
import { UtilServicesProvider } from "../../providers/util-services/util-services";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  credentials: any = {
    username: null,
    contactNo: null,
    gender: null,
    firstName: null,
    lastName: null,
    age: null,
    address: null,
    password: null
  };
  confirmPassword: String = null;
  errMsg: String;
  constructor(
    public navCtrl: NavController,
    private auth: AuthProvider,
    private util: UtilServicesProvider,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  async register() {
    if (this.credentials.password == this.confirmPassword) {
      try {
        let res = await this.auth.register(this.credentials);
        if (res)
          this.util.showAlertBasic("Success", "User Registered Successfully");
      } catch (err) {
        if (err == "userExists") {
          this.util.showAlertBasic(
            "Error",
            "User with given email already exists. Try resetting your password"
          );
          this.errMsg =
            "User with given email already exists. Try resetting your password";
        } else {
          this.util.showAlertBasic(
            "Error",
            "An internal error occured! Try again later"
          );
          this.errMsg = "An internal error occured! Try again later";
        }
      }
    } else {
      this.errMsg = "Passwords do not match";
      this.util.showAlertBasic("Error", "Passwords provided do not match");
    }
  }

  goToLogin() {
    this.navCtrl.pop();
  }
}
