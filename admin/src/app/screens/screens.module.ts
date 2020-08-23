import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@cx-shared/shared.module';

import { ScreensRoutingModule } from './screens-routing.module';

import { PagesModule } from './pages/pages.module';
import { ScreensComponent } from './screens.component';

@NgModule({
  declarations: [ScreensComponent],
  imports: [CommonModule, SharedModule, ScreensRoutingModule, PagesModule],
})
export class ScreensModule {}
