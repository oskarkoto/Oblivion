import { Component, OnInit } from '@angular/core';
import { Usuario } from '@app/usuario/usuario.model';
import { UsuarioService } from '@app/usuario/usuario.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage{
  public usuarioLogueado: Usuario[]=[];

  constructor(private loginService: LoginService) {
    this.usuarioLogueado.pop();
    this.usuarioLogueado = loginService.usuario;
  }
}
