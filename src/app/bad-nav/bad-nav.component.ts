import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../Test Pages/Prototypes/Security/security.service';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'fcid-bad-nav',
  templateUrl: './bad-nav.component.html',
  styleUrls: ['./bad-nav.component.scss']
})
export class BadNavComponent implements OnInit {

  //securitySer: SecurityService;
  isEnabled: boolean = false;
  constructor(private securityService: SecurityService, private _router: Router) {
  }

  ngOnInit() {
    if (this.securityService.isLoggedIn){
      this.isEnabled = true;
    }
  }

  get givenName() {
    return this.securityService.givenName;
  }

  get clientId(){
    return this.securityService.clientId;
  }

  logout() {
    this.securityService.logout();
    // this._router.navigate(['/']);
  }

}
