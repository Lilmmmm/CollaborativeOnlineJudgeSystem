import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "MYL";

  username = "";

  profile: any;

  searchBox: FormControl = new FormControl();

  subscription: Subscription;

  constructor( @Inject('auth') private auth,
                @Inject('input') private input,
                private router: Router) { }

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.username = this.auth.getProfileName().nickname;
    }

    this.subscription = this.searchBox.valueChanges.debounceTime(200).subscribe( term => {
      this.input.changeInput(term);
    });
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
  searchProblem(): void {
    this.router.navigate(['/problems']);
  }


  ngOnDestroy() {
    // To avoid memory leak
    this.subscription.unsubscribe();
  }


}
