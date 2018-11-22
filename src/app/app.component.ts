import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { Diagnostic } from "@ionic-native/diagnostic";

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { SleepPage } from "../pages/sleep/sleep";
import { SpirometryPage } from "../pages/spirometry/spirometry";

import { AuthProvider } from "../providers/auth/auth";
import { UtilServicesProvider } from "../providers/util-services/util-services";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    permissions: AndroidPermissions,
    private auth: AuthProvider,
    private utilService: UtilServicesProvider,
    diagnostics: Diagnostic,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let req_permissions: Array<any> = [
        permissions.PERMISSION.ACCESS_COARSE_LOCATION,
        permissions.PERMISSION.BLUETOOTH,
        permissions.PERMISSION.BLUETOOTH_ADMIN
      ];

      req_permissions.forEach(element => {
        permissions.checkPermission(element).then(
          res => {
            console.log(`${element} Has Permission?`, res);
          },
          err => {
            permissions.requestPermission(element);
          }
        );
      });

      statusBar.styleDefault();
      // this.rootPage = SpirometryPage;
      this.auth
        .autoLogin()
        .then(data => {
          splashScreen.hide();
          if (data) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = LoginPage;
          }
        })
        .catch(err => {
          console.log(err);
          splashScreen.hide();
          this.utilService.showAlertBasic(
            "Error",
            "Unable to reach server! Try again later"
          );
        });

      diagnostics
        .getBluetoothState()
        .then(state => {
          if (state == diagnostics.bluetoothState.POWERED_ON) {
            console.log("BT enabled");
          } else {
            utilService.showConfirm(
              "Bluetooth",
              "Please Turn on Bluetooth",
              "Close App",
              "Turn on Bluetooth",
              () => {
                platform.exitApp();
              },
              () => {
                diagnostics.setBluetoothState(true);
              }
            );
          }
        })
        .catch(err => console.log(err));
    });
  }
}
