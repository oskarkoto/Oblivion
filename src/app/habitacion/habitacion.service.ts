import { EstadoHabitacion, CategoriaHabitacion, Habitacion } from './habitacion.model';
import { TipoUsuario, Usuario  } from '../usuario/usuario.model';
import { Injectable } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private habitaciones: Habitacion[] = [];
  constructor(private httpClient: HttpClient)
  {

  }

  getAll(){
    this.httpClient.get<{ [key: string]: Habitacion }>('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json')
    .subscribe(
        resData => {
          const habitaciones = [];
          for( const key in resData){
            if(resData.hasOwnProperty(key)){
              habitaciones.push(new Habitacion(
                key,
                resData[key].ubicacion,
                resData[key].estado,
                resData[key].categoria,
                resData[key].descripcion,
                resData[key].img1,
                resData[key].img2,
                resData[key].img3
              ));
            }
          }
          this.habitaciones = habitaciones;
        }
      );
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
    this.httpClient.post<{name: string}>('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json',
    {
      ...newHabitacion,
      id: null
    })
    .subscribe(
      (resData) => {
        newHabitacion.id = resData.name;
      },
    );
    this.habitaciones.push(newHabitacion);
  }

}
