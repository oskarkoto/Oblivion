import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '@app/usuario/usuario.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

export interface FILE {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {
  formCrear: FormGroup;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private usuarioServicio: UsuarioService,
    private router: Router
  ) {}

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
    tipo: new FormControl('Cliente', {
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
  this.router.navigate(['/login']);
}

}
