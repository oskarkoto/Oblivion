import { Component, OnInit } from '@angular/core';
import { Habitacion, Reservacion } from '../../habitacion/habitacion.model';
import { BuscarService } from '../../buscar/buscar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {
  habitaciones: Habitacion[];
  reservaciones: Reservacion[];

  constructor(
    private buscarServicio: BuscarService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('onInit de Resultados');
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('provincia')){
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas
              this.habitaciones = this.buscarServicio.getAllHabsAct();
              this.buscarServicio.habitaciones = this.habitaciones;
              console.log('de onInit a getAllHabsAct ' + this.buscarServicio.habitaciones);
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
              console.log('de onInit a getAllHabsActFechas ' + this.buscarServicio.habitaciones);
            }
          }
        } else {
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas de la provincia seleccionada
              this.habitaciones = this.buscarServicio.getAllHabsActProv(paramMap.get('provincia'));
              this.buscarServicio.habitaciones = this.habitaciones;
              console.log('de onInit a getAllHabsActProv ' + this.buscarServicio.habitaciones);
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
              //const fCheckIn = new Date(this.buscarServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
              const fCheckOut = new Date(paramMap.get('checkOut'));
              //const fCheckOut = new Date(this.buscarServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
              this.habitaciones = this.buscarServicio.getAllHabsActProvFechas(paramMap.get('provincia'),
              fCheckIn, fCheckOut);
              this.buscarServicio.habitaciones = this.habitaciones;
              console.log('de onInit a getAllHabsActProvFechas ' + this.buscarServicio.habitaciones);
            }
          }
        }
      }
    );
  }

  /**ionViewWillEnter(){
    console.log('ionViewWillEnter de Resultados');
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('provincia')){
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas
              this.habitaciones = this.buscarServicio.getAllHabsAct();
              this.buscarServicio.habitaciones = this.habitaciones;
              console.log('de ionViewWillEnter a getAllHabsAct ' + this.buscarServicio.habitaciones);
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
              console.log('de ionViewWillEnter a getAllHabsActFechas ' + this.buscarServicio.habitaciones);
            }
          }
        } else {
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas de la provincia seleccionada
              this.habitaciones = this.buscarServicio.getAllHabsActProv(paramMap.get('provincia'));
              this.buscarServicio.habitaciones = this.habitaciones;
              console.log('de onIionViewWillEnternit a getAllHabsActProv ' + this.buscarServicio.habitaciones);
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
              //const fCheckIn = new Date(this.buscarServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
              const fCheckOut = new Date(paramMap.get('checkOut'));
              //const fCheckOut = new Date(this.buscarServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
              this.habitaciones = this.buscarServicio.getAllHabsActProvFechas(paramMap.get('provincia'),
              fCheckIn, fCheckOut);
              this.buscarServicio.habitaciones = this.habitaciones;
              console.log('de ionViewWillEnter a getAllHabsActProvFechas ' + this.buscarServicio.habitaciones);
            }
          }
        }
      }
    );
  }**/

  ionViewDidEnter(){
    console.log('ionViewDidEnter de Resultados');
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('provincia')){
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas
              this.habitaciones = this.buscarServicio.getAllHabsAct();
              this.buscarServicio.habitaciones = this.habitaciones;
              console.log('de ionViewDidEnter a getAllHabsAct ' + this.buscarServicio.habitaciones);
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
              console.log('de ionViewDidEnter a getAllHabsActFechas ' + this.buscarServicio.habitaciones);
            }
          }
        } else {
          if (!paramMap.has('checkIn')){
            if (!paramMap.has('checkOut')){
              //devuelvo todas las habitaciones activas de la provincia seleccionada
              this.habitaciones = this.buscarServicio.getAllHabsActProv(paramMap.get('provincia'));
              this.buscarServicio.habitaciones = this.habitaciones;
              console.log('de ionViewDidEnter a getAllHabsActProv ' + this.buscarServicio.habitaciones);
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
              //const fCheckIn = new Date(this.buscarServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
              const fCheckOut = new Date(paramMap.get('checkOut'));
              //const fCheckOut = new Date(this.buscarServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
              this.habitaciones = this.buscarServicio.getAllHabsActProvFechas(paramMap.get('provincia'),
              fCheckIn, fCheckOut);
              this.buscarServicio.habitaciones = this.habitaciones;
              console.log('de ionViewDidEnter a getAllHabsActProvFechas ' + this.buscarServicio.habitaciones);
            }
          }
        }
      }
    );
  }

}
