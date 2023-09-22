import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];
  }

  // menu: any[] = [
  //   {
  //     title: 'Principal!!!',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Dashboard', url: '/' },
  //       { title: 'Progressbar', url: 'progress' },
  //       { title: 'Gráficas', url: 'grafica1' },
  //       { title: 'Promesa', url: 'promesa' },
  //       { title: 'Rxjs', url: 'rxjs' },
  //     ],
  //   },
  //   {
  //     title: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Usuarios', url: 'usuarios' },
  //       { title: 'Hospitales', url: 'hospitales' },
  //       { title: 'Medicos', url: 'medicos' },
  //     ],
  //   }
  // ];

  // constructor() { }
}
