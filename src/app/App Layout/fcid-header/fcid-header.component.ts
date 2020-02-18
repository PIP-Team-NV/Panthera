import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/Test Pages/Prototypes/Security/security.service';

@Component({
  selector: 'fcid-header',
  templateUrl: './fcid-header.component.html',
  styleUrls: ['./fcid-header.component.scss']
})
export class FcidHeaderComponent implements OnInit {

  constructor(private securityService: SecurityService, private _router: Router) { }

  ngOnInit() {
  }

}
