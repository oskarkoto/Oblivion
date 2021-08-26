import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Habitacion, Reservacion } from '../../habitacion/habitacion.model';
import { BuscarService } from '../../buscar/buscar.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  habitacion: Habitacion;
  reservacion: Reservacion;
  constructor(
    private activatedRoute: ActivatedRoute,
    private buscarServicio: BuscarService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.habitacion = this.buscarServicio.habitacion[0];
    this.reservacion = this.buscarServicio.reservacion[0];
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('reservacionID')){
          //Alerta: No existe Reservacion
          return;
        }
        const reservacionId = paramMap.get('reservacionID');
        this.reservacion = this.buscarServicio.getReservacion(reservacionId);
        this.habitacion = this.buscarServicio.getHabitacion(this.reservacion.habitacion);
        console.log('recibo reservacion' + this.reservacion);
      }
    );
  }

  ionViewDidEnter() {
    this.habitacion = this.buscarServicio.habitacion[0];
    this.reservacion = this.buscarServicio.reservacion[0];
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('reservacionID')){
          //Alerta: No existe Reservacion
          return;
        }
        const reservacionId = paramMap.get('reservacionID');
        this.reservacion = this.buscarServicio.getReservacion(reservacionId);
        this.habitacion = this.buscarServicio.getHabitacion(this.reservacion.habitacion);
        console.log('recibo reservacion' + this.reservacion);
      }
    );
  }

}
