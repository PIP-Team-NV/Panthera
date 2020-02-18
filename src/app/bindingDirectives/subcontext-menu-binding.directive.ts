import { Directive, OnInit, Input } from '@angular/core';
import { MenuService } from 'fcid-menu-library';
import { fcidMenuItem } from 'fcid-menu-library/menu-item-datatype';

@Directive({
  selector: '[fcidSubcontextMenuBinding]'
})
export class SubcontextMenuBindingDirective implements OnInit {
  @Input('clientId')
  clientId: number = -1;
  @Input('itemId')
  itemId: number = -1;
  @Input('itemName')
  itemName: string = "";

  constructor(private menuService: MenuService) { }
  ngOnInit(): void {
    let mainMenu: fcidMenuItem[] = [{
      text: this.itemName + ' Details',
      templateName: 'default',
      url: '/accounts/' + this.clientId + '/sites/edit/' + this.itemId + '/' ,
    }, {
      text: this.itemName + ' Messages',
      templateName: 'default',
      url: '/',
    }, {
      text: 'Add ' + this.itemName + ' Message',
      templateName: 'default',
      url: '/',
    },
    {
      text: this.itemName + ' Evaluations',
      templateName: 'default',
      url: '/',
    },
    {
      text: this.itemName + ' Change Log',
      templateName: 'default',
      url: '/',
    }
  ]
    this.menuService.setProperties('', '', [], mainMenu);
  }
}
