import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {


  constructor(private fb:FormBuilder){}



  forgotform = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
  })


  getControl(a:any){
    return this.forgotform.get(a);
  }
  saveForm(){
    if(this.forgotform.valid){
      console.log("success");
    }
    else{
      console.log("invalid");
      this.forgotform.markAllAsTouched();
    }
  }
}
