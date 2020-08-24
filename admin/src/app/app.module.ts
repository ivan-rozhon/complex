import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RootStateModule } from '@cx/state/index';

import { SharedModule } from '@cx/shared/shared.module';

import { ScreensModule } from '@cx/screens/screens.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RootStateModule,
    SharedModule,
    ScreensModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
