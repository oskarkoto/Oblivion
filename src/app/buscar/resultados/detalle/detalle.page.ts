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
  habitacion: Habitacion;
  reservacion: Reservacion;
  usuario: Usuario;
  myCheckin: string;
  myCheckOut: string;
  dCheckin: Date;
  dCheckOut: Date;
  pTotal: number;
  formCrearReservacion: FormGroup;

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
        //asigno valor para usuario
        this.usuario = this.usuarioServicio.usuario[0];
        //asigno valor para checkIn
        this.myCheckin = this.buscarServicio.myCheckIn;
        //asigno valor para checkOut
        this.myCheckOut = this.buscarServicio.myCheckOut;
        //asigno valor para precioTotal
        const dCheckIn = new Date(this.myCheckin);
        const fCheckIn = new Date(this.buscarServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
        this.dCheckin = fCheckIn;
        const dCheckOut = new Date(this.myCheckOut);
        const fCheckOut = new Date(this.buscarServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
        this.dCheckOut = fCheckOut;
        const differenceDates = Math.abs(fCheckOut.getTime() - fCheckIn.getTime());
        this.pTotal = (this.habitacion.precio) * differenceDates;
        console.log('recibo habitacion' + this.habitacion);
      }
    );
    this.formCrearReservacion = new FormGroup({});
  }

  ionViewDidEnter(){
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
        //asigno valor para usuario
        this.usuario = this.usuarioServicio.usuario[0];
        //asigno valor para checkIn
        this.myCheckin = this.buscarServicio.myCheckIn;
        //asigno valor para checkOut
        this.myCheckOut = this.buscarServicio.myCheckOut;
        //asigno valor para precioTotal
        const dCheckIn = new Date(this.myCheckin);
        const fCheckIn = new Date(this.buscarServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
        this.dCheckin = fCheckIn;
        const dCheckOut = new Date(this.myCheckOut);
        const fCheckOut = new Date(this.buscarServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
        this.dCheckOut = fCheckOut;
        const differenceDates = Math.abs(fCheckOut.getTime() - fCheckIn.getTime());
        this.pTotal = (this.habitacion.precio) * differenceDates;
        console.log('recibo habitacion' + this.habitacion);
      }
    );
    this.formCrearReservacion = new FormGroup({});
  }

  addReservaFunction(){
    if(!this.formCrearReservacion.valid){
      return;
    }
    console.log(this.formCrearReservacion);
    this.buscarServicio.addReservacion(
      this.formCrearReservacion.value.id,
      this.habitacion.id,
      this.usuario.id,
      this.dCheckin,
      this.dCheckOut,
      this.pTotal
    );
    this.router.navigate(['../../../habitacion/detalle']);
  }


}
