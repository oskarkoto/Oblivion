import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservacionPage } from './reservacion.page';

const routes: Routes = [
  {
    path: '',
    component: ReservacionPage
  },
  {
    path: 'detalle',
    loadChildren: () => import('./detalle/detalle.module').then( m => m.DetallePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservacionPageRoutingModule {}
