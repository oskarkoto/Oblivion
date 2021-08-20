import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitacionPage } from './habitacion.page';

const routes: Routes = [
  {
    path: '',
    component: HabitacionPage
  },
  {
    path: 'detalle',
    loadChildren: () => import('./detalle/detalle.module').then( m => m.DetallePageModule)
  },
  {
    path: 'crear',
    loadChildren: () => import('./crear/crear.module').then( m => m.CrearPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  },  {
    path: 'crear-reservacion',
    loadChildren: () => import('./crear-reservacion/crear-reservacion.module').then( m => m.CrearReservacionPageModule)
  },
  {
    path: 'detalle-reservacion',
    loadChildren: () => import('./detalle-reservacion/detalle-reservacion.module').then( m => m.DetalleReservacionPageModule)
  },
  {
    path: 'reservacion',
    loadChildren: () => import('./reservacion/reservacion.module').then( m => m.ReservacionPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitacionPageRoutingModule {}
