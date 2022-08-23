import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, AfterViewInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';

import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/register_form.interface';
import { LoginForm } from '../interfaces/login_form.interface';
import { map, Observable, of } from 'rxjs';
import { User } from '../models/usuario.model';
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
    localStorage.removeItem('token');
    google.accounts.id.revoke('mgcastelberg@gmail.com', () => {
    // google.accounts.id.revoke('jmgc@virket.com', () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    });
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
        localStorage.setItem('token', resp.data.token )
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
                        localStorage.setItem('token', resp.data.token )
                      })
                    );
  }

  login(formData: LoginForm){
    return this.http.post(`${ base_url }/login`, formData)
                    .pipe(
                      tap( (resp:any) => {
                        localStorage.setItem('token', resp.data.token )
                      })
                    );
  }

  loginGoogle(token:string){
     return this.http.post(`${ base_url }/login/google`,{ token })
                    .pipe(
                      tap( (resp:any) => {
                        // console.log(resp);
                        console.log('login google');
                        localStorage.setItem('token', resp.data.token )
                      })
                    );
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

}
