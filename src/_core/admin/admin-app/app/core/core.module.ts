import { NgModule } from '@angular/core';

import { DataService } from './data.service';
import { AuthService } from './auth.service';

@NgModule({
    imports: [],
    exports: [],
    providers: [
        DataService,
        AuthService
    ],
})
export class CoreModule { }
