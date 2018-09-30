import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";

/**
 * PLUGINS
 */
import { Diagnostic } from '@ionic-native/diagnostic';
import { BLE } from '@ionic-native/ble';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { MyApp } from './app.component';

/**
 * PROVIDERS
 */
import { UtilServicesProvider } from '../providers/util-services/util-services';
import { Nonin3230Provider } from '../providers/nonin3230/nonin3230';
import { FitbitProvider } from '../providers/fitbit/fitbit';

/**
 * PAGES
 */
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register'

import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { AuthProvider } from '../providers/auth/auth';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    Diagnostic,
    BLE,
    AndroidPermissions,
    SplashScreen,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UtilServicesProvider,
    Nonin3230Provider,
    FitbitProvider,
    AuthProvider
  ]
})
export class AppModule { }
