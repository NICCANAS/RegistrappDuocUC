import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Asistencia } from '../clases/asistencia';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public database: SQLiteObject;
  tblAsistencias:string = "CREATE TABLE IF NOT EXISTS asistencia(idAsignatura VARCHAR(10) PRIMARY KEY , seccion VARCHAR(5) NOT NULL, asignatura VARCHAR(50) NOT NULL, docente VARCHAR(50) NOT NULL, correo VARCHAR(50) NOT NULL);";

  ListAsistencia = new BehaviorSubject([]);
  private isDbReady:
    BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite:SQLite,private platform:Platform, private toastController: ToastController) { 
    this.crearBD();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'asistencia.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTabla();
      }).catch(e => this.presentToast(e));
    })
  }

  async crearTabla() {
    try {
      await this.database.executeSql(this.tblAsistencias,[]);
      this.cargarAsistencia();
      this.isDbReady.next(true); 
    } catch (error) {
      this.presentToast("Error en Crear Tabla: "+error);
    }
  }

  cargarAsistencia() {
    return this.database.executeSql('SELECT * FROM asistencia',[])
    .then(res=>{
      let items:Asistencia[]=[];
      if(res.rows.length>0){
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idAsignatura:res.rows.item(i).idAsignatura,
            seccion:res.rows.item(i).seccion,
            asignatura:res.rows.item(i).asignatura,
            docente:res.rows.item(i).docente,
            correo:res.rows.item(i).correo
          });          
        }
      }
      this.ListAsistencia.next(items);
    });
  }

  agregarAsistencia(idAsignatura,seccion,asignatura,docente,correo){
    let data=[idAsignatura,seccion,asignatura,docente,correo];
    return this.database.executeSql('INSERT INTO asistencia(idAsignatura,seccion,asignatura,docente,correo) VALUES(?,?,?,?,?)',data)
    .then(()=>{
      this.cargarAsistencia();
    });
  }

  modificarAsistencia(id,nombreClase,fecha){
    let data=[nombreClase,fecha,id];
    return this.database.executeSql('UPDATE asistencia SET nombreClase=?, fecha=? WHERE id=?',data)
    .then(()=>{
      this.cargarAsistencia();
    });
  }

  borrarAsistencia(id){
    return this.database.executeSql('DELETE FROM noticia WHERE id=?',[id])
    .then(()=>{
      this.cargarAsistencia();
    });
  }

  dbState(){
    return this.isDbReady.asObservable();
  }


  fetchAsistencia(): Observable<Asistencia[]> {
    return this.ListAsistencia.asObservable();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
