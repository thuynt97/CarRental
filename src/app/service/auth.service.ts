import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  checkLogin(user: User): Observable<any> {
    
    return this.http
      .post<any>("https://car-rental-202001.herokuapp.com/users/login", user);
  }
}
