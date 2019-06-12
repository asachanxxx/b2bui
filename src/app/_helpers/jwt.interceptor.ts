import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
       
        if (currentUser && currentUser.access_token) {
            console.log("JWT interceptor " ,currentUser);
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });
            console.log("request: " ,request)
        }

        return next.handle(request);
    }
}