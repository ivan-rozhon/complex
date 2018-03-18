import { Component } from '@angular/core';

import { AuthService } from './../core/auth.service';

@Component({
    selector: 'ca-board',
    templateUrl: 'board.component.html',
    styleUrls: ['board.component.scss']
})

export class BoardComponent {
    constructor(
        private authService: AuthService
    ) { }

    // Log out user (via auth service)
    logout(): void {
        this.authService.logout();
    }
}
