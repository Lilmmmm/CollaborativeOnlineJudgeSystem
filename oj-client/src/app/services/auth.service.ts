// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

declare var Auth0Lock : any;
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  private clientId = 'L2u1rFC8u9xmM0CQUwHTVxL3QdNP37mi';
  private domain = 'lilmmmm.auth0.com';
  private userProfile: any;

  lock = new Auth0Lock(this.clientId, this.domain, {});

  auth0 = new auth0.WebAuth({
    clientID: 'L2u1rFC8u9xmM0CQUwHTVxL3QdNP37mi',
    domain: 'lilmmmm.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid profile'
  });

  constructor(public router: Router, private http: HttpClient) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
    this.lock.show((error: string, profile: Object, id_token: string) => {
      if (error) {
        console.log(error);
      }else {
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', id_token);
      }
    })
  }

  public handleAuthentication(): void {
   this.auth0.parseHash((err, authResult) => {
     if (authResult && authResult.accessToken && authResult.idToken) {
       window.location.hash = '';
       this.localLogin(authResult);
       this.getProfile();
       this.router.navigate(['/home']);
     } else if (err) {
       this.router.navigate(['/home']);
       console.log(err);
     }
   });
 }

 private localLogin(authResult): void {
   // Set isLoggedIn flag in localStorage
   localStorage.setItem('isLoggedIn', 'true');
   // Set the time that the access token will expire at
   const expiresAt = (authResult.expiresIn * 360000) + new Date().getTime();
   this._accessToken = authResult.accessToken;
   this._idToken = authResult.idToken;
   this._expiresAt = expiresAt;
 }

 public renewTokens(): void {
   this.auth0.checkSession({}, (err, authResult) => {
     if (authResult && authResult.accessToken && authResult.idToken) {
       this.localLogin(authResult);
     } else if (err) {
       alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       this.logout();
     }
   });
 }

 public logout(): void {
   // Remove tokens and expiry time
   this._accessToken = '';
   this._idToken = '';
   this._expiresAt = 0;
   // Remove isLoggedIn flag from localStorage
   localStorage.removeItem('isLoggedIn');
   localStorage.removeItem('id_token');
   localStorage.removeItem('profile');
   // Go back to the home route
   this.router.navigate(['/']);
 }

 public isAuthenticated(): boolean {
   // Check whether the current time is past the
   // access token's expiry time
   // return new Date().getTime() < this._expiresAt;
   return localStorage.getItem('isLoggedIn') == 'true';
 }

 public getProfile(): void {
  if (!this._accessToken) {
    throw new Error('Access Token must exist to fetch profile');
  }

  const self = this;
  this.auth0.client.userInfo(this._accessToken, (err, profile) => {
    if (profile) {
      self.userProfile = profile;
    }
    localStorage.setItem('profile', JSON.stringify(profile));
  });
 }


 public getProfileName() {
   return JSON.parse(localStorage.getItem('profile'));
 }

 public resetPassword(): void {
   let profile = this.getProfileName();
   let email = profile.name;
   let url: string = `https://${this.domain}/dbconnections/change_password`;
   let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
   let body = {
     client_id: this.clientId,
     email: email,
     connection: 'Username-Password-Authentication'
   };

   this.http.post(url, body, options)
                     .toPromise()
                     .catch(err => console.log(err));

 }

 // Error handler
 private handleError(error: any): Promise<any> {
   console.error('An error occurred', error);  // use for demo debug
   return Promise.reject(error.message || error);
 }
}
