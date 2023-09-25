import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { PerfilComponent } from './perfil/perfil.component';
// Mantenimientos
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { DoctorComponent } from './mantenimiento/medicos/doctor.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta'} },
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas'} },
  { path: 'promesa', component: PromesaComponent, data: { titulo: 'Promesas'} },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgresBar'} },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas'} },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJS'} },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario'} },

  // Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales'} },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos'} },
  { path: 'doctor/:id', component: DoctorComponent, data: { titulo: 'Doctor'} },

  // Rutas de Admin
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios'} },
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(childRoutes)],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
