import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Habitacion, Reservacion } from '../../habitacion/habitacion.model';
import { HabitacionService } from '../../habitacion/habitacion.service';

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
    private habitacionServicio: HabitacionService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('reservacionID')){
          //Alerta: No existe Reservacion
          return;
        }
        const reservacionId = paramMap.get('reservacionID');
        this.reservacion = this.habitacionServicio.getReservacion(reservacionId);
        console.log('recibo reservacion' + this.reservacion);
      }
    );
  }

}
