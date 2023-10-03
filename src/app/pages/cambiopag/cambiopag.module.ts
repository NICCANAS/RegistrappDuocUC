import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiopagPageRoutingModule } from './cambiopag-routing.module';

import { CambiopagPage } from './cambiopag.page';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory(){
  return player
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiopagPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  declarations: [CambiopagPage]
})
export class CambiopagPageModule {}
