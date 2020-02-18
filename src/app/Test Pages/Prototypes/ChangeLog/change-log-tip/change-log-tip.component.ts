import { Component, OnInit, Input, TemplateRef, ComponentRef } from '@angular/core';
import { ChangeLogTipService } from '../change-log-tip.service';
import { WindowService, WindowCloseResult } from '@progress/kendo-angular-dialog';
import { ChangeLogPopupListComponent } from '../change-log-popup-list/change-log-popup-list.component';
import { ChangeLogModel } from '../change-log-model';

@Component({
  selector: 'fcid-change-log-tip',
  templateUrl: './change-log-tip.component.html',
  styleUrls: ['./change-log-tip.component.scss']
})
export class ChangeLogTipComponent implements OnInit {

  @Input()
  public field: string;

  public changelogPopupOpen: boolean = false;

  private _changes : ChangeLogModel[];
  public get changes() {
    return this.changeLogTipService.getChanges(this.field);
  }

  constructor(private changeLogTipService : ChangeLogTipService, private windowService : WindowService) {
  }

  ngOnInit() {
  }

  public get totalChanges() : number {
    return this.changeLogTipService.totalChanges(this.field);
    // return this.data.filter(cl => cl.property.toLowerCase() == this.field.toLowerCase()).length;
  }

  public get visible() : boolean {
    // Keep off for now.
    // return false;
    return this.changeLogTipService.totalChanges(this.field) > 0;
  }

  public userPic(user: string)
  {
    console.log("USERPIC: ", user);
    if (user == "ins_cli")
      return "/assets/images/userTmpIcon/bg.jpg";
    else if (user == "ins_mgr")
      return "/assets/images/userTmpIcon/mg.jpg";
    else if (user == "scc_mgr")
      return "/assets/images/userTmpIcon/zr.jpg";
    else 
      return "/assets/images/userTmpIcon/ms.jpg";
  }

  public get firstUser() : string {
    if (this.totalChanges >= 1)
    {
      return this.userPic(this.changes[0].user);
    }      
    else 
      return "";
  }

  public get secondUser() : string {
    if (this.totalChanges >= 2)
    return this.userPic(this.changes[1].user);
    else 
      return "";
  }

  public get thirdUser() : string {
    if (this.totalChanges >= 3)
      return this.userPic(this.changes[2].user);
    else 
      return "";
  }

  public openChangeLogPopupListWindow() {
    if (this.changelogPopupOpen)
      return;
      
    const windowRef = this.windowService.open({
      title: `Changes for ${this.field}`,
      content: ChangeLogPopupListComponent,
      width: 1000
    });
    var test = windowRef.content as ComponentRef<ChangeLogPopupListComponent>;
    test.instance.changes = this.changeLogTipService.getChanges(this.field);

    this.changelogPopupOpen = true;

    windowRef.result.subscribe((result) => {
      if(result instanceof WindowCloseResult) {
        this.changelogPopupOpen = false;
      }
    });
  }
}
