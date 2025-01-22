import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private apiUrl = 'http://127.0.0.1:8080/galleries/';

  constructor(private http: HttpClient) {}

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
    return this.http.post<any>(`${this.apiUrl}add`, galleryData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}delete/${id}`);
  }
}
