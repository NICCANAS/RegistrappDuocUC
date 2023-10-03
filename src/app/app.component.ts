import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SplashComponent } from './component/splash/splash.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private modalController: ModalController) {
    this.presentSplash();
  }
  async presentSplash() {
    const modal = await this.modalController.create({
      component: SplashComponent,
      cssClass: 'my-custom-splash'
    });
    return await modal.present();
  }

}