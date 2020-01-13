import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(param: any): Observable<any> {
    return this.http
      .post<any>("https://car-rental-202001.herokuapp.com/bike", param)
  }
}
