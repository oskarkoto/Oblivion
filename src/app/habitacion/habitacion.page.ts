import { Component, OnInit } from '@angular/core';
import { Habitacion, Reservacion } from './habitacion.model';
import { HabitacionService } from './habitacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.page.html',
  styleUrls: ['./habitacion.page.scss'],
})
export class HabitacionPage implements OnInit {
  habitaciones: Habitacion[];
  reservaciones: Reservacion[];

  constructor(
    private habitacionServicio: HabitacionService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}



  ngOnInit() {
    //this.habitaciones = this.habitacionServicio.getAllHabsAct();
    //this.reservaciones = this.habitacionServicio.getAllRes();

    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('provincia')){
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas
              this.habitaciones = this.habitacionServicio.getAllHabsAct();
            } else {
              //Alerta: No puedo buscar sin CheckIn
              return;
            }
          } else {
            if (!paramMap.has('checkOut')){
              //Alerta: No puedo buscar sin CheckOut
              return;
            } else {
              //devuelvo todas las habitaciones activas sin reservaciones entre checkIn y checkOut
              const dCheckIn = new Date(paramMap.get('checkIn'));
              const fCheckIn = new Date(this.habitacionServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
              const dCheckOut = new Date(paramMap.get('checkOut'));
              const fCheckOut = new Date(this.habitacionServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
              this.habitaciones = this.habitacionServicio.getAllHabsActFechas(fCheckIn, fCheckOut);
            }
          }
        } else {
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas de la provincia seleccionada
              this.habitaciones = this.habitacionServicio.getAllHabsActProv(paramMap.get('provincia'));
            } else {
              //Alerta: no puedo buscar sin checkIn
              return;
            }
          } else {
            if (!paramMap.has('checkOut')){
              //Alerta: no puedo buscar sin checkOut
              return;
            } else {
              //retorno todas las habs activas, de la provincia seleccionada y sin reservaciones
              //entre el checkIn y checkOut
              const dCheckIn = new Date(paramMap.get('checkIn'));
              const fCheckIn = new Date(this.habitacionServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
              const dCheckOut = new Date(paramMap.get('checkOut'));
              const fCheckOut = new Date(this.habitacionServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
              this.habitaciones = this.habitacionServicio.getAllHabsActProvFechas(paramMap.get('provincia'),
              fCheckIn, fCheckOut);
            }
          }
        }
      }
    );
  }

  ionViewWillEnter(){
    //this.habitaciones = this.habitacionServicio.getAllHabsAct();
    //this.reservaciones = this.habitacionServicio.getAllRes();
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('provincia')){
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas
              this.habitaciones = this.habitacionServicio.getAllHabsAct();
            } else {
              //Alerta: No puedo buscar sin CheckIn
              return;
            }
          } else {
            if (!paramMap.has('checkOut')){
              //Alerta: No puedo buscar sin CheckOut
              return;
            } else {
              //devuelvo todas las habitaciones activas sin reservaciones entre checkIn y checkOut
              const dCheckIn = new Date(paramMap.get('checkIn'));
              const fCheckIn = new Date(this.habitacionServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
              const dCheckOut = new Date(paramMap.get('checkOut'));
              const fCheckOut = new Date(this.habitacionServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
              this.habitaciones = this.habitacionServicio.getAllHabsActFechas(fCheckIn, fCheckOut);
            }
          }
        } else {
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas de la provincia seleccionada
              this.habitaciones = this.habitacionServicio.getAllHabsActProv(paramMap.get('provincia'));
            } else {
              //Alerta: no puedo buscar sin checkIn
              return;
            }
          } else {
            if (!paramMap.has('checkOut')){
              //Alerta: no puedo buscar sin checkOut
              return;
            } else {
              //retorno todas las habs activas, de la provincia seleccionada y sin reservaciones
              //entre el checkIn y checkOut
              const dCheckIn = new Date(paramMap.get('checkIn'));
              const fCheckIn = new Date(this.habitacionServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
              const dCheckOut = new Date(paramMap.get('checkOut'));
              const fCheckOut = new Date(this.habitacionServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
              this.habitaciones = this.habitacionServicio.getAllHabsActProvFechas(paramMap.get('provincia'),
              fCheckIn, fCheckOut);
            }
          }
        }
      }
    );
  }

}
