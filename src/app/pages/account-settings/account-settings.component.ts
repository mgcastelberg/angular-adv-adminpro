import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  // public LinkTheme = document.querySelector('#theme');

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    // this.links = document.querySelectorAll('.selector');
    this.settingsService.checkCurrentTheme();
  }

  changeTheme( theme: string ){
  //   console.log(theme);
  //   console.log(this.LinkTheme);
  //   const url = `./assets/css/colors/${ theme }.css`;
  //   console.log(url);
  //   //esta linea es propia de vanillajs
  //   this.LinkTheme?.setAttribute('href', url);
  //   localStorage.setItem('theme', url);
    this.settingsService.changeTheme( theme );
  // this.checkCurrentTheme();
  }

  // checkCurrentTheme(){

  //   // const links = document.querySelectorAll('.selector');
  //   // console.log(links);
  //   this.links.forEach( element => {
  //     element.classList.remove('working');
  //     const btnTheme = element.getAttribute('data-theme');
  //     const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
  //     const currentTheme = this.LinkTheme?.getAttribute('href');

  //     if (btnThemeUrl === currentTheme) {
  //       element.classList.add('working');
  //     }

  //   });
  // }

}
