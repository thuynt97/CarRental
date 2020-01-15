import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UserInfoService } from "src/app/service/user-info.service";
import { UserInfo } from "src/app/model/UserInfo";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  formUpdate = this.fb.group({
    username: [""],
    email: [""],
    address: [""],
    phone: [""]
  });

  constructor(
    private fb: FormBuilder,
    public userInfoService: UserInfoService,
    private router: Router
  ) {}
  fileToUpload: File = null;
  userInfo: UserInfo;
  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("UserCurrent"));
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  updateUser() {

    this.userInfoService.uploadImage(this.fileToUpload).subscribe(
      res => {
        console.log(res.data.link);
        const formUpdate = {
          address: this.formUpdate.value.address
            ? this.formUpdate.value.address
            : this.userInfo.address,
          email: this.formUpdate.value.email
            ? this.formUpdate.value.email
            : this.userInfo.email,
          phone: this.formUpdate.value.phone
            ? this.formUpdate.value.phone
            : this.userInfo.phone,
          url: res.data.link ? res.data.link : ""
        };
        this.userInfoService.uploadUser(formUpdate).subscribe(
          res => {
            this.userInfo = res;
            localStorage.setItem("UserCurrent", JSON.stringify(res.userDTO));
            window.location.reload();
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);

      }
    );
  }


}
