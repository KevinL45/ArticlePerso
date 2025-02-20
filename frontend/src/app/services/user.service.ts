import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://127.0.0.1:8080/users/";
  private id: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}add`, userData);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  login(userData: User): Observable<{ token: string, userId: number }> {
    return this.http.post<{ token: string, userId: number }>(`${this.apiUrl}login`, userData);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/home']);
  }

  setUserCurrent(id: string): void {
    localStorage.setItem('userId',id)
  
  }

  getUserCurrent(){
    return localStorage.getItem('userId')
  }
  
  setToken(token: string): void {
    localStorage.setItem('token',token)
  
  }

  getToken(){
    return localStorage.getItem('token')
  }

  findUser(id: number): Observable<User> {
    const headers = {
      'Authorization': `Bearer ${this.getToken()}`,
    };
    return this.http.get<User>(`${this.apiUrl}details/${id}`,{headers});
  }
  loadUser(): void {
     if (this.isAuthenticated()){
      console.log("Vous êtes connecté !")
     }else{
      this.router.navigate(['/home'])
      console.log("Vous êtes pas connecté ! Retour à la page d'accueil.")
     }
    
  }
}