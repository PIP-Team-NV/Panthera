import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientModule } from '../client/client.module'
import { WindowService, WindowCloseResult, WindowRef } from '@progress/kendo-angular-dialog';
import { ClientsService } from '../clients.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'fcid-client-account-insert',
  templateUrl: './client-account-insert.component.html',
  styleUrls: ['./client-account-insert.component.scss'],
})
export class ClientAccountInsertComponent implements OnInit {

  private serviceSubscription: Subscription;
  private insertedId: any;
  public clientInsertForm = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required
    }),
  });

  constructor(private windowRef: WindowRef, public clientService: ClientsService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  public onSave(param: string) {
    if (this.clientInsertForm.valid) {
      const result: any = Object.assign({}, this.clientInsertForm.value);
      this.serviceSubscription = this.clientService.insertClient(result).subscribe((res) => {
        this.insertedId = res;
        switch (param) {
          case "saveAndCon":
            this.router.navigate(['/accounts/edit/' + this.insertedId]);
            break;
          default:
            this.clientInsertForm.reset();
            break;
        }
      });
    }
  }

  public onClose() {
    this.windowRef.close();
  }

  public insert() {
  }

  public ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }
  
}
