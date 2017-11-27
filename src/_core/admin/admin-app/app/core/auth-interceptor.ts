import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // get auth JWT from local storage
        const jwtReq = localStorage.getItem('jwtComplex');

        // clone request and assign 'Authorization' header if jwtReq is available
        const authReq = jwtReq
            ? req.clone({
                headers: req.headers.set('Authorization', `Bearer ${jwtReq}`)
            })
            : req;

        return next.handle(authReq)
            // intercept all responses
            .do(event => {
                if (event instanceof HttpResponse) {
                    // get auth JWT from response
                    const jwtRes = event.body.token;

                    // save token to local storage (set session)
                    localStorage.setItem('jwtComplex', jwtRes);
                }
            });
    }
}
