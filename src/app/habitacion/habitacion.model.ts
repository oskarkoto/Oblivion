export interface Habitacion{
  id: string;
  nombre: string;
  estado: string;
  categoria: string;
  capacidad: number;
  precio: number;
  provincia: string;
  descripcion: string;
  img: string;
}

export class Habitacion{
  constructor(public id: string, public nombre: string, public estado: string,
    public categoria: string, public capacidad: number, public precio: number,
    public provincia: string, public descripcion: string, public img: string){}
}
