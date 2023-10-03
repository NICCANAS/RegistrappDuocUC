import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarUserPage } from './recuperar-user.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarUserPageRoutingModule {}
