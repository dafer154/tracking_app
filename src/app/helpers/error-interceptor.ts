import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private $authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // To do something
                    }
                }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.httpErrors(err);
                    }
                })
        );
    }

    httpErrors(http: any) {
        if (http)
            if (http.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.clear();
                this.router.navigate(['/platform']);
                this.$authService.setToken(undefined);
            }
        const error = http.message || http.statusText;
        return throwError(error);
    }
}