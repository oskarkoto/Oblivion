import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'perfil',
    children:[
      {
        path: '',
        loadChildren: () => import('./login/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'editar',
        children: [
          {
            path: ':usuarioID',
            loadChildren: () => import('./login/perfil/editar/editar.module').then(m => m.EditarPageModule)
          }
        ]
      },
    ]
  },

  {
    path: 'registro',
    loadChildren: () => import('./login/registro/registro.module').then(m => m.RegistroPageModule)
  },

  {
    path: 'logout',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'habitacion',
    data: { preload: true } ,
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
    path: 'buscar',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./buscar/buscar.module').then(
            m => m.BuscarPageModule
          )
      },
      {
        path: ':resultadoID',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./buscar/resultados/resultados.module').then(
                m => m.ResultadosPageModule
              )
          },
          {
            path: ':habitacionID/detalle',
            loadChildren: () => import('./buscar/resultados/detalle/detalle.module').then(
              m => m.DetallePageModule
            )
          },
          {
            path: ':habitacionID',
            loadChildren: () => import('./buscar/resultados/detalle/detalle.module').then(
              m => m.DetallePageModule
            )
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
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
