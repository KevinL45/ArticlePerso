import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://127.0.0.1:8080/articles/';

  constructor(private http: HttpClient) {}

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
    return this.http.post<any>(`${this.apiUrl}add`, articleData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}delete/${id}`);
  }
}
