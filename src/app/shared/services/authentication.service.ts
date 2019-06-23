import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GlobalsParams } from './global.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient, private config234: GlobalsParams) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;

    }

    login(username, password) {
        var userData = "username=" + username + "&password=" + password + "&grant_type=password";

        var reqHeader = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this.http.post(this.config234.PrimaryAPI + '/owin/Token', userData)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                
                console.log(user);
                return user;
         })
         )
         
    }

    GetLoginInformation(){

        
    }


    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}