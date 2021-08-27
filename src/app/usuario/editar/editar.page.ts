import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  formEdit: FormGroup;
  usuarios: Usuario;
  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioServicio: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('usuarioId')){
          // No existe el parametro redirecciono
          return;
        }
        const usuarioId = paramMap.get('usuarioId');
        this.usuarios = this.usuarioServicio.getUsuario(usuarioId);
      }
    );
    this.formEdit = new FormGroup({
      id: new FormControl(this.usuarios.id, {
        updateOn: 'blur'
      }),
      nombre: new FormControl(this.usuarios.nombre, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      primerApellido: new FormControl(this.usuarios.primerApellido, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      segundoApellido: new FormControl(this.usuarios.segundoApellido, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      telefono: new FormControl(this.usuarios.telefono, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      correo: new FormControl(this.usuarios.correo, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password: new FormControl(this.usuarios.password, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      tipo: new FormControl(this.usuarios.tipo, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  editFunction(){
    if(!this.formEdit.valid){
      return;
    }
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
    setTimeout(()=>{
      this.router.navigate(['/usuario']);
    },1000);
  }

}
