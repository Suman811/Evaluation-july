import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CrudserviceService } from '../services/crudservice.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderserviceService } from '../loader/loaderservice.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent {

  constructor(private fb: FormBuilder, 
    private loaderService: LoaderserviceService,
    private serve: CrudserviceService, private route: Router, private toastr: ToastrService) { }

  loginform = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })

  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  getControl(a: any) {
    return this.loginform.get(a);
  }
  saveForm() {
    this.loaderService.showLoader();
    if (this.loginform.valid) {
      console.log(this.loginform.value);
      this.serve.validate(this.loginform.value).subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.token) {
            localStorage.setItem("token", JSON.stringify(data.token));
            this.loaderService.hideLoader();
            this.toastr.success("success");
            setTimeout(() => {
              this.route.navigate(['list']);
            }, 2000);
          } else if (data.message) {
            this.toastr.error(data.message, "Login Error");
          }
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error("Internal Server Error", "Login Error");
        }
      });
    } else {
      console.log("Invalid credentials");
      this.toastr.error("Invalid credentials", "Login Error");
      this.loginform.markAllAsTouched();
    }
  }}  