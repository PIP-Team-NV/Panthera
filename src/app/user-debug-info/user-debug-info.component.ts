import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../Test Pages/Prototypes/Security/security.service';

@Component({
  selector: 'fcid-user-debug-info',
  templateUrl: './user-debug-info.component.html',
  styleUrls: ['./user-debug-info.component.scss']
})
export class UserDebugInfoComponent implements OnInit {

  
  constructor(private securityService : SecurityService) { }

  ngOnInit() {
  }

}
