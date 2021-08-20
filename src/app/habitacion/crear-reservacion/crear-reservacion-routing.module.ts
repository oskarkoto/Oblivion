import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearReservacionPage } from './crear-reservacion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearReservacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearReservacionPageRoutingModule {}
