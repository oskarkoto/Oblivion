import { Component, OnInit } from '@angular/core';
import { Habitacion, Reservacion } from '../habitacion.model';
import { HabitacionService } from '../habitacion.service';


@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.page.html',
  styleUrls: ['./reservacion.page.scss'],
})
export class ReservacionPage implements OnInit {
  habitaciones: Habitacion[];
  reservaciones: Reservacion[];

  constructor(private habitacionServicio: HabitacionService) { }

  ngOnInit() {
    this.habitaciones = this.habitacionServicio.getAllHabs();
    this.reservaciones = this.habitacionServicio.getAllRes();
  }

  ionViewWillEnter(){
    this.habitaciones = this.habitacionServicio.getAllHabs();
    this.reservaciones = this.habitacionServicio.getAllRes();
  }

}
