import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Usuario } from '@app/usuario/usuario.model';
import { UsuarioService } from '@app/usuario/usuario.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  formEdit: FormGroup;
  usuario: Usuario;
  public usuarioLogueado: Usuario[]=[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioServicio: UsuarioService,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.usuarioLogueado[0]= usuarioServicio.usuario[0];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('usuarioId')){
          // No existe el parametro redirecciono
          return;
        }
        const usuarioId = paramMap.get('usuarioId');
        this.usuarioLogueado[0] = this.usuarioServicio.getUsuario(usuarioId);
        console.log(this.usuario);
      }
    );
    this.formEdit = new FormGroup({
      id: new FormControl(this.usuarioLogueado[0].id, {
        updateOn: 'blur'
      }),
      nombre: new FormControl(this.usuarioLogueado[0].nombre, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      primerApellido: new FormControl(this.usuarioLogueado[0].primerApellido, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      segundoApellido: new FormControl(this.usuarioLogueado[0].segundoApellido, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      telefono: new FormControl(this.usuarioLogueado[0].telefono, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      correo: new FormControl(this.usuarioLogueado[0].correo, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password: new FormControl(this.usuarioLogueado[0].password, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      tipo: new FormControl(this.usuarioLogueado[0].tipo, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  editFunction(){
    if(!this.formEdit.valid){
      return;
    }
    console.log(this.formEdit);
    this.usuarioServicio.editUsuario(
      this.formEdit.value.id,
      this.formEdit.value.nombre,
      this.formEdit.value.primerApellido,
      this.formEdit.value.segundoApellido,
      this.formEdit.value.telefono,
      this.formEdit.value.correo,
      this.formEdit.value.password,
      this.formEdit.value.tipo,
    );
    this.router.navigate(['/perfil']);
  }
}
