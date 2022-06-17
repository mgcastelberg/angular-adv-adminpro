import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Principal!!!',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/' },
        { title: 'Progressbar', url: 'progress' },
        { title: 'Gráficas', url: 'grafica1' },
        { title: 'Promesa', url: 'promesa' },
        { title: 'Rxjs', url: 'rxjs' },
      ],
    }
  ];

  constructor() { }
}
