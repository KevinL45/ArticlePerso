import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Article } from '../models/Article';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = environment.apiUrl+'/articles/';

  constructor(private http: HttpClient, private userService:UserService) {}

  articles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}list`);
  }

  article(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}details/${id}`);
  }

  updateArticle(id: number, articleData: Article,  file:File): Observable<Article> {

    const formData = new FormData();

    // Ajouter l'image au FormData
    formData.append('file', file);
  
    // Ajouter les autres données de l'article
    formData.append('title', articleData.title);
    formData.append('description', articleData.description);
    formData.append('imageUrl', articleData.imageUrl);
    formData.append('category', JSON.stringify(articleData.category)); // Convertir en JSON si c'est un objet
    formData.append('user', JSON.stringify(articleData.user)); // Convertir en JSON si c'est un objet

    const headers = {
      'Authorization': `Bearer ${this.userService.getToken()}`,
      
    };

    return this.http.put<Article>(`${this.apiUrl}update/${id}`, formData, {headers});
  }

  saveArticle(articleData: Article, file:File): Observable<Article> {

    const formData = new FormData();

    // Ajouter l'image au FormData
    formData.append('file', file);
  
    // Ajouter les autres données de l'article
    formData.append('title', articleData.title);
    formData.append('description', articleData.description);
    formData.append('category', JSON.stringify(articleData.category)); // Convertir en JSON si c'est un objet
    formData.append('user', JSON.stringify(articleData.user)); // Convertir en JSON si c'est un objet

    const headers = {
      'Authorization': `Bearer ${this.userService.getToken()}`,
      
    };
    return this.http.post<Article>(`${this.apiUrl}add`, formData, { headers });
  }

  deleteArticle(id: number): Observable<Article> {
    const headers = {
      'Authorization': `Bearer ${this.userService.getToken()}`,
      
    };
    return this.http.delete<Article>(`${this.apiUrl}delete/${id}`,{headers});
  }
}
