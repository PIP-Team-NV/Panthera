import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { OAuthModule } from 'angular-oauth2-oidc';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditorModule } from '@progress/kendo-angular-editor';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { UploadModule } from '@progress/kendo-angular-upload';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RouterModule } from '@angular/router';
import { PopupModule } from '@progress/kendo-angular-popup';
import { MetadataBindingDirective } from '../Metadata/metadata-binding.directive';

@NgModule({
  imports: [
    CommonModule,
    DropDownsModule,
    GridModule,
    ButtonsModule,
    InputsModule,
    DialogsModule,
    DateInputsModule,
    FormsModule,
    ReactiveFormsModule,
    ToolBarModule,
    DialogsModule,
    TooltipModule,
    EditorModule,
    UploadModule,
    LayoutModule,
    RouterModule,
    PopupModule,
    OAuthModule.forRoot(),
  ],
  declarations: [
    MetadataBindingDirective
  ],
  entryComponents: [],
  exports: [
    MetadataBindingDirective
  ]

})
export class MetadataLibModule { }
