import { Component } from '@angular/core';
import { Usuario } from '@app/usuario/usuario.model';
import { LoginService } from '@app/login/login.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  public usuarioLogueado: Usuario[]=[];
  constructor(private loginService: LoginService) {
    this.usuarioLogueado.pop();
    this.usuarioLogueado = loginService.usuario;
  }
}
