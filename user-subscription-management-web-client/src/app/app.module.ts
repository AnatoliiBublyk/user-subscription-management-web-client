import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddSubscriptionComponent } from './components/add-subscription/add-subscription.component';
import { RemoveSubscriptionComponent } from './components/remove-subscription/remove-subscription.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { HeaderComponent } from './components/header/header.component';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddSubscriptionComponent,
    RemoveSubscriptionComponent,
    EditProfileComponent,
    HeaderComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
