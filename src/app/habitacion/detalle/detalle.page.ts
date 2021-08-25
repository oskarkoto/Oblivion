import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Habitacion, Reservacion } from '../habitacion.model';
import { HabitacionService } from '../habitacion.service';

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
        if(!paramMap.has('habitacionID')){
          //Alerta: No existe Habitación
          return;
        }
        const habitacionId = paramMap.get('habitacionID');
        this.habitacion = this.habitacionServicio.getHabitacion(habitacionId);
        console.log('recibo habitacion' + this.habitacion);
      }
    );
  }

}
