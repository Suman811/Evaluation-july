
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudserviceService {

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


  deleteUser(id : number) : Observable<any>{
    return this.http.delete<any>('https://localhost:7066/api/User/DeleteUser?id=');
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>('https://localhost:7066/api/User/GetAllUsers');
  }
  updateUser():Observable<any>{
    return this.http.delete<any>('https://localhost:7066/api/User/UpdateUser');
    
  }
  validate(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7066/api/User/ValidateUser',data);
  }
}