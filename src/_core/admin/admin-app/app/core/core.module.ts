import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { AuthInterceptor } from './auth-interceptor.service';

@NgModule({
    imports: [],
    exports: [],
    providers: [
        DataService,
        AuthService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
})
export class CoreModule { }
