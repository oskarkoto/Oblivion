import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuarios: Usuario[];
  constructor(private usuarioServicio: UsuarioService) {}

  ngOnInit() {
    console.log('onInitUsuario');
    this.usuarios = this.usuarioServicio.getAll();
  }

  ionViewWillEnter(){
    console.log('onWillEnterUsuario');
    this.usuarios = this.usuarioServicio.getAll();
  }

  ionViewDidEnter(){
    console.log('onInitDidEnterUsuario');
    this.usuarios = this.usuarioServicio.getAll();
  }

}
