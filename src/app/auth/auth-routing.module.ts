import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NbAuthComponent} from '@nebular/auth';
import {NgxLoginComponent} from './login/login.component';
import {NgxLogoutComponent} from './logout/logout.component';
import {NgxRegisterComponent} from './register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: NgxLoginComponent, // <---
      },
      {
        path: 'logout',
        component: NgxLogoutComponent, // <---
      },
      {
        path: 'register',
        component: NgxRegisterComponent, // <---
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
