import { Usuario } from './usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private usuarios: Usuario[] = [];
  constructor(private httpClient: HttpClient)
  {
    this.usuarios = this.getAll();
  }
  getAll(){
    this.httpClient.get<{ [key: string]: Usuario }>('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Usuario.json')
    .subscribe(
        resData => {
          const usuarios = [];
          for( const key in resData){
            if(resData.hasOwnProperty(key)){
              usuarios.push(new Usuario(
                key,
                resData[key].nombre,
                resData[key].primerApellido,
                resData[key].segundoApellido,
                resData[key].telefono,
                resData[key].correo,
                resData[key].password,
                resData[key].tipo,
              ));
            }
          }
          this.usuarios = usuarios;
          console.log(usuarios);
        }
      );
    return [...this.usuarios];
  }

  getUsuario(usuarioId: string){
    return {...this.usuarios.find(
      usuario => usuarioId === usuario.id
    )};
  }

  addUsuario(id: string,nombre: string, primerApellido: string,segundoApellido: string,
    telefono: string,correo: string,password: string,tipo: string){
    const newUsuario = new Usuario(
      id,
      nombre,
      primerApellido,
      segundoApellido,
      telefono,
      correo,
      password,
      tipo);
    this.httpClient.post<{name: string}>('https://oblivion-c1d3d-default-rtdb.firebaseio.com/Usuario.json',
    {
      ...newUsuario,
      id: null
    })
    .subscribe(
      (resData) => {
        newUsuario.id = resData.name;
      },
    );
    this.usuarios.push(newUsuario);
  }

  editUsuario(id: string,nombre: string, primerApellido: string,segundoApellido: string,
    telefono: string,correo: string,password: string,tipo: string){
    const newUsuario = new Usuario(
      id,
      nombre,
      primerApellido,
      segundoApellido,
      telefono,
      correo,
      password,
      tipo);
    this.httpClient.put(
      `https://oblivion-c1d3d-default-rtdb.firebaseio.com/Usuario/${id}.json`,
    {
      ...newUsuario,
      id: null
    })
    .subscribe(
      (resData) => {
        console.log(resData);
      },
    );
  }

  deleteUsuario(id: string){
    this.httpClient.delete(
      `https://oblivion-c1d3d-default-rtdb.firebaseio.com/Usuario/${id}.json`)
    .subscribe(
      (resData) => {
        console.log(resData);
      },
    );
  }
}
