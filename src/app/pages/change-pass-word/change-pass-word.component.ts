import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { UserInfoService } from "src/app/service/user-info.service";
import { TokenStorage } from "src/app/common/token.storage";
import { Router } from '@angular/router';

@Component({
  selector: "app-change-pass-word",
  templateUrl: "./change-pass-word.component.html",
  styleUrls: ["./change-pass-word.component.css"]
})
export class ChangePassWordComponent implements OnInit {
  formPass = this.fb.group({ oldPassword: [""], newPassword: [""] });
  constructor(
    private fb: FormBuilder,
    public userInfoService: UserInfoService,
    private tokenStorage: TokenStorage,
    private router: Router
  ) {}

  ngOnInit() {}
  updatePass() {
    this.userInfoService.uploadPass(this.formPass.value).subscribe(() => {
      this.tokenStorage.signOut();
      this.router.navigateByUrl("/");
      window.location.reload();
    });
  }
}
