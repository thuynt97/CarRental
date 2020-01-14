import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBook } from '../model/FormBook';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem("AuthToken")
      
    })
  };
  constructor(private http: HttpClient) { }

  bookCar(param: FormBook): Observable<any> {

    return this.http
      .post<any>("https://car-rental-2020.herokuapp.com/book", param, this.httpOptions)
  }
}
