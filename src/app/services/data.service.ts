import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  addemployee(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/employee', data)
}
getemployee(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:3000/employee').pipe(
    map(response => {
      if (Array.isArray(response)) {
        // Check if the response is an array, if not, create an empty array
        return response;
      } else {
        // If the response is not an array, return an empty array
        return [];
      }
    }),
    catchError(error => {
      // Handle any errors that occur during the HTTP request
      console.error('Error fetching employees:', error);
      return of([]); // Return an empty array on error
    })
  );
}

getdetailid(id: any): Observable<any> {
    return this.http.get('http://localhost:3000/employee?empid='+id)
}
deleteemployee(id: any): Observable<any> {
  return this.http.delete(`http://localhost:3000/employee/${id}`)
} 
editemployee(id: number, data: any): Observable<any> {
  return this.http.put(`http://localhost:3000/employee/${id}`, data)
}
edit(id:any){
return this.http.get(`http://localhost:3000/employee/${id}`);
}
update(data:any){
  return this.http.put(`http://localhost:3000/employee/${data.id}`, data)

}
}
