import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {TabsModule} from 'ngx-bootstrap/tabs'; // for ngx-bootstrap
import{ButtonsModule} from 'ngx-bootstrap/buttons';// for ngx-bootstrap
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // for ngx-bootstrap
    importProvidersFrom(
      TabsModule.forRoot(),
      ButtonsModule.forRoot(),
      BrowserAnimationsModule,
      BsDatepickerModule.forRoot(),
      CarouselModule.forRoot()

    )
  ]
};
