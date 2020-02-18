import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { ChangeLogService } from './change-log.service';
import { Subscription } from 'rxjs';
import { State } from '@progress/kendo-data-query';
import { ChangeLogTipService } from './change-log-tip.service';

@Directive({
  selector: '[fcidChangeLogTipBinding]',
  providers: [ChangeLogService, ChangeLogTipService]
})
export class ChangeLogTipBindingDirective implements OnInit, OnDestroy {
  @Input()
  public domain : string;

  @Input()
  public clientId : any;

  constructor(private changeLogs: ChangeLogService, private changeLogTipService: ChangeLogTipService) {   
  }

  public ngOnInit(): void {
    this.changeLogs.claimClientId = this.clientId;
    this.changeLogTipService.serviceSubscription = this.changeLogs.fetchChanges().subscribe((result) => {
      if( result ==undefined || result==null) return;
      this.changeLogTipService.data = result;
    });
  }

  public ngOnDestroy(): void {
  }
}
