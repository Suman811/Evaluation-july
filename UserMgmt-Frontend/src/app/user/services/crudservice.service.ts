
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

  private apiUrl = 'https://localhost:7066/api/User';


  getRecordPerPage(currentPage : number, itemsPerPage : number) : Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/GetRecords?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
  }


  addUser(userDetails : any) : Observable<any>{
    
    return this.http.post<any>('https://localhost:7066/api/User/AddUser', userDetails,{headers: {
      'Bearer': 'Access Token',
      'Content-Type': 'application/json'
    },});
  }


  deleteUser(id : number) : Observable<any>{
    return this.http.delete<any>('');
  }

}