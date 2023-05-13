import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmpComponent } from './components/add-emp/add-emp.component';
import { LoginComponent } from './components/login/login.component';
import { AllEmpComponent } from './components/all-emp/all-emp.component';
import { AuthorizedGuard } from './authorized.guard';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthguardGuard } from './authguard.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path :'add-emp',component:AddEmpComponent},
  {path :'login',component:LoginComponent , canActivate:[LoginGuard]},
  { path:'edit/:id',component:EditComponent, canActivate:[AuthorizedGuard]},
  // {path :'all-emp',canActivate:[AuthguardGuard] ,component:AllEmpComponent},
  {
    path: 'all-emp',
    loadChildren: () => import('./components/all-emp/all-emp.module').then(m => m.AllEmpModule)
    , canActivate:[AuthguardGuard]
  }
  ,
  {
    path: 'emp/:id',
    loadChildren: () => import('./components/employee-detail/employee-detail.module').then(m => m.EmployeeDetailModule)
    , canActivate:[AuthorizedGuard]
  },
  //  {path:'emp/:id',component:EmployeeDetailComponent, canActivate:[AuthorizedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
