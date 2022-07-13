import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone} from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/register_form.interface';
import { LoginForm } from '../interfaces/login_form.interface';
import { map, Observable, of } from 'rxjs';
// import { resolve } from 'dns';

const base_url = environment.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
    this.googleInit();
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
    google.accounts.id.revoke('jmgc@', () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.data.token )
      }),
      map( resp => {
        return true;
      }),
      catchError( error => of(false))
    );
  }
  // of: permite crear un obserbable que regresa un valor

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
                        localStorage.setItem('token', resp.data.token )
                      })
                    );
  }

}
