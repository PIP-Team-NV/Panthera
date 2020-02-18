import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, of } from 'rxjs';


import { SecurityService } from '../Test Pages/Prototypes/Security/security.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ SecurityService ]

})
export class LoginComponent {
  constructor() {}
}
