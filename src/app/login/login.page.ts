import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Usuario } from '../usuario/usuario.model';

export interface FILE {
  name: string;
  filepath: string;
  size: number;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formCrear: FormGroup;
  usuarioLogueado: Usuario[]=[];
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}
  ngOnInit() {
    this.usuarioLogueado = [];
    this.formCrear = new FormGroup({
      correo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }
  loginUser(){
    if(!this.formCrear.valid){
      return;
    }
    this.usuarioLogueado[0] = this.loginService.loginUser(this.formCrear.value.correo,
      this.formCrear.value.password)[0];
      console.log(this.formCrear.value.correo);
      console.log(this.formCrear.value.password);
    if(this.usuarioLogueado[0] === undefined){
      console.log('El usuario no existe');
    } else {
      console.log('El usuario existe');
      this.router.navigate(['/home']);
    }
  }
  logout(){
    this.usuarioLogueado[0] = this.loginService.logout()[0];
    this.usuarioLogueado = undefined;
      this.router.navigate(['/login']);
  }
}
