import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Habitacion, Reservacion } from '../habitacion/habitacion.model';
import { BuscarService } from '../buscar/buscar.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {
  habitaciones: Habitacion[];
  //reservaciones: Reservacion[];
  formBuscar: FormGroup;
  constructor(private router: Router, private buscarServicio: BuscarService) { }

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
          console.log('sin parametros hacia resultados');
          this.buscarServicio.myProvincia = '';
          this.buscarServicio.myCheckIn = '';
          this.buscarServicio.myCheckOut = '';
          this.habitaciones = this.buscarServicio.getAllHabsAct();
          this.router.navigate(['/buscar/resultados']);
        } else {
          //busco habitaciones activas con filtro de provincia
          console.log('con provincia de parametro');
          this.buscarServicio.myProvincia = this.formBuscar.value.provincia;
          this.buscarServicio.myCheckIn = '';
          this.buscarServicio.myCheckOut = '';
          this.habitaciones = this.buscarServicio.getAllHabsActProv(this.buscarServicio.myProvincia);
          this.router.navigate(['/buscar/resultados', { provincia: this.buscarServicio.myProvincia }]);
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
          console.log('con checkin y checkout de parametro');
          const fCheckIn = new Date(this.formBuscar.value.checkIn);
          console.log('fCheckIn: ' + fCheckIn);
          //const fCheckIn = new Date(this.buscarServicio.getFormatedDate(dCheckIn, 'MM/dd/yyyy'));
          this.buscarServicio.myCheckIn = this.formBuscar.value.checkIn;
          const fCheckOut = new Date(this.formBuscar.value.checkOut);
          //const fCheckOut = new Date(this.buscarServicio.getFormatedDate(dCheckOut, 'MM/dd/yyyy'));
          this.buscarServicio.myCheckOut = this.formBuscar.value.checkOut;
          this.buscarServicio.myProvincia = '';
          console.log('Envío '+ fCheckIn + ' y '+ fCheckOut + ' a getAllHabsActFechas');
          this.habitaciones = this.buscarServicio.getAllHabsActFechas(fCheckIn, fCheckOut);
          console.log('recibo de getAllHabsActFechas');
          this.router.navigate(['/buscar/resultados', { checkIn: fCheckIn },
          { checkOut: fCheckOut }]);
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
          this.router.navigate(['/buscar/resultados', { checkIn: fCheckIn },
          { checkOut: fCheckOut }, { provincia: this.buscarServicio.myProvincia }]);
        }
      }
    }
  }

}
