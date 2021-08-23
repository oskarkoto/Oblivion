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
  constructor(private habitacionServicio: HabitacionService) {}

  ngOnInit() {
    this.habitaciones = this.habitacionServicio.getAllHabs();
  }

  ionViewWillEnter(){
    console.log('onInitHabitacion');
    this.habitaciones = this.habitacionServicio.getAllHabs();
  }

  ionViewDidEnter(){
    console.log('onInitHabitacion');
    this.habitaciones = this.habitacionServicio.getAllHabs();
  }

}
