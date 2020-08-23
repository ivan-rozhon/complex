import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent, LoginComponent } from './components/';
import { PickItemPipe } from './pipes/';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [LayoutComponent, LoginComponent, PickItemPipe],
  exports: [LayoutComponent, LoginComponent, PickItemPipe],
  providers: [PickItemPipe],
})
export class SharedModule {}
