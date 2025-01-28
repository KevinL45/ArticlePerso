import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  
  private apiUrl = 'http://127.0.0.1:8080/categories/';

  constructor(private http: HttpClient, private router: Router, private userService:UserService) {}

  categories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}list`);
  }

  category(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}details/${id}`);
  }

  update(id: number, categoryData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}update/${id}`, categoryData);
  }

  save(categoryData: any): Observable<any> {
 
    const headers = {
      'Authorization': `Bearer ${this.userService.getToken()}`,
    };
    return this.http.post<any>(`${this.apiUrl}add`, categoryData, { headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}delete/${id}`);
  }
}
