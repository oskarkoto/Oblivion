import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleReservacionPage } from './detalle-reservacion.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleReservacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleReservacionPageRoutingModule {}
