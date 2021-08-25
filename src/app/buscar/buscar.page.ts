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

  /**ionViewWillEnter() {
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

  ionViewDidEnter() {
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
  }**/

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
          this.habitaciones = this.buscarServicio.getAllHabsAct();
          this.router.navigate(['/buscar/resultados']);
        } else {
          //busco habitaciones activas con filtro de provincia
          console.log('con provincia de parametro');
          this.habitaciones = this.buscarServicio.getAllHabsActProv(this.formBuscar.value.provincia);
          this.router.navigate(['/buscar/resultados', { provincia: this.formBuscar.value.provincia }]);
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
          this.habitaciones = this.buscarServicio.getAllHabsActFechas(fCheckIn, fCheckOut);
          this.router.navigate(['/buscar/resultados', { checkIn: fCheckIn }, { checkOut: fCheckOut }]);
        } else {
          //busco habitaciones activas con filtro checkIn, checkOut y Provincia
          const uProvincia = this.formBuscar.value.provincia;
          const fCheckIn = this.formBuscar.value.checkIn;
          const fCheckOut = this.formBuscar.value.checkOut;
          console.log('con checkin, checkout y provincia de parametro');
          this.habitaciones = this.buscarServicio.getAllHabsActProvFechas(uProvincia, fCheckIn, fCheckOut);
          this.router.navigate(['/buscar/resultados', { checkIn: fCheckIn },
          { checkOut: fCheckOut }, { provincia: uProvincia }]);
        }
      }
    }
  }

}
