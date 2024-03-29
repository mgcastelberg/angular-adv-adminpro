import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, AfterViewInit } from '@angular/core';
import { catchError, delay, tap } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';

import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/register_form.interface';
import { LoginForm } from '../interfaces/login_form.interface';
import { map, Observable, of } from 'rxjs';
import { User } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
// import { resolve } from 'dns';

const base_url = environment.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usuario: User;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
                this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' | undefined {
    return this.usuario.role;
  }

  get uid():string {
     return this.usuario.uid || '';
  }

  ngAfterViewInit(): void {
    // this.googleInit();
  }

  googleInit(){
    return new Promise<void>( resolve => {
      console.log('inicio de google');
      google.accounts.id.initialize({
        client_id: "967579472853-kuh9fq11q74776lcreved75gb0rh67g0.apps.googleusercontent.com",
        callback: (response:any) => this.handleCredentialResponse(response)
      });
      resolve();
    });
  }

  handleCredentialResponse( response: any ){
    console.log("Encoded JWT ID Token: " + response.credential);
    this.loginGoogle(response.credential)
        .subscribe( resp => {
          this.ngZone.run( () => {
          this.router.navigateByUrl('/');
          });
        })
  }

  logout(){



    // Todo borrar Menu

    google.accounts.id.revoke('mgcastelberg@gmail.com', () => {
    // google.accounts.id.revoke('jmgc@virket.com', () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    });
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
  }

  validarToken():Observable<boolean>{
    // const token = localStorage.getItem('token') || '';
    const token =  this.token;

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map( (resp:any) => {
        console.log('google map');
        const {name, email, role, google, img = '', uid } = resp.data.user;
        this.usuario = new User(name, email, '', img, google, role, uid);
        // this.usuario.imprimirUsuario();
        // this.usuario = new User('juan', 'qwe@hot.com');
        // this.usuario.imprimirUsuario();
        // localStorage.setItem('token', resp.data.token );
        // localStorage.setItem('menu', resp.data.menu );
        this.guardarLocalStorage(resp.data.token, resp.data.menu);

        return true;
      }),
      catchError( error => of(false))
    );
  }
  // of: permite crear un observable que regresa un valor

  crearUsuario(formData: RegisterForm ) {
    return this.http.post(`${ base_url }/users`, formData)
                    .pipe(
                      tap( (resp:any) => {
                        // localStorage.setItem('token', resp.data.token );
                        // localStorage.setItem('menu', resp.data.menu );
                        this.guardarLocalStorage(resp.data.token, resp.data.menu);
                      })
                    );
  }

  login(formData: LoginForm){
    return this.http.post(`${ base_url }/login`, formData)
                    .pipe(
                      tap( (resp:any) => {
                        // localStorage.setItem('token', resp.data.token );
                        // localStorage.setItem('menu', resp.data.menu );
                        this.guardarLocalStorage(resp.data.token, resp.data.menu);;
                      })
                    );
  }

  loginGoogle(token:string){
     return this.http.post(`${ base_url }/login/google`,{ token })
                    .pipe(
                      tap( (resp:any) => {
                        // console.log(resp);
                        // console.log('login google');
                        // localStorage.setItem('token', resp.data.token );
                        // localStorage.setItem('menu', resp.data.menu );
                        this.guardarLocalStorage(resp.data.token, resp.data.menu);
                      })
                    );
  }

  guardarLocalStorage( token: string, menu: any){
    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  actualizarPerfil( data: { email: string, name: string, role?: string }){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${ base_url }/users/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // cargarUsuarios( desde: number = 1){
  //   const url = `${ base_url}/users?page=${ desde }`;
  //   return this.http.get<CargarUsuario>( url, this.headers );
  // }

  cargarUsuarios( desde: number = 1){
    const url = `${ base_url}/users?page=${ desde }`;
    return this.http.get<CargarUsuario>( url, this.headers )
      .pipe(
        // delay(1000), // 1 seg - simular carga lenta
        map( resp => {
          console.log(resp);
          const usuarios = resp.data.users.map(
              user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid ))
          return {
            paginate: resp.data.paginate,
            users: usuarios
          }
        })
      );
  }

  eliminarUsuario( usuario: User){
    // console.log('eliminando');
    const url = `${ base_url}/users/${ usuario.uid }`;
    return this.http.delete<CargarUsuario>( url, this.headers );
  }

  actualizarRole( usuario: User){

    return this.http.put(`${ base_url }/users/${ usuario.uid }`, usuario, this.headers);

  }

}
