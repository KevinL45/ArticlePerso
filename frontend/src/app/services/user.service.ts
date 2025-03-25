import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl+'/users/';
  private id: number | null = null;

  constructor(private http: HttpClient) {}

  register(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}add`, userData);
  }

  isAuthenticated(): boolean {
    if(localStorage.getItem('token') && localStorage.getItem('userId')){
      return !!localStorage.getItem('token');
    }else{
      this.logout()
      return false
    }
  
  }

  login(userData: User): Observable<{ token: string, userId: number }> {
    return this.http.post<{ token: string, userId: number }>(`${this.apiUrl}login`, userData);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
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
}