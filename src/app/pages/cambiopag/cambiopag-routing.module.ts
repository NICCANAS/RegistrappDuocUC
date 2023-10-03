import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CambiopagPage } from './cambiopag.page';

const routes: Routes = [
  {
    path: '',
    component: CambiopagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiopagPageRoutingModule {}
