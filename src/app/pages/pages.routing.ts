import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { ChildRoutesModule } from './child-routes.module';



const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./child-routes.module').then((m => m.ChildRoutesModule))
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
