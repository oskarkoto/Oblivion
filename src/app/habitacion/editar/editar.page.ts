import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Habitacion } from '../habitacion.model';
import { HabitacionService } from '../habitacion.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface FILE {
  name: string;
  filepath: string;
  size: number;
}
@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  formEdit: FormGroup;
  habitacion: Habitacion;
  uri: string;
  ngFireUploadTask: AngularFireUploadTask;
  progressNum: Observable<number>;
  progressSnapshot: Observable<any>;
  fileUploadedPath: Observable<string>;
  files: Observable<FILE[]>;
  fileName: string;
  fileSize: number;
  isImgUploading: boolean;
  isImgUploaded: boolean;
  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private habitacionServicio: HabitacionService,
    private router: Router
  ) {
    this.isImgUploading = false;
    this.isImgUploaded = false;
    this.ngFirestoreCollection = angularFirestore.collection<FILE>('filesCollection');
    this.files = this.ngFirestoreCollection.valueChanges();
  }

  fileUpload(event: FileList) {
    //obtengo el archivo completo de la img (nombre, tipo, tamaño, etc..)
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }
    this.isImgUploading = true;
    this.isImgUploaded = false;
    // obtengo solo el nombre de la imagen
    this.fileName = file.name;
    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    const imageRef = this.angularFireStorage.ref(fileStoragePath);
    // subo imagen a firestorage con el nombre y todas sus prop(tipo, tamaño, etc..)
    this.ngFireUploadTask = this.angularFireStorage.upload(fileStoragePath, file);
    this.progressNum = this.ngFireUploadTask.percentageChanges();
    this.progressSnapshot = this.ngFireUploadTask.snapshotChanges()
    .pipe(
      finalize(() => {
        this.fileUploadedPath = imageRef.getDownloadURL();
        this.fileUploadedPath.subscribe(resp=>{
          this.fileStorage({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.uri = resp;
          this.isImgUploading = false;
          this.isImgUploaded = true;
        },error => {
          console.log(error);
        });
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    );
  }

  fileStorage(image: FILE) {
    const imgId = this.angularFirestore.createId();
    this.ngFirestoreCollection.doc(imgId).set(image).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('habitacionId')){
          // No existe el parametro redirecciono
          return;
        }
        const habitacionId = paramMap.get('habitacionId');
        this.habitacion = this.habitacionServicio.getHabitacion(habitacionId);
        this.uri = this.habitacion.img;
        console.log(this.habitacion);
      }
    );
    this.formEdit = new FormGroup({
      id: new FormControl(this.habitacion.id, {
        updateOn: 'blur'
      }),
      nombre: new FormControl(this.habitacion.nombre, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      estado: new FormControl(this.habitacion.estado, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      categoria: new FormControl(this.habitacion.categoria, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      capacidad: new FormControl(this.habitacion.capacidad, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      precio: new FormControl(this.habitacion.precio, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      provincia: new FormControl(this.habitacion.provincia, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      descripcion: new FormControl(this.habitacion.descripcion, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      img: new FormControl(null, {
        validators: []
      })
    });
  }

  editFunction(){
    if(!this.formEdit.valid){
      return;
    }
    console.log(this.formEdit);
    this.habitacionServicio.editHabitacion(
      this.formEdit.value.id,
      this.formEdit.value.nombre,
      this.formEdit.value.estado,
      this.formEdit.value.categoria,
      this.formEdit.value.capacidad,
      this.formEdit.value.precio,
      this.formEdit.value.provincia,
      this.formEdit.value.descripcion,
      this.uri
    );
    this.router.navigate(['/habitacion']);
  }

}
