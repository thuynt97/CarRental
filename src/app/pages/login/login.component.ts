import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth.service";
import { TokenStorage } from "src/app/common/token.storage";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'src/app/model/User';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/model/UserInfo';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  formLogin = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  userCurrent: UserInfo;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorage,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data 
  ) {}

  ngOnInit() {}
  login(): void {
    const formLoginValue: User = this.formLogin.value

    this.authService
      .checkLogin({ username: formLoginValue.username, password: formLoginValue.password })
      .subscribe(data => {
        if (data) {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(JSON.stringify(data.userDTO));
          console.log(data);
          console.log(data.userDTO);
          
          this.dialogRef.close();
        } else {
          
        }
      });

  }
  cancel() {
    this.dialogRef.close();
  }
}
