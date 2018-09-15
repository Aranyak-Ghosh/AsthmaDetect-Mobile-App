import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as FitbitApiClient from 'fitbit-node';
/*
  Generated class for the FitbitProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FitbitProvider {
  constructor(public http: HttpClient) {
    console.log('Hello FitbitProvider Provider');
  }

}
