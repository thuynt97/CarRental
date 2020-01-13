import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { TokenStorage } from './common/token.storage';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private token: TokenStorage, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authToken = req;
    if (this.token.getToken() != null){
      authToken = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY,  'Bearer ' + this.token.getToken())});
    }
    return next.handle(authToken);
  }
}