import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, Validators, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileRestrictions, RemoveEvent } from '@progress/kendo-angular-upload';
//import { MetadataServiceService } from '../../service/metadata-service.service';
import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { MetadataLibService, KVP } from '../../Metadata/metadata-lib.service';
import { MockMetadataService } from 'src/app/mockMetadata/mock-metadata.service';

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
  constructor(private mockMetadataService: MockMetadataService) { }

  ngOnInit() {
    if (this.fieldMetadata != undefined) {
      this.docType = (this.docType) ? this.docType : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'docType');
      if (this.docType) {
        this.extensions = this.docType.split(',');
      }
      this.maxFileSize = parseInt((this.maxFileSize) ? this.maxFileSize : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'maxFileSize'));
      this.minFileSize = parseInt((this.minFileSize) ? this.minFileSize : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'minFileSize'));
      let selectButtonText = (this.selectButtonText) ? this.selectButtonText : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'selectButtonText');
      this.selectButtonText = selectButtonText ? selectButtonText : "";
      let thumbnail = (this.thumbnail) ? this.thumbnail : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'thumbnail');
      this.thumbnail = thumbnail ? thumbnail : "";
      let imgSrc = (this.imgSrc) ? this.imgSrc : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'imgSrc');
      this.imgSrc = imgSrc ? imgSrc : "";
      this.btnDeleteFile = (this.btnDeleteFile) ? this.btnDeleteFile : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'allowDeleteFiles') == "true" ? true : false;
      let btnDeleteRole = (this.btnDeleteRole) ? this.btnDeleteRole : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'allowDeleteFileRoles');
      this.btnDeleteRole = btnDeleteRole ? btnDeleteRole : "";
      let historyBtnText = (this.historyBtnText) ? this.historyBtnText : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,  'historyButtonText');
      this.historyBtnText = historyBtnText ? historyBtnText : "";
      let fileHeaderText = (this.fileHeaderText) ? this.fileHeaderText : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,'fileHeaderText');
      this.fileHeaderText = fileHeaderText ? fileHeaderText : "";
      let descriptionHeaderText = (this.descriptionHeaderText) ? this.descriptionHeaderText : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'descriptionHeaderText');
      this.descriptionHeaderText = descriptionHeaderText ? descriptionHeaderText : "";
      let dateHeaderText = (this.dateHeaderText) ? this.dateHeaderText : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,  'dateHeaderText');
      this.dateHeaderText = dateHeaderText ? dateHeaderText : "";
      this.showHistoryBtn = (this.showHistoryBtn) ? this.showHistoryBtn : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field, 'showhistoryGrid') == "true" ? true : false;
      this.data = MockMetadataService.getList(this.fieldMetadata) ? MockMetadataService.getList(this.fieldMetadata) : [];
      this.height = parseInt((this.height) ? this.height : this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,  'height'));
      this.required = this.mockMetadataService.getFieldAttributeParamData([this.fieldMetadata], this.field,  'required') == "true" ? true : false;
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
