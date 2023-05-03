import { NgModule } from '@angular/core';
import { AuthguardGuard } from './authguard.guard';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { AddEmpComponent } from './components/add-emp/add-emp.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AllEmpComponent } from './components/all-emp/all-emp.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import {MatSortModule} from '@angular/material/sort';
import { EditComponent } from './components/edit/edit.component';
import { LoginService } from './services/login.service';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'add-emp', component: AddEmpComponent, canActivate: [AuthguardGuard] }
];
@NgModule({
  declarations: [
    AppComponent,
    AddEmpComponent,
    LoginComponent,
    AllEmpComponent,
    EmployeeDetailComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
   HttpClientModule,
   MatSortModule
   ,
   RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthguardGuard , LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
