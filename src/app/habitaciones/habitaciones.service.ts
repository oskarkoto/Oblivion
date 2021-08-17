import { EstadoHabitacion, CategoriaHabitacion, Habitacion } from './habitaciones.model';
import { TipoUsuario, Usuario  } from '../usuario/usuario.model';
import { Injectable } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  private habitaciones: Habitacion[] = [];
  constructor(private httpClient: HttpClient)
  {

  }

  getAll(){
    return [...this.habitaciones];
  }

  getHabitacion(habitacionesId: string){
    return {...this.habitaciones.find(
      habitacion => habitacionesId === habitacion.id
    )};
  }

  addHabitacion(id: string, nombre: string, estado: EstadoHabitacion, categoria: CategoriaHabitacion, descripcion: string,
    img1: string, img2: string, img3: string){
    id= Math.random().toString();
    const newHabitacion = new Habitacion(
      id,
      nombre,
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
