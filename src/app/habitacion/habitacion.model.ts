export interface EstadoHabitacion{
  id: string;
  nombre: string;
}

export interface CategoriaHabitacion{
  id: string;
  nombre: string;
  precioNoche: number;
  capacidad: number;
  img1: string;
  img3: string;
  img2: string;
}

export interface Habitacion{
  id: string;
  ubicacion: string;
  estado: EstadoHabitacion;
  categoria: CategoriaHabitacion;
  descripcion: string;
}

export class Habitacion{
  constructor(public id: string, public ubicacion: string, public estado: EstadoHabitacion, public categoria: CategoriaHabitacion,
    public descripcion: string){}
}
