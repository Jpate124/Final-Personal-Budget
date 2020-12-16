import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user/user.module';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    public register(user: User) {
        return this.http.post('http://localhost:3000/api/signup', user);
    }
}
