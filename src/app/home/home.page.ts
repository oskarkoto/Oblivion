import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HabitacionService } from '../habitacion/habitacion.service';
import { Habitacion, Reservacion } from '../habitacion/habitacion.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  //habitaciones: Habitacion[];
  //reservaciones: Reservacion[];
  formBuscar: FormGroup;
  slides: { id: number;img: string}[] = [
    { id: 1,
      img: '/assets/img/inicio/hotel_inicio.jpg'}
    ,
    { id: 2,
      img: '/assets/img/inicio/habitacion_inicio.jpg'}
    ,
    { id: 3,
      img: '/assets/img/inicio/privado_inicio.jpg'}
    ];
  constructor(
    //private habitacionServicio: HabitacionService,
    private router: Router) {}

    ngOnInit() {
      this.formBuscar = new FormGroup({
        checkIn: new FormControl(null, {
          updateOn: 'blur',
          validators:[]
        }),
        checkOut: new FormControl(null, {
          updateOn: 'blur',
          validators:[]
        }),
        provincia: new FormControl(null, {
          updateOn: 'blur',
          validators:[]
        })
      });
    }

    searchFunction(){
      if(!this.formBuscar.valid){
        return;
      }
      console.log(this.formBuscar);
      if (!this.formBuscar.value.checkIn){
        if (!this.formBuscar.value.checkOut){
          if (!this.formBuscar.value.provincia){
            //busco habitaciones activas sin filtros de checkin, checkout y provincia
            console.log('sin parametros hacia habitacion');
            this.router.navigate(['/habitacion']);
          } else {
            //busco habitaciones activas con filtro de provincia
            const uProvincia = this.formBuscar.value.provincia;
            console.log('con provincia de parametro');
            this.router.navigate(['/habitacion', { provincia: uProvincia }]);
          }
        } else {
          //Alerta: no puedo buscar sin checkin
        }
      } else {
        if (!this.formBuscar.value.checkOut){
          //Alerta: no puedo buscar sin checkOut
        } else {
          if (!this.formBuscar.value.provincia){
            //busco habitaciones activas con filtro checkIn y checkOut
            const fCheckIn = this.formBuscar.value.checkIn;
            const fCheckOut = this.formBuscar.value.checkOut;
            console.log('con checkin y checkout de parametro');
            this.router.navigate(['/habitacion', { checkIn: fCheckIn }, { checkOut: fCheckOut }]);
          } else {
            //busco habitaciones activas con filtro checkIn, checkOut y Provincia
            const uProvincia = this.formBuscar.value.provincia;
            const fCheckIn = this.formBuscar.value.checkIn;
            const fCheckOut = this.formBuscar.value.checkOut;
            console.log('con checkin, checkout y provincia de parametro');
            this.router.navigate(['/habitacion', { checkIn: fCheckIn }, { checkOut: fCheckOut }, { provincia: uProvincia }]);
          }
        }
      }
    }

}
