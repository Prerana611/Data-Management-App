import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEmpComponent } from './all-emp.component';

const routes: Routes = [{path:'',component:AllEmpComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllEmpRoutingModule { }
