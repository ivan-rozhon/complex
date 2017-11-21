import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import * as UIkit from 'uikit';
import * as Icons from 'uikit/dist/js/uikit-icons';

import { AppModule } from './app/app.module';

UIkit.use(Icons);

if (process.env.ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
