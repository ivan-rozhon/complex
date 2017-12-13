import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorComponent } from './editor/editor.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';

import { ContentEditableDirective } from './directives/content-editable.directive';

import { MapToIterablePipe } from './pipes/mapToIterable.pipe';
import { FirstItemPipe } from './pipes/firstItem.pipe';

@NgModule({
    declarations: [
        // components
        EditorComponent,
        LayoutComponent,
        LoginComponent,
        UploadComponent,
        // directives
        ContentEditableDirective,
        // pipes
        MapToIterablePipe,
        FirstItemPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        // components
        EditorComponent,
        LayoutComponent,
        LoginComponent,
        UploadComponent,
        // directives
        ContentEditableDirective,
        // pipes
        MapToIterablePipe,
        FirstItemPipe
    ],
    providers: [],
})
export class SharedModule { }
