import { RouteGuardGuard } from './route-guard.guard';
import { NoEntryGuard } from './no-entry.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [RouteGuardGuard]
  },
  {
    path: '',
    redirectTo: 'slide',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    loadChildren: () => import('./pages/log-in/log-in.module').then( m => m.LogInPageModule),
    canActivate: [NoEntryGuard]
  },
  {
    path: 'recuperar-user',
    loadChildren: () => import('./pages/recuperar-user/recuperar-user.module').then( m => m.RecuperarUserPageModule)
  },
  {
    path: 'slide',
    loadChildren: () => import('./pages/slide/slide.module').then( m => m.SlidePageModule)
  },
  {
    path: 'cambiopag',
    loadChildren: () => import('./pages/cambiopag/cambiopag.module').then( m => m.CambiopagPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }