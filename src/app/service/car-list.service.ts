import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { VehicleDetail } from "../model/VehicleDetail";

@Injectable({
  providedIn: "root"
})
export class CarListService {
  constructor(private http: HttpClient) {}
  getListCarDetailById(id: number): Observable<VehicleDetail> {
    const url = `https://car-rental-202001.herokuapp.com/car?id=` + id;

    return this.http.get<any>(url);
  }

  getListBikeDetailById(id: number): Observable<VehicleDetail> {
    const url = `https://car-rental-202001.herokuapp.com/bike?id=` + id;

    return this.http.get<any>(url);
  }
}
