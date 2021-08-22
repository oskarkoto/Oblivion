import { Component, OnInit } from '@angular/core';
import { Habitacion, Reservacion } from './habitacion.model';
import { HabitacionService } from './habitacion.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.page.html',
  styleUrls: ['./habitacion.page.scss'],
})
export class HabitacionPage implements OnInit {
  habitaciones: Habitacion[];
  reservaciones: Reservacion[];

  constructor(private habitacionServicio: HabitacionService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log('onInit de Habitacion');
    this.habitaciones = this.habitacionServicio.getAllHabs();
    //this.reservaciones = this.habitacionServicio.getAllRes();
  }

  ionViewWillEnter(){
    console.log('onViewWillEnter de Habitacion');
    this.habitaciones = this.habitacionServicio.getAllHabs();
    //this.reservaciones = this.habitacionServicio.getAllRes();
  }

}
