import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        LayoutComponent,
        LoginComponent,
        UploadComponent
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        UploadComponent
    ],
    providers: [],
})
export class SharedModule { }
