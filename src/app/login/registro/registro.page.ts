import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '@app/usuario/usuario.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {
  formCrear: FormGroup;
  constructor(
    private usuarioServicio: LoginService,
    private router: Router
  ) { }

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
  registrarUsuario(){
    if(!this.formCrear.valid){
      return;
    }
    console.log(this.formCrear);
    this.usuarioServicio.registrarUsuario(
      this.formCrear.value.id,
      this.formCrear.value.nombre,
      this.formCrear.value.primerApellido,
      this.formCrear.value.segundoApellido,
      this.formCrear.value.telefono,
      this.formCrear.value.correo,
      this.formCrear.value.password,
      this.formCrear.value.tipo,
    );
    console.log('Registro exitoso');
    this.router.navigate(['/login']);
  }
}
