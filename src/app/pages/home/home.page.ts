import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { Asistencia } from 'src/app/clases/asistencia';

import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;
  user2: any;
  email: any;
  alumnos: any;
  compareWith: any;
  code: any;

  asis: Asistencia[];
  constructor(private activeroute: ActivatedRoute, private router: Router, private Api: ApiService, private barcodeScanner: BarcodeScanner, private dbservice: DbserviceService,private EmailComposer: EmailComposer) {
    this.activeroute.queryParams.subscribe(params => {
      //usa lambda y revisa si hay datos.
      if (this.router.getCurrentNavigation().extras.state) {
        //consigue los parámetros
        this.user2 = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.user2)
      }
    });
  }

  nombre(){
    var usu = JSON.parse(localStorage.getItem('usuario'));
    this.user= usu.nombre;

    var correo = JSON.parse(localStorage.getItem('cor'));
    this.email= correo.username;
  }

  ngOnInit(){
    this.dbservice.dbState().subscribe((res)=>{
      if(res){
        this.dbservice.fetchAsistencia().subscribe(item=>{
          this.asis=item;
        })
      }
    })

    this.nombre();
  }

  jsonString = '{"idAsignatura": "PGY4121","seccion": "001D","asignatura": "Programación Movil","docente": "Nancy Beatriz Bernal Sanchez","correo": "nan.bernal@profesor.duocuc.cl"}'

  cerrarSesion() {
    localStorage.removeItem('ingresado');
    this.router.navigate(['/log-in'])
  }

  scanOpciones(){
    const options: BarcodeScannerOptions = {
      showFlipCameraButton: true
    }
  }
  
  llevar404(){
    this.router.navigate(['/404'])
  }

  Scanear(){
    this.barcodeScanner.scan({
      showFlipCameraButton: true,
    }).then(barcodeData => {
      var Bardata = JSON.parse(barcodeData.text); //lo que se recupera del QR

      //se insertan datos del QR
      this.dbservice.agregarAsistencia(Bardata.idAsignatura,Bardata.seccion,Bardata.asignatura,Bardata.docente,Bardata.correo);
      
      const email: EmailComposerOptions = {
        to: Bardata.correo,
        cc: `${this.email}@duocuc.cl`,
        subject: 'Confirmacion Asistencia',
        body: `CORREO DE CONFIRMACION ASISTENCIA DEL ALUMNO ${this.user}
               ID-Asignatura: ${Bardata.idAsignatura}
               Seccion: ${Bardata.seccion} 
               Asignatura: ${Bardata.asignatura}
               Docente: ${Bardata.docente} 
               Correo: ${Bardata.correo} ` ,
      }; 
  
      this.EmailComposer.open(email); //Abre el correo con la plantilla definida

    }).catch(err => {
      console.log('Error',err);
    });
  }
}


