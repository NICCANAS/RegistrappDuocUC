import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  user = {
    Usuario: "",
    Clave: ""
  }
  field: String = "";

  //datos api
  alumnos: any;
  compareWith: any;


  constructor(private router: Router, public toastController: ToastController, private Api: ApiService) { }

  nextPageHome() {
    if (this.validarCampos(this.user)) {
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      };

      //Validacion Usuario, Clave
      for (let i = 1; i < this.alumnos.length; i++) {

        //Validacion Usuario
        if (this.user.Usuario == this.alumnos[i].username) {

          //Validacion Clave
          if (this.user.Clave == this.alumnos[i].password) {
            var usuario= {nombre:this.alumnos[i].nombre};
            var cor= {username:this.alumnos[i].username};
            localStorage.setItem('ingresado','true');
            localStorage.setItem('usuario',JSON.stringify(usuario)); //guarda el nombre del usuario a logear
            localStorage.setItem('cor',JSON.stringify(cor));
            this.router.navigate(['/home'], navigationExtras)
            break; //para que no muestre el error aunque se inicie sesion correctamente, debido a que si no se asigna el break no se termina el ciclo.
          }else{
            this.presentToast("Usuario y/o Contraseña Incorrectos", 4500)
          }
        }

        if (i >= this.alumnos.length-1){ //forma de validar que se termine el for
          this.presentToast("Usuario y/o Contraseña Incorrectos", 4500)
        }

      }

    } else {
      this.presentToast("Por Favor Ingrese su " + this.field, 4500)
    }

  }

  nextPageRecup() {
    this.router.navigate(['/recuperar-user'])
  }

  validarCampos(model: any) {
    for (var [key, value] of Object.entries(model)) {
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

  ionViewWillEnter() {
    this.getAlumnos();
  }

  getAlumnos() {
    this.Api.getAlumnos().subscribe((data) => {
      let varApi = Object.values(data)
      let varApi2 = Object.values(varApi[0])

      this.alumnos = varApi2;

    })
  }

  ngOnInit() {
  }

}
