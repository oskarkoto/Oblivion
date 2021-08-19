import { EstadoHabitacion, CategoriaHabitacion, Habitacion } from './habitacion.model';
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
    this.habitaciones = this.getAll();
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
                resData[key].descripcion
              ));
            }
          }
          this.habitaciones = habitaciones;
          console.log(habitaciones);
        }
      );
    return [...this.habitaciones];
  }

  getHabitacion(habitacionId: string){
    return {...this.habitaciones.find(
      habitacion => habitacionId === habitacion.id
    )};
  }

  addHabitacion(id: string, ubicacion: string, estado: EstadoHabitacion, categoria: CategoriaHabitacion, descripcion: string){
    const newHabitacion = new Habitacion(
      id,
      ubicacion,
      estado,
      categoria,
      descripcion);
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

  editHabitacion(id: string, ubicacion: string, estado: EstadoHabitacion, categoria: CategoriaHabitacion, descripcion: string){
    const newHabitacion = new Habitacion(
      id,
      ubicacion,
      estado,
      categoria,
      descripcion
    );
    this.httpClient.put(
      `https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion/${id}.json`,
    {
      ...newHabitacion,
      id: null
    })
    .subscribe(
      (resData) => {
        console.log(resData);
      },
    );
  }

}
