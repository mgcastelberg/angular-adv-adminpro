import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  // public imgUrl = '';
  public usuario: User;

  constructor( private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    // this.imgUrl = userService.usuario.imagenUrl;
    this.usuario = this.userService.usuario;
    let temp_name = this.usuario.name.split(" ");
    this.usuario.name = `${temp_name[0]} ${temp_name[1]}`;
  }

  logout(){
    this.userService.logout();
  }

  buscar( termino: string ){

    if(termino.length === 0){
      return;
    }

    console.log(termino);
    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

}
