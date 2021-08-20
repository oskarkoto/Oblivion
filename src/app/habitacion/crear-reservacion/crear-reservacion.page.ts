import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Habitacion, Reservacion } from '../habitacion.model';
import { HabitacionService } from '../habitacion.service';

@Component({
  selector: 'app-crear-reservacion',
  templateUrl: './crear-reservacion.page.html',
  styleUrls: ['./crear-reservacion.page.scss'],
})
export class CrearReservacionPage implements OnInit {
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
        if(!paramMap.has('habitacionId')){
          // No existe el parametro redirecciono
          return;
        }
        const habitacionId = paramMap.get('habitacionId');
        this.habitacion = this.habitacionServicio.getHabitacion(habitacionId);
        //this.addReservacion();
        console.log(this.habitacion);
      }
    );
  }

  /**addReservacion(){
    this.habitacionServicio.addReservacion(
      this.formCrear.value.id,
      this.formCrear.value.nombre,
      this.formCrear.value.estado,
      this.formCrear.value.categoria,
      this.formCrear.value.capacidad,
      this.formCrear.value.precio,
      this.formCrear.value.provincia,
      this.formCrear.value.descripcion,
      this.uri
    );
    this.router.navigate(['/habitacion']);
  }**/

}
