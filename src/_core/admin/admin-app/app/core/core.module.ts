import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth-interceptor';

@NgModule({
    imports: [],
    exports: [],
    providers: [
        DataService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
})
export class CoreModule { }
