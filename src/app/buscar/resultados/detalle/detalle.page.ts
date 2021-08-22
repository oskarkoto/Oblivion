import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Habitacion, Reservacion } from '../../../habitacion/habitacion.model';
import { BuscarService } from '../../buscar.service';

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
    console.log('entro onInit Resultados Detalle');
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('habitacionId')){
          console.log('sin habitacionId');
          //Alerta: No existe Habitación
          return;
        }
        const habitacionId = paramMap.get('habitacionId');
        this.habitacion = this.buscarServicio.getHabitacion(habitacionId);
        console.log('recibo habitacion' + this.habitacion);
      }
    );
  }

}
