import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Habitacion } from '../habitacion.model';
import { HabitacionService } from '../habitacion.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  formEdit: FormGroup;
  habitacion: Habitacion;
  constructor(
    private activatedRoute: ActivatedRoute,
    private habitacionServicio: HabitacionService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('habitacionId')){
          // No existe el parametro redirecciono
          return;
        }
        const habitacionId = paramMap.get('habitacionId');
        this.habitacion = this.habitacionServicio.getHabitacion(habitacionId);
        console.log(this.habitacion);
      }
    );
    this.formEdit = new FormGroup({
      id: new FormControl(this.habitacion.id, {
        updateOn: 'blur'
      }),
      ubicacion: new FormControl(this.habitacion.ubicacion, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      estado: new FormControl(this.habitacion.estado, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      categoria: new FormControl(this.habitacion.categoria, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      descripcion: new FormControl(this.habitacion.descripcion, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      img: new FormControl(this.habitacion.img, {
        validators: [Validators.required]
      })
    });
  }

  editFunction(){
    if(!this.formEdit.valid){
      return;
    }
    console.log(this.formEdit);
    this.habitacionServicio.editHabitacion(
      this.formEdit.value.id,
      this.formEdit.value.ubicacion,
      this.formEdit.value.estado,
      this.formEdit.value.categoria,
      this.formEdit.value.descripcion,
      this.formEdit.value.img
    );
    this.router.navigate(['/habitacion']);
  }

}
