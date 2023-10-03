import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ChipModule } from 'primeng/chip';
import { HomePageRoutingModule } from './home-routing.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ChipModule,
    QRCodeModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
