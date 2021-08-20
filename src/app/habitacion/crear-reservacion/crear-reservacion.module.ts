import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearReservacionPageRoutingModule } from './crear-reservacion-routing.module';

import { CrearReservacionPage } from './crear-reservacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearReservacionPageRoutingModule
  ],
  declarations: [CrearReservacionPage]
})
export class CrearReservacionPageModule {}
