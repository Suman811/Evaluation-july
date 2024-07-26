import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent {

  constructor(private fb:FormBuilder){}

  loginform =this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'))]]
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
    
    }
    else{
    console.log("Invalid credentials");
    this.loginform.markAllAsTouched();
   }
}
}