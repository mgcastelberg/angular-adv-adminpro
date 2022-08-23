import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { FormGroup, FormBuilder } from '@angular/forms';
declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settingService: SettingsService) { }

  ngOnInit( ): void {
    customInitFunctions();
  }

}
