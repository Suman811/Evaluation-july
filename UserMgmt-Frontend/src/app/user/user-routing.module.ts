import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './sign/sign.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MailsentComponent } from './mailsent/mailsent.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AdduserComponent } from './adduser/adduser.component';

const routes: Routes = [
  {path:'add', component:AdduserComponent},
  {path:'', component:SignComponent},
  {path:'forgot', component:ForgotpasswordComponent},
  {path:'mail', component:MailsentComponent},
  {path:'list', component:UserlistComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
