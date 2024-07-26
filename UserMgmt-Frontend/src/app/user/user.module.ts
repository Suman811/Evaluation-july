import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SignComponent } from './sign/sign.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MailsentComponent } from './mailsent/mailsent.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AdduserComponent } from './adduser/adduser.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    SignComponent,
    ForgotpasswordComponent,
    MailsentComponent,
    UserlistComponent,
    AdduserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
  ]
})
export class UserModule { }
