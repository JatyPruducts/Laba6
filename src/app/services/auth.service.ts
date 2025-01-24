import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:5135/api/auth';

  // Храним ID таймера, чтобы при выходе/повторном логине его очищать
  private logoutTimerId: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response: any) => {
          // Устанавливаем, что залогинились
          localStorage.setItem('loggedIn', 'true');
          // Запоминаем время логина (для других проверок, если нужно)
          localStorage.setItem('loginTime', Date.now().toString());

          // Ставим таймер на 15 минут
          this.startLogoutTimer(1 * 60 * 1000); // 15 минут
        })
      );
  }

  // Запуск таймера, по истечении которого — logout
  private startLogoutTimer(milliseconds: number) {
    // Если уже был таймер, на всякий случай очищаем
    if (this.logoutTimerId) {
      clearTimeout(this.logoutTimerId);
    }

    this.logoutTimerId = setTimeout(() => {
      this.logout();
      this.router.navigate(['/login']);
    }, milliseconds);
  }

  setLoggedInFlag(): void {
    localStorage.setItem('loggedIn', 'true');
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  // Очистить таймер
  private clearLogoutTimer() {
    if (this.logoutTimerId) {
      clearTimeout(this.logoutTimerId);
      this.logoutTimerId = null;
    }
  }

  logout() {
    // Удаляем флаги
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loginTime');
    // Очищаем таймер
    this.clearLogoutTimer();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}