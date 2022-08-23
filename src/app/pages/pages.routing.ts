import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta'} },
      { path: 'promesa', component: PromesaComponent, data: { titulo: 'Promesas'} },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgresBar'} },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas'} },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJS'} },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario'} },

    ]
  }
];

// const routes: Routes = [
//   {
//     path: 'dashboard', component: PagesComponent,
//     children: [
//       { path: '', component: DashboardComponent },
//       { path: 'progress', component: ProgressComponent },
//       { path: 'grafica1', component: Grafica1Component },
//       { path: 'account-settings', component: AccountSettingsComponent },
//       { path: 'promesa', component: PromesaComponent },
//       { path: 'rxjs', component: RxjsComponent },

//     ]
//   }
// ];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}
