import { Component } from '@angular/core';
import { Habitacion, Reservacion } from '../../habitacion/habitacion.model';
import { BuscarService } from '../../buscar/buscar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage  {
  habitaciones: Habitacion[];
  reservaciones: Reservacion[];

  constructor(
    private buscarServicio: BuscarService,
    private activatedRoute: ActivatedRoute
  ) { }

  ionViewWillEnter(){
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('provincia')){
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas
              this.habitaciones = this.buscarServicio.getAllHabsAct();
              this.buscarServicio.habitaciones = this.habitaciones;
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
              const fCheckIn = new Date(paramMap.get('checkIn'));
              //const fCheckIn = new Date(this.buscarServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
              const fCheckOut = new Date(paramMap.get('checkOut'));
              //const fCheckOut = new Date(this.buscarServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
              this.habitaciones = this.buscarServicio.getAllHabsActFechas(fCheckIn, fCheckOut);
              this.buscarServicio.habitaciones = this.habitaciones;
            }
          }
        } else {
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas de la provincia seleccionada
              this.habitaciones = this.buscarServicio.getAllHabsActProv(paramMap.get('provincia'));
              this.buscarServicio.habitaciones = this.habitaciones;
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
              const fCheckIn = new Date(paramMap.get('checkIn'));
              const fCheckOut = new Date(paramMap.get('checkOut'));
              this.habitaciones = this.buscarServicio.getAllHabsActProvFechas(paramMap.get('provincia'),
              fCheckIn, fCheckOut);
              this.buscarServicio.habitaciones = this.habitaciones;
            }
          }
        }
      }
    );
  }

  ionViewDidEnter(){
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('provincia')){
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas
              this.habitaciones = this.buscarServicio.getAllHabsAct();
              this.buscarServicio.habitaciones = this.habitaciones;
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
              const fCheckIn = new Date(paramMap.get('checkIn'));
              const fCheckOut = new Date(paramMap.get('checkOut'));
              this.habitaciones = this.buscarServicio.getAllHabsActFechas(fCheckIn, fCheckOut);
              this.buscarServicio.habitaciones = this.habitaciones;
            }
          }
        } else {
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas de la provincia seleccionada
              this.habitaciones = this.buscarServicio.getAllHabsActProv(paramMap.get('provincia'));
              this.buscarServicio.habitaciones = this.habitaciones;
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
              const fCheckIn = new Date(paramMap.get('checkIn'));
              const fCheckOut = new Date(paramMap.get('checkOut'));
              this.habitaciones = this.buscarServicio.getAllHabsActProvFechas(paramMap.get('provincia'),
              fCheckIn, fCheckOut);
              this.buscarServicio.habitaciones = this.habitaciones;
            }
          }
        }
      }
    );
  }

}
