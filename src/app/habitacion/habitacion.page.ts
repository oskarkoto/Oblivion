import { Component, OnInit } from '@angular/core';
import { Habitacion } from './habitacion.model';
import { HabitacionService } from './habitacion.service';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.page.html',
  styleUrls: ['./habitacion.page.scss'],
})
export class HabitacionPage implements OnInit {
  habitaciones: Habitacion[];
  constructor(private habitacionServicio: HabitacionService) { }

  ngOnInit() {
    this.habitaciones = this.habitacionServicio.getAll();
  }

  ionViewWillEnter(){
    this.habitaciones = this.habitacionServicio.getAll();
  }

  ionViewDidEnter(){
    this.habitaciones = this.habitacionServicio.getAll();
  }

}
