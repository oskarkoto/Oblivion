import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Habitacion, Reservacion } from '../../habitacion/habitacion.model';
import { BuscarService } from '../../buscar/buscar.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { Usuario } from '@app/usuario/usuario.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  public habitacion: Habitacion;
  public reservacion: Reservacion;
  public usuario: Usuario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private buscarServicio: BuscarService,
    private usuarioServicio: UsuarioService,
  ) { }

  ngOnInit() {
    console.log('onInit Reservacion Detalle con:');
    //this.habitacion = this.buscarServicio.habitacion[0];
    //this.reservacion = this.buscarServicio.reservacion[0];
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('reservacionID')){
          this.reservacion = this.buscarServicio.getReservacion(this.buscarServicio.habitacion[0].id);
          console.log(this.reservacion);
          this.habitacion = this.buscarServicio.getHabitacion(this.reservacion.habitacion);
          console.log(this.habitacion);
          this.usuario = this.usuarioServicio.getUsuario(this.reservacion.usuario);
          console.log(this.usuario);
          return;
        }
        const reservacionId = paramMap.get('reservacionID');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.reservacion = this.buscarServicio.getReservacion(reservacionId);
        this.habitacion = this.buscarServicio.getHabitacion(this.reservacion.habitacion);
        this.usuario = this.usuarioServicio.getUsuario(this.reservacion.usuario);
      }
    );
  }

}
