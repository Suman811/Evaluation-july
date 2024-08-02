import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CrudserviceService } from '../services/crudservice.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  p1:any;
  active : any;
  inActive : any;

  editItem() {
    throw new Error('Method not implemented.');
  }

  deleteItem() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getUserDetails();
  }
  constructor(private serve: CrudserviceService) { }
  getUserDetails() {
    this.subscription = this.serve.getAllUsers().subscribe(
      {
        next: (res: any) => {
            this.userDetails = res;
            let allUserData = res;

            let activeUser = allUserData.filter((data : any) => data.isActive);
            this.active = activeUser.length;
            
            this.inActive = allUserData.length - this.active;

            console.log(this.userDetails);
            let active = this.userDetails.filter((user: any) => user.isActive);
            let inActive = this.userDetails.filter((user: any) => !user.isActive);
            this.activeUser = active.length;
            this.inActiveUser = inActive.length;
        }
      }
    );
  }


  exportToExcel() {
    let data = document.getElementById("tbldata");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.filename)
  }
  userData: any[] = ['d', 'ds', 'ds']

  //Used to track current page number
  currentPage: number = 1;

  //used to set how many organizaton should be shown on a single page of table
  itemsPerPage: number = 5;


  userDetails: any;
  activeUser: number = 0;
  inActiveUser: number = 0;
  subscription: any;
  filename = "User_Details.xlsx";

  //Method used to update the current page when clicked
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  //Method used to calculate total number of pages
  totalPages(): number[] {
    return Array(Math.ceil(this.userData.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }
}

