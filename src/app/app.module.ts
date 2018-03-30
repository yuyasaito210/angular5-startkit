import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

import { NgxImageGalleryModule } from 'ngx-image-gallery';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService, SearchService, PagerService } from './_services/index';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SearchComponent } from './search/index';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxImageGalleryModule,
    routing
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    SearchComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    SearchService,
    PagerService,
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
