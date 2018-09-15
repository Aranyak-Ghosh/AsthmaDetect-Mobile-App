import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";

import { Diagnostic } from '@ionic-native/diagnostic';
import { BLE } from '@ionic-native/ble';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UtilServicesProvider } from '../providers/util-services/util-services';
import { Nonin3230Provider } from '../providers/nonin3230/nonin3230';
import { FitbitProvider } from '../providers/fitbit/fitbit';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    Diagnostic,
    BLE,
    AndroidPermissions,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UtilServicesProvider,
    Nonin3230Provider,
    FitbitProvider
  ]
})
export class AppModule { }
