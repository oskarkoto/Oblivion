import { Component, OnInit } from '@angular/core';
import { Usuario } from '@app/usuario/usuario.model';
import { UsuarioService } from '@app/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage{
  public usuarioLogueado: Usuario[]=[];

  constructor(private usuarioService: UsuarioService) {
    this.usuarioLogueado.pop();
    this.usuarioLogueado[0] = usuarioService.usuario[0];
  }
}
