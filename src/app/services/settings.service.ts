import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private LinkTheme = document.querySelector('#theme');
  public links!: NodeListOf<Element>;

  constructor() {
    console.log('Settings Service init');
    const url = localStorage.getItem('theme') || `./assets/css/colors/red.css`;
    this.LinkTheme?.setAttribute('href', url);
  }

  changeTheme( theme: string ){
    const url = `./assets/css/colors/${ theme }.css`;
    //esta linea es propia de vanillajs
    this.LinkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const links = document.querySelectorAll('.selector');
    links.forEach( element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.LinkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }

}
