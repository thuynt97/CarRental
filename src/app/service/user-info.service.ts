import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserInfo } from "../model/UserInfo";

@Injectable({
  providedIn: "root"
})
export class UserInfoService {
  imgurApiUrl = "https://api.imgur.com/3/image";
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: "Client-ID 8c2d5d3568ae28a",
      "Content-Type": "multipart/form-data"
    })
  };
  http = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("AuthToken")
    })
  };
  constructor(private httpClient: HttpClient) {}
  // Upload image
  uploadImage(fileToUpload: File): Observable<any> {
    return this.httpClient.post(
      this.imgurApiUrl,
      fileToUpload,
      this.httpOptions
    );
  }
  uploadUser(userInfo: any): Observable<any> {
    return this.httpClient.put(
      "https://car-rental-2020.herokuapp.com/users/profile",
      userInfo,
      this.http
    );
  }
  uploadPass(pass: any): Observable<any> {
    return this.httpClient.put(
      "https://car-rental-2020.herokuapp.com/users/password",
      pass,
      this.http
    );
  }
}
