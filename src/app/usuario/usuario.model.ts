export interface TipoUsuario{
  id: string;
  nombreTipo: string;
}

export interface Usuario{
  id: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  correo: string;
  password: string;
  tipo: TipoUsuario;
}
