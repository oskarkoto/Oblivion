import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'habitacion',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./habitacion/habitacion.module').then(
            m => m.HabitacionPageModule
          )
      },
      {
        path: ':habitacionId',
        loadChildren: () => import('./habitacion/detalle/detalle.module').then(
          m => m.DetallePageModule
        )
      },
      {
        path: 'crear',
        loadChildren: () => import('./habitacion/crear/crear.module').then( m => m.CrearPageModule)
      },
      {
        path: ':habitacionId/editar',
        loadChildren: () => import('./habitacion/editar/editar.module').then( m => m.EditarPageModule)
      },
      {
        path: 'editar',
        children: [
          {
            path: ':habitacionId',
            loadChildren: () => import('./habitacion/editar/editar.module').then( m => m.EditarPageModule)
          }
        ]
      },
      {
        path: 'crear-reservacion',
        loadChildren: () => import('./habitacion/crear-reservacion/crear-reservacion.module').then( m => m.CrearReservacionPageModule)
      },
      {
        path: 'reservacion',
        loadChildren: () => import('./habitacion/reservacion/reservacion.module').then( m => m.ReservacionPageModule)
      },
      {
        path: 'detalle-reservacion',
        loadChildren: () => import('./habitacion/detalle-reservacion/detalle-reservacion.module').then( m => m.DetalleReservacionPageModule)
      }
    ]
  },
  {
    path: 'usuario',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./usuario/usuario.module').then(
            m => m.UsuarioPageModule
          )
      },
      {
        path: ':usuarioId',
        loadChildren: () => import('./usuario/detalle/detalle.module').then(
          m => m.DetallePageModule
        )
      },
      {
        path: 'crear',
        loadChildren: () => import('./usuario/crear/crear.module').then( m => m.CrearPageModule)
      },
      {
        path: ':usuarioId/editar',
        loadChildren: () => import('./usuario/editar/editar.module').then( m => m.EditarPageModule)
      },
      {
        path: 'editar',
        children: [
          {
            path: ':usuarioId',
            loadChildren: () => import('./usuario/editar/editar.module').then( m => m.EditarPageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
