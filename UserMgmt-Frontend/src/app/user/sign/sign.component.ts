import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CrudserviceService } from '../services/crudservice.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent {

  constructor(private fb:FormBuilder,private serve:CrudserviceService){}

  loginform =this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })

  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  getControl(a:any)
  {
    return this.loginform.get(a);
   }
   saveForm(){
    if(this.loginform.valid){
    console.log(this.loginform.value);
    this.serve.validate(this.loginform.value).subscribe({
      next:(data)=>{
        console.log(data);
      }
    })
    }
    else{
    console.log("Invalid credentials");
    this.loginform.markAllAsTouched();
   }
}
}