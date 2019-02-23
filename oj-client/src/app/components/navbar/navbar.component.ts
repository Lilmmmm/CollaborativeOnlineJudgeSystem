import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "MYL";

  username = "";

  profile: any;

  constructor( @Inject('auth') private auth) { }

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.username = this.auth.getProfileName().nickname;
    }
  }

  login(): void {
    this.auth.login();
    if (this.isAuthenticated()) {
      this.username = this.auth.getProfileName().nickname;
    }
  }

  logout(): void {
    this.auth.logout();
    this.username = "";
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  getName(): void {
    if (this.isAuthenticated()) {
      this.username = this.auth.getProfileName().nickname;
    }
  }
  // redirect to problems page and show search results
  // searchProblem(): void {
  //   this.router.navigate(['/problems']);
  // }

}
