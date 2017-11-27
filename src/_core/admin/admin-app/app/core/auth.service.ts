import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';
import { Credentials } from './core.model';

@Injectable()
export class AuthService {

    constructor(
        private dataService: DataService
    ) { }

    /**
     * Sign (Log) in user
     * @param credentials username & login
     */
    login(credentials: Credentials): Observable<null> {
        return this.dataService
            .post('login', credentials);
    }
}
