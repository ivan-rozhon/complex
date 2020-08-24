import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '@cx/core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  // getter auth service - because of cyclic dependency
  get authService(): AuthService {
    return this.injector.get<AuthService>(AuthService);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // get auth JWT
    const jwtReq = this.authService.getAuthHeader();

    // clone request and assign 'Authorization' header if JWT is available
    const authReq = jwtReq.length
      ? req.clone({
          headers: req.headers.set('Authorization', jwtReq),
        })
      : req;

    return (
      next
        .handle(authReq)
        // intercept all responses
        .pipe(
          tap(
            (event) => {
              if (event instanceof HttpResponse) {
                // get auth JWT from response
                const jwtRes = event.body.token;

                // save token to local storage (set session)
                localStorage.setItem('jwtComplex', jwtRes);
              }
            },
            // intercept http errors
            (error: HttpErrorResponse) => {
              // user is unauthorized - go to login page
              if (error.status === 401) {
                // redirect user to login page
                this.authService.logout();
              }
            }
          )
        )
    );
  }
}
