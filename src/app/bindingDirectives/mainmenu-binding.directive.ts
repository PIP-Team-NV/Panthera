import { Directive, OnInit } from '@angular/core';
import { MenuService } from 'fcid-menu-library';
import { fcidMenuItem } from 'fcid-menu-library/menu-item-datatype';

@Directive({
  selector: '[fcidMainmenuBinding]',
  providers: [MenuService]
})
export class MainmenuBindingDirective implements OnInit {

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.setProperties('', '', [], this.mainMenu)
  }

  mainMenu: fcidMenuItem[] = [{
    text: 'inSYTE2',
    templateName: 'default',
    url:'',
    items:[{
      text: 'Dashboard',
      templateName: 'default',
      icon: 'form-element',
      url:'',
    },
    {
      text: 'Clients',
      templateName: 'default',
      icon: 'user',
      url:'accounts',
    },
    {
      text: 'Sites',
      templateName: 'default',
      icon: 'columns',
      url:'sites',
    },
    {
      text: 'Ingredients',
      templateName: 'default',
      icon: 'ungroup',
      url:'',
    },
    {
      text: 'Products',
      templateName: 'default',
      icon: 'group',
      url:'',
    },
    {
      text: 'Brands',
      templateName: 'default',
      icon: 'drag-and-drop',
      url:'',
    },
    {
      text: 'Assessment',
      templateName: 'default',
      icon: 'more-vertical',
      url:'',
    },
    {
      text: 'Documents',
      templateName: 'default',
      icon: 'track-changes',
      url:'',
    },
    {
      text: 'Messages',
      templateName: 'default',
      icon: 'textbox',
      url:'',
    },
    {
      text: 'Invoices',
      templateName: 'default',
      icon: 'shopping-cart',
      url:'',
    },
  ]
  },{
    text: 'Search inSYTE2',
    templateName: 'default',
    url:'',
  },
  {
    text: 'INS Admin',
    templateName: 'default',
    url:'',
  },
  {
    text: 'Test Page',
    templateName: 'default',
    url:'testpage',
  },
  {
    text: 'Test Field Template',
    templateName: 'default',
    url:'testfiledtemp',
  }
]
}
