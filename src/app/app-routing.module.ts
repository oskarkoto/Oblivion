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
    path: 'habitaciones',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./habitaciones/habitaciones.module').then(
            m => m.HabitacionesPageModule
          )
      },
      {
        path: ':habitacionesId',
        loadChildren: () => import('./habitaciones/detalle/detalle.module').then(
          m => m.DetallePageModule
        )
      },
      {
        path: 'crear',
        loadChildren: () => import('./habitaciones/crear/crear.module').then( m => m.CrearPageModule)
      },
      {
        path: ':habitacionesId/editar',
        loadChildren: () => import('./habitaciones/editar/editar.module').then( m => m.EditarPageModule)
      },
      {
        path: 'editar',
        children: [
          {
            path: ':habitacionesId',
            loadChildren: () => import('./habitaciones/editar/editar.module').then( m => m.EditarPageModule)
          }
        ]
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
  },
  {
    path: 'reservacion',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./reservacion/reservacion.module').then(
            m => m.ReservacionPageModule
          )
      },
      {
        path: ':reservacionId',
        loadChildren: () => import('./reservacion/detalle/detalle.module').then(
          m => m.DetallePageModule
        )
      },
      {
        path: 'crear',
        loadChildren: () => import('./reservacion/crear/crear.module').then( m => m.CrearPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
