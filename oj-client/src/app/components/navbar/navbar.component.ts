import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "MYL";

  username = "Ace";

  constructor( @Inject('auth') private auth) { }

  ngOnInit() {

    // show username if logging in
    // if (this.auth.authenticated()) {
    //   this.username = this.auth.getProfile().nickname;
    // }


  }

  login(): void {
    // this.auth.login().then((profile) => {
    //   this.username = profile.nickname;
    // });
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }

  // redirect to problems page and show search results
  // searchProblem(): void {
  //   this.router.navigate(['/problems']);
  // }

}
