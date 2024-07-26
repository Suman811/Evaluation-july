import { Component, Input } from '@angular/core';

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
}
