import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CustomService } from './custom.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private serverUrl = `http://localhost:3000`;

  constructor(private http: HttpClient, private readonly customService: CustomService) { }

  login(credentials) {
    return this.http.post(`${this.serverUrl}/login`, credentials);
  }

  register(userDetails) {
    return this.http.post(`${this.serverUrl}/user`, userDetails);
  }

  getMessages() {
    const headers = {
      'x-access-token' : this.customService.getToken()
    };
    const options = {
      headers: new HttpHeaders(headers)
    };
    return this.http.get(`${this.serverUrl}/messages/user/`, options);
  }

  sendMessages(meassageObj) {
    const headers = {
      'x-access-token' : this.customService.getToken()
    };
    const options = {
      headers: new HttpHeaders(headers)
    };
    return this.http.post(`${this.serverUrl}/messages/`, meassageObj, options);
  }

}
