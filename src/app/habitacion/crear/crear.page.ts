import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  uri: string;
  formCrear: FormGroup;
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
        },error => { });
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    );
  }

  fileStorage(image: FILE) {
      const imgId = this.angularFirestore.createId();
      this.ngFirestoreCollection.doc(imgId).set(image).then(data => { }).catch(error => { });
  }

  ngOnInit() {
    this.formCrear = new FormGroup({

      nombre: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      estado: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      categoria: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      capacidad: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required,Validators.min(2)],
      }),
      precio: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      provincia: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      descripcion: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      img: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  addFunction(){
    if(!this.formCrear.valid){
      window.confirm('No puedes colocar valores menores a 2');
      return;
    }
    this.habitacionServicio.addHabitacion(
      this.formCrear.value.id,
      this.formCrear.value.nombre,
      this.formCrear.value.estado,
      this.formCrear.value.categoria,
      this.formCrear.value.capacidad,
      this.formCrear.value.precio,
      this.formCrear.value.provincia,
      this.formCrear.value.descripcion,
      this.uri
    );
    setTimeout(()=>{
      this.router.navigate(['/habitacion']);
    },500);
  }

}
