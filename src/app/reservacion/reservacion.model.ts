
import { Usuario } from '../usuario/usuario.model';
import { Habitacion } from '../habitaciones/habitaciones.model';


export interface Reservacion{
  id: string;
  usuario: Usuario;
  habitacion: Habitacion;
  checkIn: Date;
  checkOut: Date;
  precioTotal: number;
}
