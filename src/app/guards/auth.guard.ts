import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {


  constructor( private userService: UserService, private router: Router){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
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
