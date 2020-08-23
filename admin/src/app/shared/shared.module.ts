import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent, LoginComponent } from './components/';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [LayoutComponent, LoginComponent],
  exports: [LayoutComponent, LoginComponent],
})
export class SharedModule {}
