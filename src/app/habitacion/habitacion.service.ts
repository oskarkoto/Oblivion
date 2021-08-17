import { EstadoHabitacion, CategoriaHabitacion, Habitacion } from './habitacion.model';
import { TipoUsuario, Usuario  } from '../usuario/usuario.model';
import { Injectable } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private habitaciones: Habitacion[] = [];
  constructor(private httpClient: HttpClient)
  {

  }

  getAll(){
    return [...this.habitaciones];
  }

  getHabitacion(habitacionId: string){
    return {...this.habitaciones.find(
      habitacion => habitacionId === habitacion.id
    )};
  }

  addHabitacion(id: string, ubicacion: string, estado: EstadoHabitacion, categoria: CategoriaHabitacion, descripcion: string,
    img1: string, img2: string, img3: string){
    const newHabitacion = new Habitacion(
      id,
      ubicacion,
      estado,
      categoria,
      descripcion,
      img1,
      img2,
      img3);
    this.httpClient.post('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json',
    {
      ...newHabitacion,
      id: newHabitacion.id
    })
    .subscribe(
      (resData) => {
      console.log(resData);
      },
    );
    this.habitaciones.push(newHabitacion);
  }

}
