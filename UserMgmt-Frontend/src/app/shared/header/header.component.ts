import { Component, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
settings() {
throw new Error('Method not implemented.');
}
constructor(private route:Router){

}
logout() {

  localStorage.clear();
  this.route.navigate(['']);


}
changePassword() {
throw new Error('Method not implemented.');
}
  activeHeaderList : any[] = ['dashboard', 'addUser'];

  @Input() active : number = 0;

  activeHeader : string = this.activeHeaderList[this.active];
menu(){
  
}

  ngOnInit(): void {
    this.activeHeader = this.activeHeaderList[this.active]
  }


  // @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  // toggleSidebar() {
  //   this.toggleSidebarForMe.emit();
  // }
  
  // logOut() {
  
  // }
}
function Output(): (target: HeaderComponent, propertyKey: "toggleSidebarForMe") => void {
  throw new Error('Function not implemented.');
}

