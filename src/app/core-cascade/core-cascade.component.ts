import { Component, OnInit, Input, Renderer2, ChangeDetectorRef, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { ControlMetadata, MetadataLibService } from 'metadata-lib-fcid';
import { TabStripComponent } from '@progress/kendo-angular-layout';
import { Offset } from '@progress/kendo-angular-popup';
import { MetadataServiceService } from '../services/metadata-service.service';
//import { MetadataLibService } from '../../Metadata/metadata-lib.service';
//import { MetadataServiceService } from '../../service/metadata-service.service';

@Component({
  selector: 'fcid-core-cascade',
  templateUrl: './core-cascade.component.html',
  styleUrls: ['./core-cascade.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CoreCascadeComponent),
    multi: true
  },
  { provide: NG_VALIDATORS, useExisting: forwardRef(() => CoreCascadeComponent), multi: true }
  ]
})

export class CoreCascadeComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  @Input('field') public field: string;
  @Input('fieldData') public fieldData: string;
  @Input('fieldMetadata') public fieldMetadata: any;
  @Input('fieldDataValue') fieldDataValue = [];
  @Input('itemsSearch') itemsSearch = [];
  @Input() formGroupValue: FormGroup;
  @Input() classCode: string;
  @Input() parentClassNode: string;
  @Input() leafClassNode: string;
  @Input() otherCatColumn: string;
  @Input() otherCatClassCode: string;
  @Input() context: string;
  @Input() browseBtnText: string;
  @Input() serchBtnText: string
  @Input() loadMorebtnText: string;
  @Input() public load_More: string;
  @Input() public selectQuetes: string;
  @Input() public dontSeeQuetes: string;
  @Input() public selectbtntext: string;
  @Input() public classificationText: string;
  @Input() public explanation: string;
  @Input() public submit: string;
  @Input() public matchingText: string;
  @Input() public selectFollowtext: string;
  @Input() public matchingBrowsText: string;
  @Input() public bottomText: string;
  @Input() public findButtonText: string;

  @ViewChild('tabstrip') public tabstrip: TabStripComponent;

  htmlToAdd: any;
  serachtext: any;
  selectedSerachText: any;
  searchSelectedval: string;
  selectedValue: string;
  query: any;
  isEnabled = false;
  leafNode = false;
  isAllow = false;
  ingrLeafNode = false;
  isSearchLeafNode = false;
  isSelectLeafNodeSearch = false;
  isEnabledSearchLoadMore = false;
  isEnabledBrosweLoadMore = false;
  isSelected = false;
  isSelectedLeafNode = false;
  @Input() required: any;
  @Input('orderby') orderby: string = 'asc';
  BreadCumptext: string;
  isSelectEnabled = false;
  defaultItem: any;

  propagateChange = (_: any) => { };
  validateFn: any = () => { };
  public defaultBredCrumbObj: Array<{ item1: number, item2: any, item3: boolean, item4: any, item5: any[] }> = [];
  public categoryArr: Array<{ item1: number, item2: any, item3: boolean, item4: any, item5: any[] }>;
  public dataCategory: Array<{ name: string, Id: number, parentId: number, hasChildItems: boolean, classCode: string }> = [];
  public dataProducts: Array<{ name: string, Id: number, parentId: number, hasChildItems: boolean, classCode: string }> = [];
  public loadDataCategory: Array<{ item1: number, item2: any, item3: boolean, item4: any, item5: any[] }> = [];
  public dataOrders: Array<{ name: string, Id: number, parentId: number, hasChildItems: boolean, classCode: string }> = [];
  public selectedCategory: { name: string, Id: number, parentId: number, hasChildItems: boolean, classCode: string };
  public property = false;
  public items: any[] = [{}];
  public breadCrumbArr: CCI[] = []
  public breadCrumbObj = {
    "item2": "",
    "item4": null,
    "item1": null,
    "item3": false,
    "item5": []
  };
  searchTabArr = [{}];
  searchData = [];
  public checked: number = 3;
  public mode: string = 'absolute';
  public show: boolean = true;
  data: KLP[];
  listCoreItems: CCI[] = [];
  listCoreItemsBackup: CCI[] = [];
  /* Change left or top value to reposition the popup */
  public offset: Offset = { left: 330, top: 2000 };

  constructor(private metadataLibService: MetadataLibService, private metadataService: MetadataServiceService, public renderer: Renderer2, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    // this.metadataService.getFlyoutFileJSON().subscribe(data => {
    //   this.dataCategory = data["dataCategory"];
    //   this.dataProducts = data["dataProducts"];
    //   this.dataOrders = data["dataOrders"];
    //   this.items = data["items"];
    //   this.itemsSearch = data["itemsSearch"];
    //   this.loadDataCategory = data["loadDataCategory"];
    //   this.defaultBredCrumbObj = data["defaultBredCrumbObj"];
    //   //this.formatDataCat(this.dataCategory);
    //   for (let i = 0; i < this.defaultBredCrumbObj.length; i++) {
    //     this.defaultBredCrumbObj[i].item2 = this.defaultBredCrumbObj[i].item2 + ">"
    //   }
    //   this.breadCrumbArr.push(this.defaultBredCrumbObj[0]);
    // });
    if (this.fieldMetadata != undefined) {
      let classCode = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'classCode');
      this.classCode = classCode ? classCode : "";
      let leafClassNode = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'leafClassNode');
      this.leafClassNode = leafClassNode ? leafClassNode : "";
      let parentClassNode = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'parentClassNode');
      this.parentClassNode = parentClassNode ? parentClassNode : "";
      let otherCatColumn = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'otherCatColumn');
      this.otherCatColumn = otherCatColumn ? otherCatColumn : "";
      let otherCatClassCode = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'otherCatClassCode');
      this.otherCatClassCode = otherCatClassCode ? otherCatClassCode : "";
      let context = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'context');
      this.context = context ? context : "";
      let browseBtnText = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'browseBtnText');
      this.browseBtnText = browseBtnText ? browseBtnText : "";
      let findButtonText = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'findButtonText');
      this.findButtonText = findButtonText ? findButtonText : "";
      let serchBtnText = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'searchBtnText');
      this.serchBtnText = serchBtnText ? serchBtnText : "";
      let loadMorebtnText = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'loadMoreBtnText');
      this.loadMorebtnText = loadMorebtnText ? loadMorebtnText : "";
      let load_More = (this.load_More) ? this.load_More : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'loadMore');
      this.load_More = load_More ? load_More : "";
      let selectQuetes = (this.selectQuetes) ? this.selectQuetes : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'selectQuetes');
      this.selectQuetes = selectQuetes ? selectQuetes : "";
      let dontSeeQuetes = (this.dontSeeQuetes) ? this.dontSeeQuetes : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'dontSeeQuetes');
      this.dontSeeQuetes = dontSeeQuetes ? dontSeeQuetes : "";
      let selectbtntext = (this.selectbtntext) ? this.selectbtntext : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'selectBtnText');
      this.selectbtntext = selectbtntext ? selectbtntext : "";
      let classificationText = (this.classificationText) ? this.classificationText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'classificationText');
      this.classificationText = classificationText ? classificationText : "";
      let explanation = (this.explanation) ? this.explanation : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'explanation');
      this.explanation = explanation ? explanation : "";
      let submit = (this.submit) ? this.dontSeeQuetes : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'submit');
      this.submit = submit ? submit : "";
      let matchingText = (this.matchingText) ? this.matchingText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'matchingText');
      this.matchingText = matchingText ? matchingText : "";
      let selectFollowtext = (this.selectFollowtext) ? this.selectFollowtext : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'selectFollowText');
      this.selectFollowtext = selectFollowtext ? selectFollowtext : "";
      let matchingBrowsText = (this.matchingBrowsText) ? this.matchingBrowsText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'matchingBrowseText');
      this.matchingBrowsText = matchingBrowsText ? matchingBrowsText : "";
      let bottomText = (this.bottomText) ? this.bottomText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'bottomText');
      this.bottomText = bottomText ? bottomText : "";
      this.required = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'required') == "true" ? true : false;
      this.data = MetadataLibService.getList(this.fieldMetadata);
      this.defaultBredCrumbObj = this.fieldDataValue;
      this.searchData = this.itemsSearch;
      for (let i = 0; i < this.defaultBredCrumbObj.length; i++) {
        this.defaultBredCrumbObj[i].item2 = this.defaultBredCrumbObj[i].item2 + ">"
      }
      this.breadCrumbArr.push(this.defaultBredCrumbObj[0]);
      this.PrepareData();
    }
  }

  private PrepareData() {
    this.listCoreItems = [];
    if (!this.data) return;
    if (this.orderby === 'asc') {
      this.data.sort((a, b) => {
        if (a.value.sort < b.value.sort) return -1;
        else if (a.value.sort > b.value.sort) return 1;
        else return 0;
      }).forEach(kvp => {
        var item: CCI = { item1: parseInt(kvp.value.sort, 10), item2: kvp.value.val, item3: kvp.value.val2, item4: kvp.value.val3, item5: kvp.value.val4 };
        this.listCoreItems.push(item);
      });
    }
    else {
      this.data.sort((a, b) => {
        if (a.value.sort < b.value.sort) return 1;
        else if (a.value.sort > b.value.sort) return -1;
        else return 0;
      }).forEach(kvp => {
        var item: CCI = { item1: parseInt(kvp.value.sort, 10), item2: kvp.value.val, item3: kvp.value.val2, item4: kvp.value.val3, item5: kvp.value.val4 };
        this.listCoreItems.push(item);
      });
    }
    console.log(this.listCoreItems);
    this.formatDataCat(this.listCoreItems);
    this.listCoreItemsBackup = this.listCoreItems;
  }


  ngAfterViewInit() {

  }

  formIngr(value, ingrName) {
    const breadcrumbValue = Object.assign({}, value);
    breadcrumbValue.item2 = ingrName;
    if (this.isSelected == false) {
      if (breadcrumbValue.item3 == false) {
        if (breadcrumbValue.item2) {
          breadcrumbValue.item2 = breadcrumbValue.item2.replace('...', '');
        }
        this.breadCrumbArr.push(breadcrumbValue);
        this.isSelected = true;
      }
      else {
        if (breadcrumbValue.item2) {
          breadcrumbValue.item2 = breadcrumbValue.item2.replace('...', '');
        }
        this.breadCrumbArr.push(breadcrumbValue);
        this.isSelected = false;
      }
    }
    else {
      if (breadcrumbValue.item3 != false) {
        if (breadcrumbValue.item2) {
          breadcrumbValue.item2 = breadcrumbValue.item2.replace('...', '');
        }
        let lastElm = this.breadCrumbArr[this.breadCrumbArr.length - 1];
        if (lastElm.item3 == false) {
          this.breadCrumbArr.pop();
        }
        this.breadCrumbArr.push(breadcrumbValue);
        this.isSelected = false;
      } else {
        this.breadCrumbArr.pop();
        this.breadCrumbArr.push(breadcrumbValue);
      }
    }
  }

  openPopup() {
    this.isAllow = true;
  }

  formatDataCat(arr) {
    this.isEnabledBrosweLoadMore = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].item3 == true) {
        if (!arr[i].item2.includes("...")) {
          arr[i].item2 = arr[i].item2 + "...";
        }
        this.leafNode = false;
      }
      if (arr[i].item3 != false) {
        this.leafNode = false;
        this.ingrLeafNode = true;
      }
      else {
        if (this.ingrLeafNode == true) {
          this.leafNode = false;
          this.ingrLeafNode = false;
        } else {
          this.leafNode = true;
        }
      }
    }
    this.categoryArr = arr;
    if (this.categoryArr.length >= 5) {
      this.isEnabledBrosweLoadMore = true;
    }
  }

  loadMore() {
    for (let i = 0; i < this.loadDataCategory.length; i++) {
      if (this.loadDataCategory[i].item3 == true) {
        this.loadDataCategory[i].item2 = this.loadDataCategory[i].item2 + "...";
        this.leafNode = false;
      }
      if (this.loadDataCategory[i].item3 == true) {
        this.leafNode = false;
        this.ingrLeafNode = true;
      }
      else {
        if (this.ingrLeafNode == true) {
          this.leafNode = false;
          this.ingrLeafNode = false;
        } else {
          this.leafNode = true;
        }
      }
    }
    for (let i = 0; i < this.loadDataCategory.length; i++) {
      this.categoryArr.push(this.loadDataCategory[i]);
    }
    this.loadDataCategory = [];
  }

  changeText(e) {
    this.serachtext = this.formGroupValue.get(this.fieldData).value;
    if (this.serachtext == e && e != "") {
      this.searchTabArr = this.searchData;
      if (this.searchTabArr.length >= 10) {
        this.isEnabled = true;
        this.isEnabledSearchLoadMore = true
      }
    } else {
      this.searchTabArr = [];
    }
  }

  submitSearchleafval() {
    this.searchSelectedval = this.formGroupValue.get(this.fieldData).value;
  }


  breadcrumbLinkClick(item) {
    let index = this.breadCrumbArr.indexOf(item);
    this.breadCrumbArr.length = index + 1;
    const breadcrumbItem = Object.assign({}, item);
    breadcrumbItem.item2 = breadcrumbItem.item2.replace('>', '');
    this.categoryArr = [];
    this.bindValueToBreadCrumb(breadcrumbItem);
  }

  bindValueToBreadCrumb(item) {
    for (let i = 0; i < this.listCoreItems.length; i++) {
      this.listCoreItems[i].item2 = this.listCoreItems[i].item2.replace('...', '');
    }
    const clonelistCoreItems = Object.assign([], this.listCoreItems);
    var resultObject = this.search(item, clonelistCoreItems);

    if (resultObject != undefined) {
      this.formatDataCat(this.listCoreItems);
    } else {
      for (let i = 0; i < clonelistCoreItems.length; i++) {
        if (clonelistCoreItems[i].item3 == true) {
          for (let j = 0; j < clonelistCoreItems[i].item5.length; j++) {
            clonelistCoreItems[i].item5[j].item2 = clonelistCoreItems[i].item5[j].item2.replace('...', '');
          }
          const clonelevel2Child = Object.assign([], clonelistCoreItems[i].item5);
          var resultObject = this.search(item, clonelevel2Child);
          if (resultObject != undefined) {
            this.formatDataCat(clonelistCoreItems[i].item5);
          } else {
            for (let k = 0; k < clonelevel2Child.length; k++) {
              if (clonelevel2Child[k].item3 == true) {
                for (let l = 0; l < clonelevel2Child[k].item5; l++) {
                  clonelevel2Child[k].item2 = clonelevel2Child[k].item2.replace('...', '');
                }
                const clonelevel3Child = Object.assign([], clonelevel2Child[k].item5);
                var resultObject = this.search(item, clonelevel3Child);
                if (resultObject != undefined) {
                  this.formatDataCat(clonelevel2Child[k].item5);
                }
              }
            }
          }
        }
      }
    }
  }

  search(nameKey, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].item4 === nameKey.item1) {
        return arr[i];
      }
    }
  }


  public onClose(event: any) {
    event.preventDefault();
  }

  public onTabSelect(event) {
  }

  onSelect({ item }) {
    if (item.text == "Search...") {
      this.property = true;
      console.log(item.text);
    }
    else {
      console.log("Wrong Value");
    }
  }

  selectSearchEvent(value) {
    this.selectedSerachText = value;
    this.isSelectLeafNodeSearch = true;
  }

  searchTextNavigate(item) {
    Promise.resolve(null).then(() => this.tabstrip.selectTab(0));
    for (let i = 0; i < this.listCoreItems.length; i++) {
      this.listCoreItems[i].item2 = this.listCoreItems[i].item2.replace('...', '');
    }
    const clonelistCoreItems = Object.assign([], this.listCoreItems);
    var resultObject = this.searchBrowseParent(item, clonelistCoreItems);

    if (resultObject != undefined) {
      this.formatDataCat(this.listCoreItems);
    } else {
      for (let i = 0; i < clonelistCoreItems.length; i++) {
        if (clonelistCoreItems[i].item3 == true) {
          for (let j = 0; j < clonelistCoreItems[i].item5.length; j++) {
            clonelistCoreItems[i].item5[j].item2 = clonelistCoreItems[i].item5[j].item2.replace('...', '');
          }
          const clonelevel2Child = Object.assign([], clonelistCoreItems[i].item5);
          var resultObject = this.searchBrowseParent(item, clonelevel2Child);
          if (resultObject != undefined) {
            this.formatDataCat(clonelistCoreItems[i].item5);
          } else {
            for (let k = 0; k < clonelevel2Child.length; k++) {
              if (clonelevel2Child[k].item3 == true) {
                for (let l = 0; l < clonelevel2Child[k].item5; l++) {
                  clonelevel2Child[k].item2 = clonelevel2Child[k].item2.replace('...', '');
                }
                const clonelevel3Child = Object.assign([], clonelevel2Child[k].item5);
                var resultObject = this.searchBrowseParent(item, clonelevel3Child);
                if (resultObject != undefined) {
                  this.formatDataCat(clonelevel2Child[k].item5);
                }
              }
            }
          }
        }
      }
    }
  }

  searchBrowseParent(nameKey, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].item1 == nameKey.item1) {
        return arr[i];
      }
      else if (arr[i].item1 == nameKey.item4) {
        const objarr = Object.assign({}, arr[i]);
        this.breadCrumbArr = [];
        objarr.item2 = objarr.item2 + ">";
        this.breadCrumbArr.unshift(objarr);
        for (let i = 0; i < this.listCoreItems.length; i++) {
          const objDataCat = Object.assign({}, this.listCoreItems[i]);
          if (objarr.item4 != undefined) {
            if (objDataCat.item1 == objarr.item4) {
              objDataCat.item2 = objDataCat.item2 + ">";
              this.breadCrumbArr.unshift(objDataCat);
              this.breadCrumbArr.unshift(this.defaultBredCrumbObj[0]);
            } else {
              if (this.listCoreItems[i].item3 == true) {
                for (let j = 0; j < this.listCoreItems[i].item5.length; j++) {
                  const objDataPrd = Object.assign({}, this.listCoreItems[i].item5[j]);
                  if (objDataPrd.item1 == objarr.item4) {
                    objDataPrd.item2 = objDataPrd.item2 + ">";
                    this.breadCrumbArr.unshift(objDataPrd);
                  } else {
                    if (this.listCoreItems[i].item5[j].item3 == true) {
                      for (let k = 0; k < this.listCoreItems[i].item5[j].item5.length; k++) {
                        const objDataOrder = Object.assign({}, this.listCoreItems[i].item5[j].item5[k]);
                        if (objDataOrder.item1 == objarr.item4) {
                          objDataOrder.item2 = objDataOrder.item2 + ">";
                          this.breadCrumbArr.unshift(objDataOrder);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  browseSelectEvent(value) {
    this.isSelectedLeafNode = false;
    if (value.item3 == true) {
      this.categoryArr = [];
      this.formatDataCat(value.item5);
      this.formIngr(value, value.item2 + ">");
    }
    else {
      this.formIngr(value, value.item2 + ">>");
      this.isSelectedLeafNode = true;
    }
    this.selectedValue = value.item2;
  }

  selectedBrowseVal() {
    this.formGroupValue.controls[this.field].setValue(this.selectedValue);
    this.isAllow = false;
  }

  selectedSearchVal() {
    this.formGroupValue.controls[this.field].setValue(this.selectedSerachText.item2);
    this.isAllow = false;
  }

  cancleEvent() {
    this.isAllow = !this.isAllow;
  }

  _controlValue: any;

  get controlValue() {
    return this._controlValue;
  }

  set controlValue(val: any) {
    if (val == undefined) {
      this._controlValue = this.defaultItem;
    } else {
      this._controlValue = val;
    }
    this.propagateChange(this._controlValue);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.controlValue = value;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched() {

  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

}


export interface KLP {
	key?: any,
	value?: { sort?: string, val: any, val2: boolean, val3: any,val4: any[] }
}

export interface CCI {
	item1?: number,
	item2: any,
	item3?: boolean,
	item4: any,
	item5?: any[],
}