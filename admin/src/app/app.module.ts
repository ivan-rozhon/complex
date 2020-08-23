import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from '@cx-shared/shared.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, SharedModule, StoreModule.forRoot({}, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
