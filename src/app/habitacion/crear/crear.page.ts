import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HabitacionService } from '../habitacion.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  formExample: FormGroup;

  constructor(
    private habitacionService: HabitacionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formExample = new FormGroup({

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
      }),
      img1: new FormControl(null, {
        validators: [Validators.required]
      }),
      img2: new FormControl(null, {
        validators: [Validators.required]
      }),
      img3: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  addFunction(){
    if(!this.formExample.valid){
      return;
    }
    console.log(this.formExample);
    this.habitacionService.addHabitacion(
      this.formExample.value.ubicacion,
      this.formExample.value.ubicacion,
      this.formExample.value.estado,
      this.formExample.value.categoria,
      this.formExample.value.descripcion,
      this.formExample.value.img1,
      this.formExample.value.img2,
      this.formExample.value.img3
    );
    this.router.navigate(['/habitacion']);
  }

}
