import { MetadataServiceService } from 'src/app/services/metadata-service.service';
import { Component, OnInit, Input, ViewEncapsulation, Inject, forwardRef } from '@angular/core';
import { FileRestrictions, RemoveEvent } from '@progress/kendo-angular-upload';
import { ControlValueAccessor, FormControl, FormControlName, FormGroup, NG_VALUE_ACCESSOR, Validators, FormBuilder } from '@angular/forms';
//import { MetadataLibService, KVP } from '../../Metadata/metadata-lib.service';
//import { ControlMetadata } from '../../Metadata/ControlMetadata';
import { EditService } from './edit_Service/edit.service';
import { Observable } from 'rxjs/Observable';
import { GridDataResult, IsNotNullFilterOperatorComponent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators/map';
import { Product } from './model/product';
import { ControlMetadata, KVP, MetadataLibService } from 'metadata-lib-fcid';
//import { MetadataServiceService } from '../../service/metadata-service.service';


@Component({
  selector: 'fcid-multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultipleFileUploadComponent),
    multi: true
  }
  ]
})
export class MultipleFileUploadComponent implements OnInit, ControlValueAccessor, ControlMetadata {
  @Input() formGroupValue: FormGroup;
  @Input('field')
  public field: string;
  @Input('fieldMetadata')
  public fieldMetadata: any;
  @Input('componentData')
  public componentData = [];
  @Input('gridDisplayData')
  public gridDisplayData = [];
  @Input('gridHistoryData')
  public gridHistoryData = [];
  uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
  public docType: string;
  public update: string;
  public edit: string;
  public delete: string;
  public selectButtonText: string;
  public maxFileSize: number;
  public maxFiles: number;
  public minFileSize: number;
  public btnDeleteFile: boolean = false;
  public btnDeleteRole: string;
  public deleteTooltip: String = "customTooltip";
  public allowEditable: boolean;
  public historyBtnText: String = "History";
  public fileHeaderText: string;
  public descriptionHeaderText: string;
  public dateHeaderText: string;
  public showHistoryBtn: boolean;
  public gridHeaderCol: KVP[];
  public data: KVP[];
  extensions = Array<string>();
  isRemove: boolean;
  restriction: FileRestrictions = {
    allowedExtensions: [],
    maxFileSize: 0,
    minFileSize: 0
  };
  showGrid: boolean = false;
  propagateChange = (_: any) => { };
  _controlValue: any;
  defaultItem: any;
  valRequired: any;
  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public formGroup: FormGroup;
  private editedRowIndex: number;
  @Input() readonly: any;
  @Input() required: any;
  @Input() width: any;
  @Input() public colOneWidth: any;
  @Input() public colTwoWidth: any;
  @Input() public colThreeWidth: any;
  @Input() public colFourWidth: any;
  @Input() public colFiveWidth: any;
  @Input() public gridHeight: any;
  @Input() public height: any;
  /* Use below json for grid in the absence of web service, currenly web service is not available */
  multipleProducts = [];

  constructor(private editService: EditService, private metadataLibService: MetadataLibService, private fb: FormBuilder, private metadataService: MetadataServiceService) {
  }

  public ngOnInit() {
 
    if (this.fieldMetadata != undefined) {
      this.multipleProducts = this.gridDisplayData;
      this.multipleProducts = this.gridHistoryData;
      this.docType = (this.docType) ? this.docType : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'docType');
      if (this.docType) {
        this.extensions = this.docType.split(',');
      }

      let maxFileSize = parseInt((this.maxFileSize) ? this.maxFileSize : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'maxFileSize'));
      this.maxFileSize = maxFileSize ? maxFileSize : 5;
      let minFileSize = parseInt((this.minFileSize) ? this.minFileSize : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'minFileSize'));
      this.minFileSize = minFileSize ? minFileSize : 5;
      let selectButtonText = (this.selectButtonText) ? this.selectButtonText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'selectButtonText');
      this.selectButtonText = selectButtonText ? selectButtonText : "";
      this.btnDeleteFile = (this.btnDeleteFile) ? this.btnDeleteFile : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'allowDeleteFiles') == "true" ? true : false;
      let btnDeleteRole = (this.btnDeleteRole) ? this.btnDeleteRole : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'allowDeleteFileRoles');
      this.btnDeleteRole = btnDeleteRole ? btnDeleteRole : "";
      let deleteTooltip = (this.deleteTooltip) ? this.deleteTooltip : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'deleteTooltip');
      this.deleteTooltip = deleteTooltip ? deleteTooltip : "";
      this.allowEditable = (this.allowEditable) ? this.allowEditable : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'allowEditable') == "true" ? true : false;
      let historyBtnText = (this.historyBtnText) ? this.historyBtnText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'historyButtonText');
      this.historyBtnText = historyBtnText ? historyBtnText : "";
      let edit = (this.edit) ? this.edit : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'editText');
      this.edit = edit ? edit : "";
      let update = (this.update) ? this.update : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'updateText');
      this.update = update ? update : "";
      let deleteText = (this.delete) ? this.delete : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'deleteText');
      this.delete = deleteText ? deleteText : "";
      this.showHistoryBtn = (this.showHistoryBtn) ? this.showHistoryBtn : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'showhistoryGrid') == "true" ? true : false;
      let gridHeaderCol = MetadataLibService.getList(this.fieldMetadata);
      this.gridHeaderCol = gridHeaderCol ? gridHeaderCol : [];
      let fileHeaderText = (this.fileHeaderText) ? this.fileHeaderText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'fileHeaderText');
      this.fileHeaderText = fileHeaderText ? fileHeaderText : "";
      let descriptionHeaderText = (this.descriptionHeaderText) ? this.descriptionHeaderText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'descriptionHeaderText');
      this.descriptionHeaderText = descriptionHeaderText ? descriptionHeaderText : "";
      let dateHeaderText = (this.dateHeaderText) ? this.dateHeaderText : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'dateHeaderText');
      this.dateHeaderText = dateHeaderText ? dateHeaderText : "";
      let maxFiles = parseInt((this.maxFiles) ? this.maxFiles : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'maxFileSize'));
      this.maxFiles = !isNaN(maxFiles) && maxFiles > 0 ? maxFiles : 1;
      this.data = MetadataLibService.getList(this.fieldMetadata) ? MetadataLibService.getList(this.fieldMetadata) : [];
      let Readonly = (this.readonly) ? this.readonly : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'readonly'); //need dynamic value
      try {
        this.readonly = Readonly.toLowerCase() === "true" ? true : false;
      }
      catch (err) {
        this.readonly = false;
      }

      let fileUploadWidth = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'width');
      this.width = fileUploadWidth === "0" || fileUploadWidth === "0px" || fileUploadWidth === null || fileUploadWidth === "0%" ? "" : fileUploadWidth;
      let colOneWidth = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'colOneWidth');
      this.colOneWidth = colOneWidth === "0" || colOneWidth === "0px" || colOneWidth === null || colOneWidth === "0%" ? 90 : colOneWidth;
      let colTwoWidth = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'colTwoWidth');
      this.colTwoWidth = colTwoWidth === "0" || colTwoWidth === "0px" || colTwoWidth === null || colTwoWidth === "0%" ? 120 : colTwoWidth;
      this.required = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'required') == "true" ? true : false;
      let colThreeWidth = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'colThreeWidth');
      this.colThreeWidth = colThreeWidth === "0" || colThreeWidth === "0px" || colThreeWidth === null || colThreeWidth === "0%" ? 150 : colThreeWidth;
      let colFourWidth = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'colFourWidth');
      this.colFourWidth = colFourWidth === "0" || colFourWidth === "0px" || colFourWidth === null || colFourWidth === "0%" ? 100 : colFourWidth;
      let colFiveWidth = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'colFiveWidth');
      this.colFiveWidth = colFiveWidth === "0" || colFiveWidth === "0px" || colFiveWidth === null || colFiveWidth === "0%" ? 100 : colFiveWidth;
      let gridHeight = this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'gridHeight');
      this.gridHeight = gridHeight === "0" || gridHeight === "0px" || gridHeight === null || gridHeight === "0%" ? 400 : gridHeight;
      this.height = parseInt((this.height) ? this.height : this.metadataLibService.getFieldAttributeParam([this.fieldMetadata], this.field, 'UIHint', 'height'));

    }

    if (this.extensions && this.extensions.length > 0) {
      if (this.restriction.allowedExtensions != undefined) {
        const multipleExt = Object.assign([], this.extensions);
        this.restriction.allowedExtensions = multipleExt;
      }
    }
    if (!isNaN(this.maxFileSize) && this.maxFileSize > 0) {
      this.restriction.maxFileSize = this.maxFileSize;
    }
    if (!isNaN(this.minFileSize) && this.minFileSize > 0) {
      this.restriction.minFileSize = this.minFileSize;
    }

    this.view = this.editService.pipe(map(data => process(data, this.gridState)));
    this.editService.read();

  }


  removeEventHandler(e: RemoveEvent) {
    if (!this.isRemove) {
      e.preventDefault();
    }

  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.editService.read();
  }


  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'Name': new FormControl(dataItem.Name),
      'Description': new FormControl(dataItem.Description, Validators.required),
      'Date': new FormControl(dataItem.Date)
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {

    this.multipleProducts[rowIndex].Description = formGroup.value.Description;
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    if (this.btnDeleteFile) {
      var index = this.multipleProducts.indexOf(dataItem);
      if (index > -1) {
        this.multipleProducts.splice(index, 1);
      }
      //this.editService.remove(dataItem);
    }
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  openShowHistory() {
    this.showGrid = !this.showGrid;
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
