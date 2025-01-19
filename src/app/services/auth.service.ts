import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5135/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }
  
  setLoggedInFlag() {
    localStorage.setItem('loggedIn', 'true');
  }

  // Проверяем, вошли ли
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}