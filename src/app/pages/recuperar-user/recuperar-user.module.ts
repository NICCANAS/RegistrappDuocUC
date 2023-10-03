import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarUserPageRoutingModule } from './recuperar-user-routing.module';

import { RecuperarUserPage } from './recuperar-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarUserPageRoutingModule
  ],
  declarations: [RecuperarUserPage]
})
export class RecuperarUserPageModule {}
