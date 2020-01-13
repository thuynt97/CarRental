import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleDetail } from '../model/VehicleDetail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  constructor(private http: HttpClient) { }
  bookCar(param: any): Observable<any> {
    return this.http
      .post<any>("https://car-rental-202001.herokuapp.com/bike", param)
  }
}
