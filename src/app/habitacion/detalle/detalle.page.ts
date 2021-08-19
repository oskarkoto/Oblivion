import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Habitacion } from '../habitacion.model';
import { HabitacionService } from '../habitacion.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  habitacion: Habitacion;
  constructor(
    private activatedRoute: ActivatedRoute,
    private habitacionServicio: HabitacionService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('habitacionId')){
          // No existe el parametro redirecciono
          return;
        }
        const habitacionId = paramMap.get('habitacionId');
        this.habitacion = this.habitacionServicio.getHabitacion(habitacionId);
        console.log(this.habitacion);
      }
    );
  }

}
