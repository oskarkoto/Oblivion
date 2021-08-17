export interface EstadoHabitacion{
  id: string;
  nombre: string;
}

export interface CategoriaHabitacion{
  id: string;
  nombre: string;
  precioNoche: number;
  capacidad: number;
}

export interface Habitacion{
  id: string;
  nombre: string;
  estado: EstadoHabitacion;
  categoria: CategoriaHabitacion;
  descripcion: string;
  img1: string;
  img2: string;
  img3: string;
}

export class Habitacion{
  constructor(public id: string, public nombre: string, public estado: EstadoHabitacion, public categoria: CategoriaHabitacion,
    public descripcion: string, public img1: string, public img2: string, public img3: string){}
}
