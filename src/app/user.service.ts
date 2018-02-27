import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './userModel';

@Injectable()
export class UserService {

  constructor(private http: HttpClient ) { }

  getUserName(): any {
    return this.http.get('/userDetails');
  }

  addUserToDB(user: User): any {
    return this.http.post('/addUser', user);
  }
}
