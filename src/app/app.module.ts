import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Diagnostic } from '@ionic-native/diagnostic';
import { BLE } from '@ionic-native/ble';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UtilServicesProvider } from '../providers/util-services/util-services';
import { Nonin3230Provider } from '../providers/nonin3230/nonin3230';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UtilServicesProvider,
    Nonin3230Provider
  ]
})
export class AppModule { }
