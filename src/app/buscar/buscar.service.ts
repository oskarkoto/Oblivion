import { Habitacion, Reservacion } from './../habitacion/habitacion.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  public habitaciones: Habitacion[] = [];
  public habitacion: Habitacion[] = [];
  public reservaciones: Reservacion[] = [];
  public reservacion: Reservacion[] = [];
  public myProvincia: string;
  public myCheckIn: string;
  public myCheckOut: string;

  constructor(private httpClient: HttpClient)
  {
    this.habitaciones = this.getAllHabsAct();
  }

  // format date in typescript
  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  //----*----*----Metodos de Habitacion----*----*----//

  getAllHabsAct(){
    this.httpClient.get<{ [key: string]: Habitacion }>
    ('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json')
    .subscribe(
        resData => {
          const habitaciones = [];
          for( const key in resData){
            if(resData.hasOwnProperty(key)){
              //condicional estado Activa
              if (resData[key].estado === 'Activa'){
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
        }
      );
    return [...this.habitaciones];
  }

  getAllHabsActProv(prov: string){
    this.httpClient.get<{ [key: string]: Habitacion }>
    ('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json')
    .subscribe(
        resData => {
          const habitaciones = [];
          for( const key in resData){
            if(resData.hasOwnProperty(key)){
              //condicional estado = Activa
              if (resData[key].estado === 'Activa'){
                //condicional de provincia = prov
                if(resData[key].provincia === prov){
                  habitaciones.push(new Habitacion(key, resData[key].nombre, resData[key].estado,
                    resData[key].categoria, resData[key].capacidad, resData[key].precio,
                    resData[key].provincia, resData[key].descripcion, resData[key].img
                  ));
                }
              }
            }
          }
          this.habitaciones = habitaciones;
        }
      );
    return [...this.habitaciones];
  }

  getAllHabsActProvFechas(prov: string, checkIn: Date, checkOut: Date){
    const allRes = this.getAllRes();
    const allResConflict = [];
    this.httpClient.get<{ [key: string]: Habitacion }>
    ('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json')
    .subscribe(
        resData => {
          //obtengo todas las reservaciones
          const habs = [];
          //verifico conflictos entre las fechas en parametro y las fechas de las reservaciones existentes
          for (const res in allRes){
            if (checkIn <= allRes[res].checkOut && checkOut >= allRes[res].checkIn){
              //Conflicto entre reservacion y fechas parametro
            } else {
              allResConflict.push(allRes[res]);
            }
          }
          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              //condicional estado Activa
              if (resData[key].estado === 'Activa'){
                //condicional de provincia = prov
                if(resData[key].provincia === prov){
                  if (allRes.length === 0){
                    habs.push(new Habitacion(key, resData[key].nombre, resData[key].estado,
                      resData[key].categoria, resData[key].capacidad, resData[key].precio,
                      resData[key].provincia, resData[key].descripcion, resData[key].img
                    ));
                  } else {
                    //si hay reservaciones
                    const habConflicto = allResConflict.find(reservacion => key === reservacion.habitacion);
                    if (habConflicto === undefined){
                      habs.push(new Habitacion(key, resData[key].nombre, resData[key].estado,
                        resData[key].categoria, resData[key].capacidad, resData[key].precio,
                        resData[key].provincia, resData[key].descripcion, resData[key].img
                      ));
                    }
                  }
                }
              }
            }
          }
          this.habitaciones = habs;
        }
      );
    return [...this.habitaciones];
}

  getAllHabsActFechas(checkIn: Date, checkOut: Date){
    const allRes = this.getAllRes();
    const allResConflict = [];
    this.httpClient.get<{ [key: string]: Habitacion }>
    ('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json')
    .subscribe(
        resData => {
          const habs = [];
          for (const res in allRes){
            if (checkIn <= allRes[res].checkOut && checkOut >= allRes[res].checkIn){
              //Conflicto entre reservacion y fechas parametro
            } else {
              allResConflict.push(allRes[res]);
            }
          }

          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              //condicional estado Activa
              if (resData[key].estado === 'Activa'){
                if (allRes.length === 0){
                  //no hay reservaciones, agregue la habitacion a los resultados
                  habs.push(new Habitacion(key, resData[key].nombre, resData[key].estado,
                    resData[key].categoria, resData[key].capacidad, resData[key].precio,
                    resData[key].provincia, resData[key].descripcion, resData[key].img
                  ));
                } else {
                  //si hay reservaciones
                  const habConflicto = allResConflict.find(reservacion => key === reservacion.habitacion);
                  if (habConflicto === undefined){
                    habs.push(new Habitacion(key, resData[key].nombre, resData[key].estado,
                      resData[key].categoria, resData[key].capacidad, resData[key].precio,
                      resData[key].provincia, resData[key].descripcion, resData[key].img
                    ));
                  }
                }
              }
            }
          }
          this.habitaciones = habs;
        }
      );
    return [...this.habitaciones];
  }

  getHabitacion(habitacionID: string){
    return {...this.habitaciones.find(
      habitacion => habitacionID === habitacion.id
    )};
  }

  addHabitacion(id: string, nombre: string, estado: string, categoria: string,
    capacidad: number, precio: number, provincia: string, descripcion: string, img: string){
    const newHabitacion = new Habitacion(id, nombre, estado, categoria, capacidad, precio,
      provincia, descripcion, img);
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
      (resData) => { },
    );
  }

  //----*----*----Fin Metodos de Habitacion----*----*----//

  //----*----*----Metodos de Reservacion----*----*----//

  getAllRes(){
    this.httpClient.get<{ [key: string]: Reservacion }>('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Reservacion.json')
    .subscribe(
        resData => {
          const reservaciones = [];
          for( const key in resData){
            if(resData.hasOwnProperty(key)){
              reservaciones.push(new Reservacion(key, resData[key].usuario, resData[key].habitacion,
                resData[key].checkIn, resData[key].checkOut, resData[key].precioTotal
              ));
            }
          }
          this.reservaciones = reservaciones;
        }
      );
    return [...this.reservaciones];
  }

  getAllResUsuario(usr: string){
    this.httpClient.get<{ [key: string]: Reservacion }>
    ('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Reservacion.json')
    .subscribe(
        resData => {
          const reservaciones = [];
          for( const key in resData){
            if(resData.hasOwnProperty(key)){
              // condicional de usuario = prov
              if(resData[key].usuario === usr){
                reservaciones.push(new Reservacion(key, resData[key].usuario, resData[key].habitacion,
                  resData[key].checkIn, resData[key].checkOut, resData[key].precioTotal
                ));
              }
            }
          }
          this.reservaciones = reservaciones;
        }
      );
    return [...this.reservaciones];
  }

  getReservacion(reservacionId: string){
    return {...this.reservaciones.find(
      reservacion => reservacionId === reservacion.id
    )};
  }

  addReservacion(id: string, usuario: string, habitacion: string, checkIn: Date,
    checkOut: Date, precioTotal: number){
    const newReservacion = new Reservacion(id, usuario, habitacion, checkIn, checkOut, precioTotal);
    this.httpClient.post<{name: string}>('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Reservacion.json',
    {
      ...newReservacion,
      id: null
    })
    .subscribe(
      (resData) => {
        newReservacion.id = resData.name;
      },
    );
    this.reservacion[0] = newReservacion;
    this.reservaciones.push(newReservacion);
  }

  //----*----*----Fin Metodos de Reservacion----*----*----//

}
