import { Component, OnInit } from '@angular/core';
import { Reservacion } from '../habitacion/habitacion.model';
import { BuscarService } from '../buscar/buscar.service';
import { UsuarioService } from '../usuario/usuario.service';
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
    setTimeout(()=>{
      console.log('onInit de Reservacion con el usuario:');
      console.log(this.loginService.usuario[0]);
      if (this.loginService.usuario[0].tipo === 'Administrador'){
        this.usuario = this.loginService.usuario[0];
        this.reservaciones = this.buscarServicio.getAllRes();
      } else {
        this.usuario = this.loginService.usuario[0];
        this.reservaciones = this.buscarServicio.getAllResUsuario(this.usuario.id);
      }
    },500);
  }

  /*ionViewWillEnter(){
    if (this.usuarioServicio.usuario[0].tipo === 'Administrador'){
      this.usuario = this.usuarioServicio.usuario[0];
      this.reservaciones = this.buscarServicio.getAllRes();
    } else {
      this.usuario = this.usuarioServicio.usuario[0];
      this.reservaciones = this.buscarServicio.getAllResUsuario(this.usuario.id);
    }
  }*/

  ionViewDidEnter(){
      console.log('onInit de Reservacion con el usuario:');
      console.log(this.loginService.usuario[0]);
      if (this.loginService.usuario[0].tipo === 'Administrador'){
        this.usuario = this.loginService.usuario[0];
        this.reservaciones = this.buscarServicio.getAllRes();
      } else {
        this.usuario = this.loginService.usuario[0];
        this.reservaciones = this.buscarServicio.getAllResUsuario(this.usuario.id);
      }
  }
}
