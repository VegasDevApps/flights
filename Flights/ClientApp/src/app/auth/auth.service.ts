import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUser?: User; 
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  loginUser(user: User){
    console.log("Login in the user with email: ", user.email);
    this.currentUser = user;
    this.currentUserSource.next(user);
  }

}

interface User {
  email: string;
}
