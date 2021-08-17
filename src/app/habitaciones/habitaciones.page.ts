import { Component, OnInit } from '@angular/core';
import { Habitacion } from './habitaciones.model';
import { HabitacionesService } from './habitaciones.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.page.html',
  styleUrls: ['./habitaciones.page.scss'],
})
export class HabitacionesPage implements OnInit {
  habitaciones: Habitacion[];
  constructor(private habitacionesServicio: HabitacionesService) { }

  ngOnInit() {
    this.habitaciones = this.habitacionesServicio.getAll();
  }

  ionViewWillEnter(){
    this.habitaciones = this.habitacionesServicio.getAll();
  }

}
