import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})

export class DetallePage implements OnInit {
  usuario: Usuario;
  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioServicio: UsuarioService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('usuarioId')){
          // No existe el parametro redirecciono
          return;
        }
        const usuarioId = paramMap.get('usuarioId');
        this.usuario = this.usuarioServicio.getUsuario(usuarioId);
      }
    );
  }

  deleteUsuario() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('usuarioId')){
          // No existe el parametro redirecciono
          return;
        }
        const usuarioId = paramMap.get('usuarioId');
        if (window.confirm('¿Realmente desea borrar el usuario?')) {
         this.usuarioServicio.deleteUsuario(usuarioId);
         setTimeout(()=>{
          this.router.navigate(['/usuario']);
        },500);
      }
      }
    );
  }

}
