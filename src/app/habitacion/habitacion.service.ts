import { Habitacion } from './habitacion.model';
import { Injectable } from '@angular/core';
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
                resData[key].nombre,
                resData[key].estado,
                resData[key].categoria,
                resData[key].capacidad,
                resData[key].precio,
                resData[key].provincia,
                resData[key].descripcion,
                resData[key].img
              ));
            }
          }
          this.habitaciones = habitaciones;
          console.log(habitaciones);
        }
      );
    return [...this.habitaciones];
  }

  getAllActiva(){
    this.httpClient.get<{ [key: string]: Habitacion }>
    ('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json?orderBy="estado"&equalTo=Activa')
    .subscribe(
        resData => {
          const habitaciones = [];
          for( const key in resData){
            if(resData.hasOwnProperty(key)){
              habitaciones.push(new Habitacion(
                key,
                resData[key].nombre,
                resData[key].estado,
                resData[key].categoria,
                resData[key].capacidad,
                resData[key].precio,
                resData[key].provincia,
                resData[key].descripcion,
                resData[key].img
              ));
            }
          }
          this.habitaciones = habitaciones;
          console.log(habitaciones);
        }
      );
    return [...this.habitaciones];
  }

  getAllActivaProvincia(prov: string){
    this.httpClient.get<{ [key: string]: Habitacion }>
    ('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json?orderBy="estado"&equalTo=Activa')
    .subscribe(
        resData => {
          const habitaciones = [];
          const habitacionesProv = [];
          for( const key in resData){
            if(resData.hasOwnProperty(key)){
              if(resData[key].provincia === prov){
                habitaciones.push(new Habitacion(
                  key,
                  resData[key].nombre,
                  resData[key].estado,
                  resData[key].categoria,
                  resData[key].capacidad,
                  resData[key].precio,
                  resData[key].provincia,
                  resData[key].descripcion,
                  resData[key].img
                ));
              }
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

  addHabitacion(id: string, nombre: string, estado: string, categoria: string,
    capacidad: number, precio: number, provincia: string, descripcion: string, img: string){
    const newHabitacion = new Habitacion(
      id,
      nombre,
      estado,
      categoria,
      capacidad,
      precio,
      provincia,
      descripcion,
      img);
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

  editHabitacion(id: string, nombre: string, estado: string, categoria: string,
    capacidad: number, precio: number, provincia: string, descripcion: string, img: string){
    const newHabitacion = new Habitacion(
      id,
      nombre,
      estado,
      categoria,
      capacidad,
      precio,
      provincia,
      descripcion,
      img);
    this.httpClient.put(
      `https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion/${id}.json`,
    {
      ...newHabitacion,
      id: null
    })
    .subscribe(
      (resData) => {
        console.log(resData);
        //newHabitacion.id = resData.name;
      },
    );
  }

}
