import { Component } from '@angular/core';
import { User } from './model/User';
import { Router } from '@angular/router';
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // currentUser: User;

  //   constructor(
  //       private router: Router,
  //       private authenticationService: AuthService
  //   ) {
  //       this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  //   }

  //   logout() {
  //       this.authenticationService.logout();
  //       this.router.navigateByUrl("/");
  //   }
}
