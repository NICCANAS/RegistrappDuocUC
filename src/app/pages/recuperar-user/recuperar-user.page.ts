import { AlertController, AnimationController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-recuperar-user',
  templateUrl: './recuperar-user.page.html',
  styleUrls: ['./recuperar-user.page.scss'],
})
export class RecuperarUserPage implements OnInit {

  Usuario: "";
  field: String = "";
  constructor(private router:Router, public toastController:ToastController, private alertController: AlertController, private animationCtrl: AnimationController, private Emailcomposer: EmailComposer) { }

  backPageLogin(){
    if (this.validarCampos(this.Usuario)){
      const email: EmailComposerOptions = {
        to: this.Usuario,
        cc: 'fe.fernandez@duocuc.cl',
        subject: 'Recuperacion de Contraseña',
        body: 'Contraseña temporal para inicio de sesion: D2KJ32',
      };
      this.Emailcomposer.open(email);

      this.presentAlert()
      this.router.navigate(['/log-in'])

    }else{
      this.presentToast("Por Favor Ingrese su "+this.field, 4500)
    }
  }

  validarCampos(model: any){
    for (var[key, value] of Object.entries(model)){
      if (value == "") {
        this.field = key;
        return false;
      }
    }
    return true;
  }

  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Informacion',
      subHeader: 'Mensaje Importante',
      message: 'Se ha enviado el correo con exito!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  @ViewChild('strRecup',{read: ElementRef, static:true}) titleRecup: ElementRef;

  ngAfterViewInit(){
    const recupAnimation = this.animationCtrl.create()
    .addElement( this.titleRecup.nativeElement)
    .duration(2000)
    .keyframes([
      { offset: 0, transform: 'scale(0.5)' },
      { offset: 1, transform: 'scale(1)' }
    ])
    recupAnimation.play();
  }

  ngOnInit() {
  }

  async openEmail(){
    const email: EmailComposerOptions = {
      to: 'fe.fernandez@duocuc.cl',
      cc: this.Usuario,
      subject: 'Recuperacion de Contraseña',
      body: 'How are you? Nice greetings from Leipzig ',
    };
    await this.Emailcomposer.open(email);
  }

}
