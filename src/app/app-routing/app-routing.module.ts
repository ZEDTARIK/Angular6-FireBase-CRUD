import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from '../employees/employees.component';
import { UsersComponent } from '../users/users.component';

const appRouting: Routes = [
  { path: 'employee', component: EmployeesComponent},
  { path: 'user', component: UsersComponent},
  { path: '**', component: PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(appRouting)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
