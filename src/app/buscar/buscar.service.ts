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
    console.log('obtengo todas las reservaciones');
    const allRes = this.getAllRes();
    this.httpClient.get<{ [key: string]: Habitacion }>
    ('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json')
    .subscribe(
        resData => {
          //obtengo todas las reservaciones
          const habs = [];
          console.log(allRes);
          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              //condicional estado Activa
              if (resData[key].estado === 'Activa'){
                //condicional de provincia = prov
                if(resData[key].provincia === prov){
                  if (allRes.length === 0){
                    //no hay reservaciones, agregue la habitacion a los resultados
                    console.log('getAllHabsActFechas: No hay reservaciones');
                    habs.push(new Habitacion(key, resData[key].nombre, resData[key].estado,
                      resData[key].categoria, resData[key].capacidad, resData[key].precio,
                      resData[key].provincia, resData[key].descripcion, resData[key].img
                    ));
                  } else {
                    //si hay reservaciones
                    for (const res in allRes){
                      if (allRes[res].habitacion === resData[key].id){
                        //la reservacion es a la habitacion que estamos recorriendo en el primer for
                        // si se cumple:
                        //checkIn >= allRes[res].checkOut NOR checkOut <= allRes[res].checkIn
                        //EXISTE UN OVERLAP
                        //Es decir,
                        //(checkIn <= allRes[res].checkOut) && (checkOut >= allRes[res].checkIn)
                        console.log('la reservacion tiene asignada la misma habitacion que estoy recorriendo');
                        if( (checkIn >= allRes[res].checkIn && checkIn <= allRes[res].checkOut)
                          || (checkOut >= allRes[res].checkIn && checkOut <= allRes[res].checkOut)
                          || (allRes[res].checkIn >= checkIn && allRes[res].checkOut <= checkOut)
                        ){
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
            }
          }
        this.habitaciones = habs;
        console.log(habs);
      }
    );
  return [...this.habitaciones];
}

  getAllHabsActFechas(checkIn: Date, checkOut: Date){
    console.log('entro a getAllHabsActFechas con valores ' + checkIn + ' ' + checkOut);
    console.log('obtengo todas las reservaciones');
    const allRes = this.getAllRes();
    this.httpClient.get<{ [key: string]: Habitacion }>
    ('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Habitacion.json')
    .subscribe(
        resData => {
          //obtengo todas las reservaciones
          const habs = [];
          console.log(allRes);
          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              //condicional estado Activa
              if (resData[key].estado === 'Activa'){
                if (allRes.length === 0){
                  //no hay reservaciones, agregue la habitacion a los resultados
                  console.log('getAllHabsActFechas: No hay reservaciones');
                  habs.push(new Habitacion(key, resData[key].nombre, resData[key].estado,
                    resData[key].categoria, resData[key].capacidad, resData[key].precio,
                    resData[key].provincia, resData[key].descripcion, resData[key].img
                  ));
                } else {
                  //si hay reservaciones
                  for (const res in allRes){
                    if (allRes[res].habitacion === resData[key].id){
                      //la reservacion es a la habitacion que estamos recorriendo en el primer for
                      // si se cumple:
                      //checkIn >= allRes[res].checkOut NOR checkOut <= allRes[res].checkIn
                      //EXISTE UN OVERLAP
                      //Es decir,
                      //(checkIn <= allRes[res].checkOut) && (checkOut >= allRes[res].checkIn)
                      console.log('la reservacion tiene asignada la misma habitacion que estoy recorriendo');
                      if( (checkIn >= allRes[res].checkIn && checkIn <= allRes[res].checkOut)
                        || (checkOut >= allRes[res].checkIn && checkOut <= allRes[res].checkOut)
                        || (allRes[res].checkIn >= checkIn && allRes[res].checkOut <= checkOut)
                      ){
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
          }


          /*const habitaciones = [];
          //obtengo reservaciones que se superponen con checkIn y checkOut
          const resEntreFechas = this.getAllResBetweenDates(checkIn, checkOut);
          console.log('Reservaciones devueltas por getAllResBetweenDates');
          console.log(resEntreFechas);
          for( const key in resData){
            if(resData.hasOwnProperty(key)){
              //condicional estado Activa
              if (resData[key].estado === 'Activa'){
                //valido si el arreglo de reservaciones regresó algun resultado
                if (resEntreFechas.length === 0){
                  habitaciones.push(new Habitacion(key, resData[key].nombre, resData[key].estado,
                    resData[key].categoria, resData[key].capacidad, resData[key].precio,
                    resData[key].provincia, resData[key].descripcion, resData[key].img
                  ));
                } else {
                  //valido si el arreglo de reservas contiene la habitacion que estoy revisando
                  if (!resEntreFechas.some(hab => hab.habitacion === resData[key].id)){
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
          console.log(habitaciones);*/
          this.habitaciones = habs;
          console.log('Resultados esperados de Busq con fechas');
          console.log(this.habitaciones);
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
          console.log('Obtengo todas las reservaciones existentes');
          console.log(resData);
          for( const key in resData){
            if(resData.hasOwnProperty(key)){
              const resCheckIn = new Date(resData[key].checkIn);
              const resCheckOut = new Date(resData[key].checkOut);
              if ((checkIn.getTime() <= resCheckOut.getTime()) && (resCheckIn.getTime() <= checkOut.getTime())){
                console.log('superpuesta');
                reservaciones.push(new Reservacion(key, resData[key].usuario, resData[key].habitacion,
                  resData[key].checkIn, resData[key].checkOut, resData[key].precioTotal
                ));
              }
            }
          }
          console.log('getAllResBetweenDates Obtengo todas las reservaciones que se superponen con checkIn y checkOut');
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
              // condicional de usuario = prov
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
