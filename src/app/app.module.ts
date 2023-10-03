import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';


import { IonicStorageModule } from '@ionic/storage-angular';

import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import  player  from 'lottie-web';

import {EmailComposer} from '@awesome-cordova-plugins/email-composer/ngx'

// para funcionar se necesita separar la funcion requerida 
// en el compilador AOT
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(),],
  providers: [BarcodeScanner,SQLite,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },EmailComposer],
  bootstrap: [AppComponent],
})
export class AppModule {}
