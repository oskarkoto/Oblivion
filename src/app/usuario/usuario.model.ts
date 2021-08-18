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

export class Usuario{
  constructor(public id: string, public nombre: string, public primerApellido: string, public segundoApellido: string,
    public telefono: string, public correo: string, public password: string, public tipo: TipoUsuario){}
}
