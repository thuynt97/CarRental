import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormRegister } from '../model/FormRegister';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(param: FormRegister): Observable<any> {
    return this.http
      .post<any>("https://car-rental-2020.herokuapp.com/users/register", param)
  }
}
