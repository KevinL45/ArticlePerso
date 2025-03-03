import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Gallery } from '../models/Gallery';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private apiUrl = environment.apiUrl+'/galleries/';

  constructor(private http: HttpClient, private userService:UserService) {}

  galleries(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.apiUrl}list`);
  }

  gallery(id: number): Observable<Gallery> {
    return this.http.get<Gallery>(`${this.apiUrl}details/${id}`);
  }

  update(id: number, galleryData: Gallery): Observable<Gallery> {
    return this.http.put<Gallery>(`${this.apiUrl}update/${id}`, galleryData);
  }

  save(galleryData: Gallery, logo:File, background:File): Observable<Gallery> {
    const formData = new FormData();

    formData.append('logo', logo);
    formData.append('background', background);

    formData.append('name', galleryData.name);
    formData.append('description', galleryData.description);
    formData.append('user', JSON.stringify(galleryData.user)); // Convertir en JSON si c'est un objet

    const headers = {
      'Authorization': `Bearer ${this.userService.getToken()}`,
      
    };
    return this.http.post<Gallery>(`${this.apiUrl}add`, formData,{ headers });
  }

  delete(id: number): Observable<Gallery> {
    return this.http.delete<Gallery>(`${this.apiUrl}delete/${id}`);
  }
}
