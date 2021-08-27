import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Habitacion } from '../habitacion/habitacion.model';
import { BuscarService } from '../buscar/buscar.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {
  habitaciones: Habitacion[];
  formBuscar: FormGroup;
  today: any;
  constructor(private router: Router, private buscarServicio: BuscarService) { }

  ngOnInit() {
    this.getDate();
    this.formBuscar = new FormGroup({
      checkIn: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      checkOut: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
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
    if (!this.formBuscar.value.checkIn){
      if (!this.formBuscar.value.checkOut){
        if (!this.formBuscar.value.provincia){
          //busco habitaciones activas sin filtros de checkin, checkout y provincia
          this.buscarServicio.myProvincia = '';
          this.buscarServicio.myCheckIn = '';
          this.buscarServicio.myCheckOut = '';
          this.habitaciones = this.buscarServicio.getAllHabsAct();
          setTimeout(() => {
            this.router.navigate(['/buscar/resultados']);
          }, 500);
        } else {
          //busco habitaciones activas con filtro de provincia
          this.buscarServicio.myProvincia = this.formBuscar.value.provincia;
          this.buscarServicio.myCheckIn = '';
          this.buscarServicio.myCheckOut = '';
          this.habitaciones = this.buscarServicio.getAllHabsActProv(this.buscarServicio.myProvincia);
          setTimeout(() => {
            this.router.navigate(['/buscar/resultados', { provincia: this.buscarServicio.myProvincia }]);
          }, 500);
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
          const fCheckIn = new Date(this.formBuscar.value.checkIn);
          //const fCheckIn = new Date(this.buscarServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
          this.buscarServicio.myCheckIn = this.formBuscar.value.checkIn;
          const fCheckOut = new Date(this.formBuscar.value.checkOut);
          //const fCheckOut = new Date(this.buscarServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
          this.buscarServicio.myCheckOut = this.formBuscar.value.checkOut;
          this.buscarServicio.myProvincia = '';
          this.habitaciones = this.buscarServicio.getAllHabsActFechas(fCheckIn, fCheckOut);
          setTimeout(() => {
            this.router.navigate(['/buscar/resultados', { checkIn: fCheckIn , checkOut: fCheckOut}]);
          }, 700);
        } else {
          //busco habitaciones activas con filtro checkIn, checkOut y Provincia
          const fCheckIn = new Date(this.formBuscar.value.checkIn);
          //const fCheckIn = new Date(this.buscarServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
          this.buscarServicio.myCheckIn = this.formBuscar.value.checkIn;
          const fCheckOut = new Date(this.buscarServicio.myCheckOut);
          //const fCheckOut = new Date(this.buscarServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
          this.buscarServicio.myCheckOut = this.formBuscar.value.checkOut;
          this.buscarServicio.myProvincia = this.formBuscar.value.provincia;
          this.habitaciones = this.buscarServicio.getAllHabsActProvFechas(this.buscarServicio.myProvincia,
            fCheckIn, fCheckOut);
          setTimeout(() => {
            this.router.navigate(['/buscar/resultados',
            { checkIn: fCheckIn, checkOut: fCheckOut, provincia: this.buscarServicio.myProvincia } ]);
          }, 500);
        }
      }
    }
  }
  getDate() {
    const date = new Date();
    // eslint-disable-next-line max-len
    this.today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2); console.log(this.today); }
}
