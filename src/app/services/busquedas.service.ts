import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios( resultados: any[]): User[]{
    return resultados.map(
      user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid )
    );
  }

  buscar(
    tipo: 'usuarios'|'medicos'|'hospitales',
    termino: string
  ) {
    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp:any) => {

          switch (tipo) {
            case 'usuarios':
                return this.transformarUsuarios( resp.data );
              break;

            default:
                return [];
              break;
          }

        })
      );
  }

  // buscar(
  //   tipo: 'usuarios'|'medicos'|'hospitales',
  //   termino: string
  // ) {
  //   const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
  //   return this.http.get( url, this.headers )
  //     .pipe(
  //       map( (resp:any) => resp.data )
  //     );
  // }

}
