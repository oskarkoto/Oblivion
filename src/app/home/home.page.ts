import { Component } from '@angular/core';
import { Usuario } from '@app/usuario/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  public usuarioLogueado: Usuario[]=[];

  constructor(private usuarioService: UsuarioService) {
    this.usuarioLogueado[0]= usuarioService.usuario[0];
  }

}
