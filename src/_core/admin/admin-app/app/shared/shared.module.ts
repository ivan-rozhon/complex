import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        LayoutComponent,
        LoginComponent
    ],
    declarations: [
        LayoutComponent,
        LoginComponent
    ],
    providers: [],
})
export class SharedModule { }
