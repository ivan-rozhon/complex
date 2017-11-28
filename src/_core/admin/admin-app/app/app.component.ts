import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './core/auth.service';

@Component({
    selector: 'ca-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, OnDestroy {
    routerSubscription: Subscription;

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        // subscribe to actual requested URL (after redirect)
        this.routerSubscription =
            this.router.events
                .filter(event => event instanceof NavigationEnd)
                .pluck('urlAfterRedirects')
                .filter(url => url === '/login')
                .subscribe(url => {
                    // if user already logged in - redirect him from login page
                    if (this.authService.isLoggedIn()) {
                        this.router.navigate(['']);
                    }
                });
    }

    ngOnDestroy(): void {
        // unsubscribe subscription on component destroy
        this.routerSubscription.unsubscribe();
    }
}
