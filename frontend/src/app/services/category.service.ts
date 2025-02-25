import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Category } from '../models/Category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  
  private apiUrl = environment.apiUrl+'/categories/';

  constructor(private http: HttpClient, private router: Router, private userService:UserService) {}

  categories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}list`);
  }

  category(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}details/${id}`);
  }

  update(id: number, categoryData: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}update/${id}`, categoryData);
  }

  save(categoryData: Category): Observable<Category> {
 
    const headers = {
      'Authorization': `Bearer ${this.userService.getToken()}`,
    };
    return this.http.post<Category>(`${this.apiUrl}add`, categoryData, { headers });
  }

  delete(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}delete/${id}`);
  }
}
