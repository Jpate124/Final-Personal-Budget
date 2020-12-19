import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { User } from '../_models/user/user.module';
import { TokenRes } from '../_models/tokenres.module';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  getCurrentUserValue() {
    throw new Error('Method not implemented.');
  }

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}
  public login(username, password): Observable<User> {
    return this.http.post('http://157.230.218.151:3000/api/login', { username, password })
        .pipe(map((res: TokenRes) => {
          console.log(res.token);
          const data = this.getDecodeJWTToken(res.token);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        }));
  }

  private getDecodeJWTToken(token: any): any {
    try{
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      return decodedToken;
    }
    catch(Error){
        return null;
    }
  }

  public logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
