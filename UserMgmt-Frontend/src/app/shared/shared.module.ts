import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserRoutingModule } from '../user/user-routing.module';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    UserRoutingModule  ],
    exports : [
      SidebarComponent,
      HeaderComponent
    ]
})
export class SharedModule { }
