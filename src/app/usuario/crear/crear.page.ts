import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
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
    private usuarioServicio: UsuarioService,
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
  this.formCrear = new FormGroup({

    nombre: new FormControl(null, {
      updateOn: 'blur',
      validators:[Validators.required]
    }),
    primerApellido: new FormControl(null, {
      updateOn: 'blur',
      validators:[Validators.required]
    }),
    segundoApellido: new FormControl(null, {
      updateOn: 'blur',
      validators:[Validators.required]
    }),
    telefono: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required]
    }),
    correo: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required]
    }),
    password: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required]
    }),
    tipo: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required]
    })
  });
}

addUsuario(){
  if(!this.formCrear.valid){
    return;
  }
  console.log(this.formCrear);
  console.log(this.fileUploadedPath);
  this.usuarioServicio.addUsuario(
    this.formCrear.value.id,
    this.formCrear.value.nombre,
    this.formCrear.value.primerApellido,
    this.formCrear.value.segundoApellido,
    this.formCrear.value.telefono,
    this.formCrear.value.correo,
    this.formCrear.value.password,
    this.formCrear.value.tipo,
  );
  this.router.navigate(['/usuario']);
}

}
