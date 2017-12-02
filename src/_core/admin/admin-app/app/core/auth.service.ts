import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Moment } from 'moment/moment';
import * as moment from 'moment/moment';
import * as jwtDecode from 'jwt-decode';

import { DataService } from './data.service';
import { Credentials } from './core.model';

@Injectable()
export class AuthService {

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(
        private dataService: DataService,
        private router: Router
    ) { }

    /**
     * Sign/Log in user
     * @param credentials username & password
     */
    login(credentials: Credentials): Observable<null> {
        return this.dataService
            .post('login', credentials);
    }

    /** Logout user - remove JWT */
    logout(): void {
        localStorage.removeItem('jwtComplex');

        // redirect user (to login page)
        this.router.navigate(['/login']);
    }

    /** Check if user is logged in (if JWT is not expired) */
    isLoggedIn(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    /** Set auth JWT to local storage */
    setToken(jwt: string): void {
        // save token to local storage (set session)
        localStorage.setItem('jwtComplex', jwt);
    }

    /** Find out expiration in JWT */
    getExpiration(): Moment {
        // get JWT from local storage
        const jwt = localStorage.getItem('jwtComplex');

        // decode and get JWT payload
        const jwtPayload = jwt ? jwtDecode(jwt).exp : 0;

        // return expiration as moment (need to convert PHP timestamp)
        return moment(new Date(jwtPayload * 1000));
    }

    /** Returns 'Bearer' auth header */
    getAuthHeader(): string {
        // get auth JWT from local storage
        const jwt = localStorage.getItem('jwtComplex');

        return jwt ? `Bearer ${jwt}` : '';
    }
}
