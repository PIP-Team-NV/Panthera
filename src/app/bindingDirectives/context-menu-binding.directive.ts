import { Directive, OnInit, Input } from '@angular/core';
import { MenuService } from 'fcid-menu-library';
import { fcidMenuItem } from 'fcid-menu-library/menu-item-datatype';

@Directive({
  selector: '[fcidContextMenuBinding]',
  providers: [MenuService]
})
export class ContextMenuBindingDirective implements OnInit {
  @Input('clientId')
  clientId: number = -1;

  constructor(private menuService: MenuService) { }
  ngOnInit(): void {
    let mainMenu: fcidMenuItem[] = [{
      text: 'Details',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    }, {
      text: 'Dashboard',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    }, {
      text: 'Search',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    },
    {
      text: 'Sites',
      templateName: 'default',
      url: '/accounts/' + this.clientId + '/sites/',
    },
    {
      text: 'Ingredients',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    },
    {
      text: 'Product',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    },
    {
      text: 'Brands',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    },
    {
      text: 'Buyers',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    },
    {
      text: 'Suppliers',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    },
    {
      text: 'Assessments',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    },
    {
      text: 'Retailer Docs',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    },
    {
      text: 'Messages',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    },
    {
      text: 'Add Message',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    },
    {
      text: 'Invoices',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    },
    {
      text: 'Shopping Cart',
      templateName: 'default',
      url: '/accounts/edit/' + this.clientId,
    },
    {
      text: 'Change Log',
      templateName: 'default',
      url: '/changeLogs/' + this.clientId,
    }
    ]
    this.menuService.setProperties('', '', [], mainMenu);
  }
}
