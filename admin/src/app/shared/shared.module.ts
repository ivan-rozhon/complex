import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent, LoginComponent } from './components';
import { PickItemPipe, MapToIterablePipe } from './pipes';
import { ContentEditableDirective } from './directives';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    LayoutComponent,
    LoginComponent,
    PickItemPipe,
    MapToIterablePipe,
    ContentEditableDirective,
  ],
  exports: [LayoutComponent, LoginComponent, PickItemPipe, MapToIterablePipe],
  providers: [PickItemPipe],
})
export class SharedModule {}
