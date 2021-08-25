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
    if (this.usuario.tipo === 'Administrador'){
      this.usuario = this.usuarioServicio.usuario[0];
      this.reservaciones = this.buscarServicio.getAllRes();
    } else {
      this.usuario = this.usuarioServicio.usuario[0];
      this.reservaciones = this.buscarServicio.getAllResUsuario(this.usuario.id);
    }
  }

  ionViewWillEnter(){
    if (this.usuario.tipo === 'Administrador'){
      this.usuario = this.usuarioServicio.usuario[0];
      this.reservaciones = this.buscarServicio.getAllRes();
    } else {
      this.usuario = this.usuarioServicio.usuario[0];
      this.reservaciones = this.buscarServicio.getAllResUsuario(this.usuario.id);
    }
  }

  ionViewDidEnter(){
    if (this.usuario.tipo === 'Administrador'){
      this.usuario = this.usuarioServicio.usuario[0];
      this.reservaciones = this.buscarServicio.getAllRes();
    } else {
      this.usuario = this.usuarioServicio.usuario[0];
      this.reservaciones = this.buscarServicio.getAllResUsuario(this.usuario.id);
    }
  }

}
