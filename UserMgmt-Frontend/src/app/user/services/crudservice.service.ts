
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudserviceService {
private userDetailSubject = new BehaviorSubject<any>(null);
 currentUserDetail= this.userDetailSubject.asObservable();


  changeUserDetail(userDetail: any) {
    this.userDetailSubject.next(userDetail);
  } 

  constructor(private http : HttpClient) { }
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // };

  private apiUrl = ' https://localhost:7066/api/User';
//  /AddUser

  getRecordPerPage(currentPage : number, itemsPerPage : number) : Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/GetRecords?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
  }


  addUser(userDetails: any, p0: { headers: HttpHeaders; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddUser`, userDetails);
  }


  deleteUser(id: number) : Observable<any>{
    return this.http.delete<any>(`https://localhost:7066/api/User/DeleteUser?id=${id}`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>('https://localhost:7066/api/User/GetAllUsers');
  }
  updateUser(userDetails:any,userId:any):Observable<any>{
    // const headers = new HttpHeaders({
    //   'Content-Type': 'multipart/form-data'
    // });
    // return this.http.post<any>(`https://localhost:7066/api/User/UpdateUser/${userId}`,userDetails,{headers:headers});
    return this.http.post<any>(`https://localhost:7066/api/User/UpdateUser/${userId}`,userDetails);

    
  }
  validate(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7066/api/User/ValidateUser',data);
  }

  sendEmail(data : any) : Observable<any> {
    return this.http.post<any>('https://localhost:7066/api/User/SendEmail/'+data,data);
  }
}