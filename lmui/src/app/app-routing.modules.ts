import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LmComponent } from './lm.component'
import { LoginComponent } from './login.component'

const routes: Routes = [
  { path: 'LMUI',   component:LmComponent},
  //{ path: 'Login',  component:LoginComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

