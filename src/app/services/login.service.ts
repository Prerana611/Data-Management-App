import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'

}
)
export class LoginService {
  private loggedIn = <boolean>(false); 
   public Username: any;
  constructor(private http:HttpClient,private routes : Router,private authService: AuthserviceService) {
   }
  
 
  getemployee(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/employee')
  }
  // getUsers(): Observable<Emp[]> {
  //   return this.http.get<any>('http://localhost:3000/employee')
  //     .pipe(
  //       map(response => response.users)
  //     );
  // }
  // getemployeeforauth(empid: string, password: string): Observable<boolean> {
  //   return this.http.get<{ email: string, password: string ,role:string}[]>('http://localhost:3000/employee').pipe(
  //     map(users => {
  //       const user = users.find(u => u.email === empid && u.password === password);
  //       if (user) {
  //         this.loggedIn = true;
  //         this.routes.navigate(['/all-emp']);

  //         this.currentUser = user;
  //       } else {
  //         this.loggedIn = false;
  //         this.currentUser = null;
  //       }
  //       return this.loggedIn;
  //     })
  //   );
    
  // }

  getemployeeforauth(empid: string, password: string): Observable<boolean> {
    return this.http.get<{ email: string, password: string ,role:string}[]>('http://localhost:3000/employee').pipe(
      map(users => {
        const user = users.find(u => u.email === empid && u.password === password);
        if (user) {
          this.Username = user.role;
          this.authService.setLoggedIn(true);
          this.routes.navigate(['/all-emp']);
        
          console.log('Current user:', this.Username);
          
        } else {
          this.authService.setLoggedIn(false);
         
        }
        return this.authService.isLoggedIn();
      })
    );  
  }
  getuserdetail(){
    this.Username
  }

  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    localStorage.clear();
    this.authService.setLoggedIn(false);
  }

  // checkusernameandpassword(uname: string, pwd : string)
  //   {
  // if(uname == "admin" && pwd =="admin123"){
  // localStorage.setItem('username',"admin");
  // return true;
  // }
  // else{
  //   return false;
  // }
  //   }
}

