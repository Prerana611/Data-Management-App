import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private loggedIn: boolean = false;
  private currentUser!: { email: string; password: string; role: string; };
  constructor() { }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }
  setCurrentUser(user: { email: string, password: string, role: string }) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
