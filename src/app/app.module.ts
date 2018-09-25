import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {JsonpModule, Jsonp, Response} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { StartpageComponent } from './startpage/startpage.component';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AboutGuard }   from './guards';

import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './services/login.service';
import { isAuthenticated } from './services/isAuthenticated';


const routes: Routes = [
  { path: '', component: StartpageComponent },
  { path: 'info', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [isAuthenticated] },
  { path: 'doctor', component: DoctorComponent, canActivate: [isAuthenticated] },
  { path: 'signin', component: SigninComponent, canActivate: [isAuthenticated] },
  { path: 'login', component: LoginComponent, canActivate: [isAuthenticated] },
  { path: 'admin', component: AdminComponent, canActivate: [isAuthenticated] },
  { path: '**', component: StartpageComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    ProfileComponent,
    StartpageComponent,
    AdminComponent,
    DoctorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    JsonpModule
  ],
  providers: [CookieService, LoginService, isAuthenticated],
  bootstrap: [AppComponent]
})
export class AppModule { }
