import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SidebarService } from '../services/sidebar.service';
declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settingService: SettingsService,
              private sidebarService: SidebarService) { }

  ngOnInit( ): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }

}
