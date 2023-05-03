import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  
  constructor(private routes : Router, private userService: LoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if(localStorage.getItem('username')!= null){
      //   return true;
      //     }
      //     else
      //     {
      //       this.routes.navigate(['/login']);
      //       return false;
      //     }


      
      if (this.userService.isLoggedIn()) {
        return true;
      } else {
        return this.routes.parseUrl('/login');
      }
    }
   
    }
  
  
  