import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor( private userService: UserService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      // this.userService.validarToken().subscribe( resp => {
      //   console.log(resp);
      // });
      // console.log('paso por el can activate del gard');
      // return false;

    return this.userService.validarToken()
      .pipe(
        tap(
          isAuth => {
            if( !isAuth ){
              this.router.navigateByUrl('/login');
            }
          })
      );

  }
}
