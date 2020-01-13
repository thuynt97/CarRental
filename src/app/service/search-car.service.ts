import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { FormSearch } from "../model/FormSearch";
import { Vehicle } from '../model/Vehicle';

@Injectable({
  providedIn: "root"
})
export class SearchCarService {
  // const httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  constructor(private http: HttpClient) {}
  getListCar(info: FormSearch): Observable<Vehicle[]> {
    return this.http
      .post<any>("https://car-rental-202001.herokuapp.com/car", info)
      .pipe(retry(1), catchError(this.handleError));
  }
  getListBike(info: FormSearch): Observable<Vehicle[]> {
    return this.http
      .post<any>("https://car-rental-202001.herokuapp.com/bike", info)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCatalogCar() {
    return this.http.get<any>(
      "https://car-rental-202001.herokuapp.com/catalog-car"
    );
  }
  getCatalogBike() {
    return this.http.get<any>(
      "https://car-rental-202001.herokuapp.com/catalog-bike"
    );
  }
  getLocation() {
    return this.http.get<any>(
      "https://car-rental-202001.herokuapp.com/locations"
    );
  }
  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
