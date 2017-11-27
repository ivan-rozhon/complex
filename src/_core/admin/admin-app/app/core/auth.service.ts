import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Moment } from 'moment/moment';
import * as moment from 'moment/moment';
import * as jwtDecode from 'jwt-decode';

import { DataService } from './data.service';
import { Credentials } from './core.model';

@Injectable()
export class AuthService {

    constructor(
        private dataService: DataService
    ) { }

    /**
     * Sign/Log in user
     * @param credentials username & login
     */
    login(credentials: Credentials): Observable<null> {
        return this.dataService
            .post('login', credentials);
    }

    /** Logout user - remove JWT */
    logout(): void {
        localStorage.removeItem('jwtComplex');
    }

    /** Check if user is logged in (if JWT is not expired) */
    isLoggedIn(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    /** Find out expiration in JWT */
    getExpiration(): Moment {
        // get JWT from local storage
        const jwt = localStorage.getItem('jwtComplex');

        // decode and get JWT payload
        const jwtPayload = jwt ? jwtDecode(jwt).exp : 0;

        // return expiration as moment
        return moment(jwtPayload);
    }
}
