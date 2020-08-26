import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent, LoginComponent, EditorComponent } from './components';
import { PickItemPipe, MapToIterablePipe } from './pipes';
import { ContentEditableDirective } from './directives';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    LayoutComponent,
    LoginComponent,
    EditorComponent,
    PickItemPipe,
    MapToIterablePipe,
    ContentEditableDirective,
  ],
  exports: [
    LayoutComponent,
    LoginComponent,
    EditorComponent,
    PickItemPipe,
    MapToIterablePipe,
    ContentEditableDirective,
  ],
  providers: [PickItemPipe],
})
export class SharedModule {}
