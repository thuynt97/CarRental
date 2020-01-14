import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { RegisterService } from 'src/app/service/register.service';
import { FormRegister } from 'src/app/model/FormRegister';
import { Router } from '@angular/router';

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.css"]
})
export class RegisterUserComponent implements OnInit {
  formRegister= this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    address: [''],
    phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(20)]]
  });
  constructor(public registerService: RegisterService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {}
  register() {
    console.log(this.formRegister.value);
    const param: FormRegister = this.formRegister.value;
    this.registerService.register(param).subscribe(res => {
      this.router.navigateByUrl("/");
    });
  }
}
