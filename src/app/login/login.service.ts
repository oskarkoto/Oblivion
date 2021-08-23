import { Injectable } from '@angular/core';
import { Usuario } from '../usuario/usuario.model';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usuario: Usuario [] = [];
  private allUsuarios: Usuario [] = [];
  private afAuth: AngularFireAuth;
  constructor(private httpClient: HttpClient){  }

  getAll(){
    console.log('getAllUsuario');
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
          this.usuario = usuarios;
          console.log(usuarios);
          this.allUsuarios = this.usuario ;
          console.log('allUsuarios');
          return this.allUsuarios;
        }
      );
  }

  registrarUsuario(id: string,nombre: string, primerApellido: string,segundoApellido: string,
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
    this.usuario.push(newUsuario);
  }

  loginUser(correo: string,password: string){
    return {...this.usuario.find(
      usuario => correo === usuario.correo && password === usuario.password
    )
  };
  }

  logout(usuarioId: string){
    this.usuario = [];
  };
}
