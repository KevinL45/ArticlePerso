import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private apiUrl = 'http://127.0.0.1:8080/galleries/';

  constructor(private http: HttpClient, private userService:UserService) {}

  galleries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}list`);
  }

  gallery(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}details/${id}`);
  }

  update(id: number, galleryData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}update/${id}`, galleryData);
  }

  save(galleryData: any): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.userService.getToken()}`,
      
    };
    return this.http.post<any>(`${this.apiUrl}add`, galleryData,{ headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}delete/${id}`);
  }
}
