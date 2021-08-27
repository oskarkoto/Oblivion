import { Injectable } from '@angular/core';
import { Usuario } from '../usuario/usuario.model';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public usuario: Usuario [] = [];
  public usuarios: Usuario[] = [];
  public allUsuarios: Usuario [] = [];
  //private usuarioService: UsuarioService;
  constructor(private httpClient: HttpClient, private usuarioService: UsuarioService){
    this.allUsuarios = this.getAll();
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
                resData[key].tipo
              ));
            }
          }
          this.allUsuarios = usuarios ;
          this.usuarioService.usuarios = this.allUsuarios;
        }
      );
      return [...this.allUsuarios];
  }

  editarUsuario(id: string,nombre: string, primerApellido: string,segundoApellido: string,
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
    this.usuario.pop();
    this.usuario.push(newUsuario);
  }

  loginUser(correo: string,password: string){
    for(let i = 0; i<= 1; i++){
      this.getAll();
    }
    this.usuario.pop();
    this.usuario.push(this.allUsuarios.find(
      // eslint-disable-next-line arrow-body-style
      (user) => {
        return user.correo === correo && user.password === password;
      }
    )
  );
  this.usuarioService.usuario[0] = this.usuario[0];
  return [...this.usuario];
  }

  logout(){
    this.usuarioService.usuario[0] = this.usuario.pop();
  };
}
