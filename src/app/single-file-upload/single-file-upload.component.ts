import { MetadataServiceService } from 'src/app/services/metadata-service.service';
import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, Validators, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileRestrictions, RemoveEvent } from '@progress/kendo-angular-upload';
//import { MetadataLibService, KVP } from '../../Metadata/metadata-lib.service';
//import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { Surface } from '@progress/kendo-drawing';
import { ControlMetadata, KVP, MetadataLibService } from 'metadata-lib-fcid';
//import { MetadataServiceService } from '../../service/metadata-service.service';


@Component({
  selector: 'fcid-single-file-upload',
  templateUrl: './single-file-upload.component.html',
  styleUrls: ['./single-file-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SingleFileUploadComponent),
    multi: true
  }
  ]
})
export class SingleFileUploadComponent implements OnInit, ControlValueAccessor, ControlMetadata {

  @Input() formGroupValue: FormGroup;
  @Input('field')
  public field: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  @Input('gridDisplayData')
  public gridDisplayData = [];
  uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
  public docType: string;
  public selectButtonText: string;
  public maxFileSize: number = 0;
  public minFileSize: number = 0;
  public btnDeleteFile: boolean = false;
  public btnDeleteRole: string;
  public fileHeaderText: string;
  public descriptionHeaderText: string;
  public dateHeaderText: string;
  public historyBtnText: string = "History";
  public thumbnail: string;
  public showHistoryBtn: boolean;
  public imgSrc: string;
  extensions: Array<string> = [];
  isRemove: boolean;
  restriction: FileRestrictions = {
    allowedExtensions: [],
    maxFileSize: 0,
    minFileSize: 0
  };
  showGrid: boolean = false;
  propagateChange = (_: any) => { };
  @Input() readonly: any;
  @Input() required: any;
  @Input() height: any;
  isReadonly: any;
  _controlValue: Array<number>;
  defaultItem: any;
  public data: KVP[];
  public content: string;
  public offset: any;
  valRequired: any;
  public show: boolean = false;
  public popupAlign: any = {
    horizontal: 'center',
    vertical: 'bottom'
  };

  /* Use below json for grid in the absence of web service, currenly web service is not available */
  gridData = [];

  public myForm: FormGroup;
  constructor(private metadataLibService: MetadataLibService, private metadataService: MetadataServiceService) { }

  ngOnInit() {
    if (this.fieldMetadata != undefined) {
      this.docType = (this.docType) ? this.docType : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'docType');
      if (this.docType) {
        this.extensions = this.docType.split(',');
      }
      this.maxFileSize = parseInt((this.maxFileSize) ? this.maxFileSize : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'maxFileSize'));
      this.minFileSize = parseInt((this.minFileSize) ? this.minFileSize : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'minFileSize'));
      let selectButtonText = (this.selectButtonText) ? this.selectButtonText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'selectButtonText');
      this.selectButtonText = selectButtonText ? selectButtonText : "";
      let thumbnail = (this.thumbnail) ? this.thumbnail : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'thumbnail');
      this.thumbnail = thumbnail ? thumbnail : "";
      let imgSrc = (this.imgSrc) ? this.imgSrc : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'imgSrc');
      this.imgSrc = imgSrc ? imgSrc : "";
      this.btnDeleteFile = (this.btnDeleteFile) ? this.btnDeleteFile : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'allowDeleteFiles') == "true" ? true : false;
      let btnDeleteRole = (this.btnDeleteRole) ? this.btnDeleteRole : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'allowDeleteFileRoles');
      this.btnDeleteRole = btnDeleteRole ? btnDeleteRole : "";
      let historyBtnText = (this.historyBtnText) ? this.historyBtnText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'historyButtonText');
      this.historyBtnText = historyBtnText ? historyBtnText : "";
      let fileHeaderText = (this.fileHeaderText) ? this.fileHeaderText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'fileHeaderText');
      this.fileHeaderText = fileHeaderText ? fileHeaderText : "";
      let descriptionHeaderText = (this.descriptionHeaderText) ? this.descriptionHeaderText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'descriptionHeaderText');
      this.descriptionHeaderText = descriptionHeaderText ? descriptionHeaderText : "";
      let dateHeaderText = (this.dateHeaderText) ? this.dateHeaderText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'dateHeaderText');
      this.dateHeaderText = dateHeaderText ? dateHeaderText : "";
      this.showHistoryBtn = (this.showHistoryBtn) ? this.showHistoryBtn : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'showhistoryGrid') == "true" ? true : false;
      this.data = MetadataLibService.getList(this.fieldMetadata) ? MetadataLibService.getList(this.fieldMetadata) : [];
      this.height = parseInt((this.height) ? this.height : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'height'));
      this.required = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'required') == "true" ? true : false;
    }
    if (this.extensions && this.extensions.length > 0) {
      this.restriction.allowedExtensions = this.extensions;
    }
    if (!isNaN(this.maxFileSize) && this.maxFileSize > 0) {
      this.restriction.maxFileSize = this.maxFileSize;
    }
    if (!isNaN(this.minFileSize) && this.minFileSize > 0) {
      this.restriction.minFileSize = this.minFileSize;
    }

    this.gridData = this.gridDisplayData;
  }

  openShowHistory() {
    this.showGrid = !this.showGrid;
  }

  removeEventHandler(e: RemoveEvent) {
    if (this.btnDeleteFile || this.btnDeleteRole) {
      if (!this.isRemove) {
        e.preventDefault();
      }
    }
  }

  get controlValue() {
    return this._controlValue;
  }

  set controlValue(val: Array<number>) {
    if (val == undefined) {
      this._controlValue = this.defaultItem;
    } else {
      this._controlValue = val;
    }
    this.propagateChange(this._controlValue);
  }

  onChange(value) {
    this.controlValue = value;
  }

  public selectedItem() {
    return this.controlValue;
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.controlValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched() { }


  public getMetadata() {

  }

}
