import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorComponent } from './editor/editor.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';

import { ContentEditableDirective } from './directives/content-editable.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        // components
        EditorComponent,
        LayoutComponent,
        LoginComponent,
        UploadComponent,
        // directives
        ContentEditableDirective
    ],
    exports: [
        // components
        EditorComponent,
        LayoutComponent,
        LoginComponent,
        UploadComponent,
        ContentEditableDirective
    ],
    providers: [],
})
export class SharedModule { }
