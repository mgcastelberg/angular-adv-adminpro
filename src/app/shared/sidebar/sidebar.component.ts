import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  // public imgUrl = '';
  public usuario: User;

  constructor(private sidebarService: SidebarService, private userService: UserService) {
    this.menuItems = sidebarService.menu;
    // console.log(this.menuItems);
  }

  ngOnInit(): void {
    // this.imgUrl = this.userService.usuario.imagenUrl;
    this.usuario = this.userService.usuario;
  }

}
