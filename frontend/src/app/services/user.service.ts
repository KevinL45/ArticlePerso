import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://127.0.0.1:8080/users/"

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}add`, userData);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Vérifie si le token est présent
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, userData,{
      responseType: 'text' as 'json'
    });
    
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}