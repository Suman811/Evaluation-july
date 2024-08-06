import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CrudserviceService } from '../services/crudservice.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {


  constructor(private fb:FormBuilder, private crudService : CrudserviceService, private toaster : ToastrService,private route:Router){}

mail(){
  this.crudService.sendEmail(this.forgotform.value.email).subscribe({
    next : (res) => {
      this.toaster.success('Success',"Email send successfully");
      this.route.navigate(["/mail"]);
    }
  })
}

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
