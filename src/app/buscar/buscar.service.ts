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
    //this.habitaciones = this.getAllHabs();
    //this.reservaciones = this.getAllRes();
  }

  // format date in typescript
  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  //----*----*----Metodos de Habitacion----*----*----//

  getAllHabsAct(){
    console.log('entro a getAllHabsAct');
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
          console.log(habitaciones);
        }
      );
    return [...this.habitaciones];
  }

  getAllHabsActProv(prov: string){
    console.log('entro a getAllHabsActProv con valor' + prov);
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
          console.log(habitaciones);
        }
      );
    return [...this.habitaciones];
  }

  getAllHabsActProvFechas(prov: string, checkIn: Date, checkOut: Date){
    console.log('entro a getAllHabsActProvFechas con valores ' + prov + ' '
    + checkIn + ' ' + checkOut);
    this.httpClient.get<{ [key: string]: Habitacion }>
    ('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json')
    .subscribe(
      resData => {
        const habitaciones = [];
        //obtengo reservaciones existentes entre checkIn y checkOut
        const reservaciones = this.getAllResBetweenDates(checkIn, checkOut);
        console.log('Habitaciones devueltas por getAllResBetweenDates');
        console.log(reservaciones);
        for( const key in resData){
          if(resData.hasOwnProperty(key)){
            //condicional estado Activa
            if (resData[key].estado === 'Activa'){
              //valido si el arreglo de reservaciones regresó algun resultado
              if (reservaciones.length === 0){
                //condicional de provincia = prov
                if(resData[key].provincia === prov){
                  habitaciones.push(new Habitacion(key, resData[key].nombre, resData[key].estado,
                    resData[key].categoria, resData[key].capacidad, resData[key].precio,
                    resData[key].provincia, resData[key].descripcion, resData[key].img
                  ));
                }
              } else {
                //valido si el arreglo de reservas contiene la habitacion que estoy revisando
                if (!reservaciones.some(hab => hab.habitacion === resData[key].id)){
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
          }
        }
        this.habitaciones = habitaciones;
        console.log(habitaciones);
      }
    );
  return [...this.habitaciones];
}

  getAllHabsActFechas(checkIn: Date, checkOut: Date){
    console.log('entro a getAllHabsActFechas con valores ' + checkIn + ' ' + checkOut);
    this.httpClient.get<{ [key: string]: Habitacion }>
    ('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json')
    .subscribe(
        resData => {
          const habitaciones = [];
          //obtengo reservaciones existentes entre checkIn y checkOut
          const reservaciones = this.getAllResBetweenDates(checkIn, checkOut);
          console.log('Habitaciones devueltas por getAllResBetweenDates');
          console.log(reservaciones);
          for( const key in resData){
            if(resData.hasOwnProperty(key)){
              //condicional estado Activa
              if (resData[key].estado === 'Activa'){
                //valido si el arreglo de reservaciones regresó algun resultado
                if (reservaciones.length === 0){
                  habitaciones.push(new Habitacion(key, resData[key].nombre, resData[key].estado,
                    resData[key].categoria, resData[key].capacidad, resData[key].precio,
                    resData[key].provincia, resData[key].descripcion, resData[key].img
                  ));
                } else {
                  //valido si el arreglo de reservas contiene la habitacion que estoy revisando
                  if (!reservaciones.some(hab => hab.habitacion === resData[key].id)){
                    habitaciones.push(new Habitacion(key, resData[key].nombre, resData[key].estado,
                      resData[key].categoria, resData[key].capacidad, resData[key].precio,
                      resData[key].provincia, resData[key].descripcion, resData[key].img
                    ));
                  }
                }
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
    console.log('entro a getHabitacion con habitacion id: ');
    console.log(habitacionId);
    return {...this.habitaciones.find(
      habitacion => habitacionId === habitacion.id
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
    console.log('entro a editHabitacion');
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
      },
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
          console.log(reservaciones);
        }
      );
    return [...this.reservaciones];
  }

  getAllResBetweenDates(checkIn: Date, checkOut: Date){
    this.httpClient.get<{ [key: string]: Reservacion }>('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Reservacion.json')
    .subscribe(
        resData => {
          const reservaciones = [];
          for( const key in resData){
            if(resData.hasOwnProperty(key)){
              if (!(resData[key].checkIn <= checkOut) && (resData[key].checkOut <= checkIn)){
                reservaciones.push(new Reservacion(key, resData[key].usuario, resData[key].habitacion,
                  resData[key].checkIn, resData[key].checkOut, resData[key].precioTotal
                ));
              }
            }
          }
          console.log('Resultado de getAllResBetweenDates');
          console.log(reservaciones);
          return reservaciones;
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
              //TODO: condicional de usuario = prov
              if(resData[key].usuario === usr){
                reservaciones.push(new Reservacion(key, resData[key].usuario, resData[key].habitacion,
                  resData[key].checkIn, resData[key].checkOut, resData[key].precioTotal
                ));
              }
            }
          }
          this.reservaciones = reservaciones;
          console.log(reservaciones);
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
    console.log('Entro a addReservacion');
    console.log(id);
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
    console.log(this.reservaciones);
  }

  //----*----*----Fin Metodos de Reservacion----*----*----//

}
