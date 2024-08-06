import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudserviceService } from '../services/crudservice.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {
  constructor(private fb:FormBuilder, private crudService : CrudserviceService, private toaster : ToastrService,private route:Router){}

  reset = this.fb.group({
    password: ['', Validators.required],
  })
  getControl(a:any){
    return this.reset.get(a);
  }
  save(){
    if(this.reset.valid){
      console.log("success");
      
    }
    else{
      console.log("invalid");
      this.reset.markAllAsTouched();
    }
  }
}
