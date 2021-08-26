import { Component, OnInit } from '@angular/core';
import { Reservacion } from '../habitacion/habitacion.model';
import { BuscarService } from '../buscar/buscar.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/usuario.model';


@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.page.html',
  styleUrls: ['./reservacion.page.scss'],
})
export class ReservacionPage implements OnInit {
  public reservaciones: Reservacion[];
  public usuario: Usuario;
  constructor(private buscarServicio: BuscarService, private usuarioServicio: UsuarioService) {}

  ngOnInit() {
    console.log('onInit de Reservacion con el usuario:');
    console.log(this.usuarioServicio.usuario[0]);
    if (this.usuarioServicio.usuario[0].tipo === 'Administrador'){
      this.usuario = this.usuarioServicio.usuario[0];
      this.reservaciones = this.buscarServicio.getAllRes();
    } else {
      this.usuario = this.usuarioServicio.usuario[0];
      this.reservaciones = this.buscarServicio.getAllResUsuario(this.usuario.id);
    }
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
    console.log('didEnter de Reservacion con el usuario:');
    console.log(this.usuarioServicio.usuario[0]);
    if (this.usuarioServicio.usuario[0].tipo === 'Administrador'){
      this.usuario = this.usuarioServicio.usuario[0];
      this.reservaciones = this.buscarServicio.getAllRes();
    } else {
      this.usuario = this.usuarioServicio.usuario[0];
      this.reservaciones = this.buscarServicio.getAllResUsuario(this.usuario.id);
    }
  }

}
