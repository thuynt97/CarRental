import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarListService {

  constructor(private http: HttpClient) { }
  getListCarAdvanced(param: any): Observable<any> {
    return this.http
      .post<any>("https://fake-rest-api-nodejs.herokuapp.com/products", param);
  }
}
