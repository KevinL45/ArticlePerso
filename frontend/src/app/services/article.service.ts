import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://127.0.0.1:8080/articles/';

  constructor(private http: HttpClient, private userService:UserService) {}

  articles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}list`);
  }

  article(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}details/${id}`);
  }

  update(id: number, articleData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}update/${id}`, articleData);
  }

  save(articleData: any): Observable<any> {
    const token = this.userService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    return this.http.post<any>(`${this.apiUrl}add`, articleData, { headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}delete/${id}`);
  }
}
