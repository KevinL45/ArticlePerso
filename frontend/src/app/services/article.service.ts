import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://127.0.0.1:8080/articles/';

  constructor(private http: HttpClient, private userService:UserService) {}

  articles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}list`);
  }

  article(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}details/${id}`);
  }

  update(id: number, articleData: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}update/${id}`, articleData);
  }

  save(articleData: Article): Observable<Article> {
    
    const headers = {
      'Authorization': `Bearer ${this.userService.getToken()}`,
      
    };
    return this.http.post<Article>(`${this.apiUrl}add`, articleData, { headers });
  }

  delete(id: number): Observable<Article> {
    return this.http.delete<Article>(`${this.apiUrl}delete/${id}`);
  }
}
