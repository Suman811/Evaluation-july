import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CrudserviceService } from '../services/crudservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  p1:any;
  active : any;
  inActive : any;
  // editItem(a:any) {
  //   this.serve.updateUser(a).subscribe({
  //     next:(data:any)=>{
  //       this.t.success("User updated successfully");
  //     }
  //   })
  // }



  editItem(userDetail : any) {
    userDetail.Address = `${userDetail.city}, ${userDetail.state}, ${userDetail.country}, ${userDetail.zipCode}`; // Dynamic address
    console.log(userDetail);
    
    this.serve.changeUserDetail(userDetail);
    this.route.navigate(['add']);
  }

  deleteItem(id:number) {
    this.serve.deleteUser(id).subscribe({
      next:(data:any)=>{
        this.t.success(data.res);
        this.getUserDetails();
      },
      error : (err) => {
        if(err.error && err.error.message){
          this.t.error(err.error.message);
         
        }
        else{
          this.t.error('Something went wrong');
        }
      }
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
  }
  constructor(private serve: CrudserviceService, private t : ToastrService, private route:Router) { }
 
  // getUserDetails() {
  //   this.subscription = this.serve.getAllUsers().subscribe(
  //     {
  //       next: (res: any) => {
  //           this.userDetails = res;
  //           let allUserData = res;

  //           let activeUser = allUserData.filter((data : any) => data.isActive);
  //           this.active = activeUser.length;
            
  //           this.inActive = allUserData.length - this.active;

  //           console.log(this.userDetails);
  //           let active = this.userDetails.filter((user: any) => user.isActive);
  //           let inActive = this.userDetails.filter((user: any) => !user.isActive);
  //           this.activeUser = active.length;
  //           this.inActiveUser = inActive.length;
  //       }
  //     }
  //   );
  // }

//   getUserDetails() {
//     debugger;
//     this.subscription = this.serve.getAllUsers().subscribe({
//         next: (res: any) => {
//             this.userDetails = res;
//             let allUserData = res;
 
//             // Filter active and inactive users
//             let activeUser = allUserData.filter((data: any) => data.isActive);
//             //this.userData = activeUser;
//             let inactiveUser = allUserData.filter((data: any) => !data.isActive);
 
//             // Assign the count of active and inactive users
//             this.active = activeUser.length;
//             this.inActive = inactiveUser.length;
 
//             // Log the user details
//             console.log(this.userDetails);
 
//             // Assign filtered users to respective variables
//             this.activeUser = activeUser.length;
//             this.inActiveUser = inactiveUser.length;
//         }
//     });
// }
getUserDetails() {
  this.subscription = this.serve.getAllUsers().subscribe({
      next: (res: any) => {
          let allUserData = res;

          // Filter active and inactive users
          let activeUser = allUserData.filter((data: any) => data.isActive);
          let inactiveUser = allUserData.filter((data: any) => !data.isActive);

          // Assign the count of active and inactive users
          this.active = activeUser.length;
          this.inActive = inactiveUser.length;

          // Log the user details
          console.log(this.userDetails);

          // Assign only active users to userDetails for display
          this.userDetails = activeUser;
      }
  });
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

