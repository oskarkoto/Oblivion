import { Component, OnInit } from '@angular/core';
import { BuscarService } from '../buscar/buscar.service';
import { Usuario } from '../usuario/usuario.model';
import { LoginService } from '@app/login/login.service';


@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.page.html',
  styleUrls: ['./reservacion.page.scss'],
})
export class ReservacionPage implements OnInit {
  public reservaciones: any = [];
  public usuario: Usuario;
  public mensaje: any;
  constructor(private buscarServicio: BuscarService, private loginService: LoginService) {}

  ngOnInit() {
      if (this.loginService.usuario[0].tipo === 'Administrador'){
        this.usuario = this.loginService.usuario[0];
        this.reservaciones = this.buscarServicio.getAllRes();
      } else {
        this.usuario = this.loginService.usuario[0];
        this.reservaciones = this.buscarServicio.getAllResUsuario(this.usuario.id);
      }
  }

  ionViewDidEnter(){
      if (this.loginService.usuario[0].tipo === 'Administrador'){
        this.usuario = this.loginService.usuario[0];
        this.reservaciones = this.buscarServicio.getAllRes();
      } else {
        this.usuario = this.loginService.usuario[0];
        this.reservaciones = this.buscarServicio.getAllResUsuario(this.usuario.id);
      }
  }
}
