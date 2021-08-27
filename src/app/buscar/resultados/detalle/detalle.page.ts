import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Habitacion, Reservacion } from '../../../habitacion/habitacion.model';
import { Usuario } from '../../../usuario/usuario.model';
import { UsuarioService } from '../../../usuario/usuario.service';
import { BuscarService } from '../../buscar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  public habitacion: Habitacion;
  public reservacion: Reservacion;
  public usuario: Usuario;
  public myCheckin: string;
  public myCheckOut: string;
  public dCheckin: Date;
  public dCheckOut: Date;
  public pTotal: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private buscarServicio: BuscarService,
    private usuarioServicio: UsuarioService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    console.log('entro onInit Resultados Detalle');
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('habitacionID')){
          console.log('sin habitacionID');
          //Alerta: No existe Habitación
          return;
        }
        const habitacionId = paramMap.get('habitacionID');
        //asigno habitacion
        this.habitacion = this.buscarServicio.getHabitacion(habitacionId);
        this.buscarServicio.habitacion[0] = this.habitacion;
        console.log('ngOnInit Resultados -> Detalle de Habitacion:');
        console.log(this.habitacion);
        //asigno valor para usuario
        this.usuario = this.usuarioServicio.usuario[0];
        console.log('ngOnInit Resultados -> Detalle de Usuario:');
        console.log(this.usuario);
        //asigno valor para checkIn
        this.myCheckin = this.buscarServicio.myCheckIn;
        //asigno valor para checkOut
        this.myCheckOut = this.buscarServicio.myCheckOut;
        //asigno valor para precioTotal
        const fCheckIn = new Date(this.myCheckin);
        //const fCheckIn = new Date(this.buscarServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
        this.dCheckin = fCheckIn;
        const fCheckOut = new Date(this.myCheckOut);
        //const fCheckOut = new Date(this.buscarServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
        this.dCheckOut = fCheckOut;
        //calculo la diferencia en días entre checkIn y checkOut
        const time = Math.abs(fCheckOut.getTime() - fCheckIn.getTime());
        const differenceDates = Math.round(time / (1000 * 3600 * 24));
        console.log('Diferencia de dias entre ci y co:');
        console.log(differenceDates);
        this.pTotal = (this.habitacion.precio) * differenceDates;
        console.log('recibo habitacion');
        console.log(this.habitacion);
      }
    );
  }

  addReservaFunction(){
    console.log(this.buscarServicio.habitacion[0].id);
    this.buscarServicio.addReservacion(
      this.buscarServicio.habitacion[0].id,
      this.usuarioServicio.usuario[0].id,
      this.buscarServicio.habitacion[0].id,
      this.dCheckin,
      this.dCheckOut,
      this.pTotal
    );
    const lastReserva = this.buscarServicio.reservacion[0].id;
    //this.router.navigate(['../../../reservacion/detalle', {reservacionID: lastReserva}]);
    this.router.navigate(['../../../reservacion/detalle']);
  }


}
