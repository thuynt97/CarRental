import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const USER_CURRENT = 'UserCurrent';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_CURRENT);
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: string) {
    window.localStorage.removeItem(USER_CURRENT);
    window.localStorage.setItem(USER_CURRENT,  user);
  }

  public getUser(): string {
    return localStorage.getItem(USER_CURRENT);
  }
}