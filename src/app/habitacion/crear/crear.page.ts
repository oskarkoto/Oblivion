import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HabitacionService } from '../habitacion.service';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';


export interface FILE {
  name: string;
  filepath: string;
  size: number;
}
@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  formCrear: FormGroup;
  constructor(
    private habitacionServicio: HabitacionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formCrear = new FormGroup({
      ubicacion: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      estado: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      categoria: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      descripcion: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  addFunction(){
    if(!this.formCrear.valid){
      return;
    }
    console.log(this.formCrear);
    this.habitacionServicio.addHabitacion(
      this.formCrear.value.id,
      this.formCrear.value.ubicacion,
      this.formCrear.value.estado,
      this.formCrear.value.categoria,
      this.formCrear.value.descripcion
    );
    this.router.navigate(['/habitacion']);
  }

}
