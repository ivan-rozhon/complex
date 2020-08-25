import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@cx/shared/shared.module';

import { PagesComponent } from './pages.component';
import { PagesListComponent } from './pages-list/pages-list.component';
import { PagesContentComponent } from './pages-content/pages-content.component';
import { PagesInputComponent } from './pages-input/pages-input.component';
import { PagesContentListComponent } from './pages-content-list/pages-content-list.component';
import { PagesContentInputComponent } from './pages-content-input/pages-content-input.component';

@NgModule({
  declarations: [
    PagesComponent,
    PagesListComponent,
    PagesContentComponent,
    PagesInputComponent,
    PagesContentListComponent,
    PagesContentInputComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule],
})
export class PagesModule {}
