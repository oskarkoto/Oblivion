import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleReservacionPageRoutingModule } from './detalle-reservacion-routing.module';

import { DetalleReservacionPage } from './detalle-reservacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleReservacionPageRoutingModule
  ],
  declarations: [DetalleReservacionPage]
})
export class DetalleReservacionPageModule {}
