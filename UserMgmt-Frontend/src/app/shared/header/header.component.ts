import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  activeHeaderList : any[] = ['dashboard', 'addUser'];

  @Input() active : number = 0;

  activeHeader : string = this.activeHeaderList[this.active];


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

