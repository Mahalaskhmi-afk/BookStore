import { DOCUMENT } from '@angular/common';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Define the structure of the response object
interface AuthResponse {
  token: string;
  customer: {
    customerId: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  localStorage: Storage | null = null;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
    this.localStorage = this.document.defaultView?.localStorage || null;
  }

  signUp(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>("http://localhost:8080/auth/login", user, { headers })
      .pipe(
        map(response => {
          return {
            token: (response).token,
            userId: (response).user.userId,
            userName: (response).user.firstName,
            role: (response).user.role
          };
        })
      );
  }
  signIn(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post("http://localhost:8080/auth/register", user, { headers });
  }

  getUserProfile(userId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/profile/${userId}`);
  }

  logout() {
    this.localStorage?.removeItem('role');
    this.localStorage?.removeItem('token');
    this.localStorage?.removeItem('userName');
    this.localStorage?.removeItem('customerId');
    this.localStorage?.removeItem('userId');
  }

  setUserName(name: string) {
    this.localStorage?.setItem('userName', name);
  }

  getUserName() {
    return this.localStorage?.getItem('userName');
  }

  setRole(role: string) {
    this.localStorage?.setItem('role', role);
  }

  getRole() {
    return this.localStorage?.getItem('role');
  }


  setUserId(userId: any) {
    this.localStorage?.setItem('userId', userId);
  }

  getUserId() {
    return this.localStorage?.getItem('userId');
  }


  setToken(token: any) {
    this.localStorage?.setItem('token', token);
  }

  getToken() {
    return this.localStorage?.getItem('token');
  }
}
