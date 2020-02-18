import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './App Layout/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientsBindingDirective } from './Test Pages/Prototypes/Client/clients-binding.directive';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { UserDebugInfoComponent } from './user-debug-info/user-debug-info.component';
import { BadNavComponent } from './bad-nav/bad-nav.component';
import { FcidVisibleDirective } from './Test Pages/Prototypes/Security/fcid-visible.directive';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
//import { ClientAccountManageComponent } from './Test Pages/Prototypes/Client/client-account-manage/client-account-manage.component';
// import {
//   ColumnBindingDirective, ColumnHeaderControlComponent, ForeignkeyFieldControlComponent, IconFieldControlComponent, ImageFieldControlComponent, CheckboxFilterControlComponent, SwitchFilterControlComponent, FormMultiselectControlComponent,
//   FormDatePickerControlComponent, FormDropdownBindingDirective, FormDatePickerBindingDirective, FormLabelBindingDirective,
//   FormLabelControlComponent, PageHelpControlComponent, DropdownFilterControlComponent, FormDropdownControlComponent, PageHelpBindingDirective, DropdownFilterBindingDirective
//   , ColumnHeaderBindingDirective, IconFieldBindingDirective, ImageFieldBindingDirective, SwitchFilterBindingDirective, FormMultiselectBindingDirective, ForeignkeyFieldBindingDirective, MetadataLibModule
// } from 'fcid-metadata-lib';

import { ChangeLogComponent } from './Test Pages/Prototypes/ChangeLog/change-log/change-log.component';
import { ChangeLogBindingDirective } from './Test Pages/Prototypes/ChangeLog/change-log-binding.directive';


import { StartupService } from './../startup.service';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ClientAccountInsertComponent } from './Test Pages/Prototypes/Client/client-account-insert/client-account-insert.component';
import { ClientAccountEditComponent } from './Test Pages/Prototypes/Client/client-account-edit/client-account-edit.component';
import { SupplychainSiteInsertComponent } from './Test Pages/Prototypes/Site/supplychain-site-insert/supplychain-site-insert.component';
import { MenuModule } from '@progress/kendo-angular-menu';
import { MenuLibraryModule } from 'fcid-menu-library';
import { SupplychainSiteEditComponent } from './Test Pages/Prototypes/Site/supplychain-site-edit/supplychain-site-edit.component';
import { MainmenuBindingDirective } from './bindingDirectives/mainmenu-binding.directive';
import { ContextMenuBindingDirective } from './bindingDirectives/context-menu-binding.directive';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { SupplychainSiteManageComponent } from './Test Pages/Prototypes/Site/supplychain-site-manage/supplychain-site-manage.component';
import { SupplychainSiteShowComponent } from './Test Pages/Prototypes/Site/supplychain-site-show/supplychain-site-show.component';
import { SitesBindingDirective } from './Test Pages/Prototypes/Site/sites-binding.directive';
import { ChangeLogTipComponent } from './Test Pages/Prototypes/ChangeLog/change-log-tip/change-log-tip.component';
import { ChangeLogTipBindingDirective } from './Test Pages/Prototypes/ChangeLog/change-log-tip-binding.directive';
import { SubcontextMenuBindingDirective } from './bindingDirectives/subcontext-menu-binding.directive';
import { ChangeLogPopupListComponent } from './Test Pages/Prototypes/ChangeLog/change-log-popup-list/change-log-popup-list.component';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { ChangeLogDateRangeComponent } from './Test Pages/Prototypes/ChangeLog/change-log-date-range/change-log-date-range.component';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { MultiselectFilterControlComponent } from './multiselect-filter-control/multiselect-filter-control.component';
import { MultiValueCellComponent } from './multi-value-cell/multi-value-cell.component';
import { FormControlComponent } from './form-control/form-control.component';
//import { MultiselectComponent } from './multiselect/multiselect.component';
import { SiteWithNewFieldTemplateComponent } from './Test Pages/Prototypes/Site/site-with-new-field-template/site-with-new-field-template.component';
import { FcidFooterComponent } from './App Layout/fcid-footer/fcid-footer.component';
import { FcidHeaderComponent } from './App Layout/fcid-header/fcid-header.component';
import { AutoCompleteTextboxComponent } from './autoCompleteTextbox/autoCompleteTextbox.component';
//import { TextboxComponent } from './textbox/textbox.component';
//import { DecimalComponent } from './decimal/decimal.component';
//import { IntegerComponent } from './integer/integer.component';
//import { HyperlinkComponent } from './hyperlink/hyperlink.component';
import { ListComponent } from './list/list.component';
import { PopupModule } from '@progress/kendo-angular-popup';
//import { TextAreaComponent } from './text-area/text-area.component';
import { EditorModule } from '@progress/kendo-angular-editor';
//import { UrlComponent } from './url/url.component';
//import { TextEditorComponent } from './text-editor/text-editor.component';
import { UploadModule } from '@progress/kendo-angular-upload';
//import { TextComboComponent } from './text-combo/text-combo.component';
//import { SingleFileUploadComponent } from './single-file-upload/single-file-upload.component';
import { PasswordInputboxComponent } from './password-inputbox/password-inputbox.component';
import { SearchPipe } from './core-cascade/search.pipe';
//import { CascadeComponent } from './cascade/cascade.component';
import { CompareValidatorDirective } from './compare-validator.directive';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropdownComponent } from './dropdown/dropdown.component';
//import { MultipleFileUploadComponent } from './multiple-file-upload/multiple-file-upload.component';
//import { CoreCascadeComponent } from './core-cascade/core-cascade.component';
//import { CoreImageComponent } from './core-image/core-image.component';
//import { DateTimeComponent } from './date-time/date-time.component';
//import { BooleanComponent } from './boolean/boolean.component';
//import { CheckboxComponent } from './checkbox/checkbox.component';
//import { FlyOutComponent } from './fly-out/fly-out.component';
import { FilterListPipe } from './filter-list.pipe';
import { Level1FilterListPipe } from './level1-filter-list.pipe';
import { Level2FilterListPipe } from './level2-filter-list.pipe';
import { AftervaluechangeDirective } from './aftervaluechange.directive';
import { MockMetadaBindingDirective } from './mockMetadata/mock-metada-binding.directive';
import { DashboardComponent } from './Test Pages/Prototypes/dashboard/dashboard.component';
import { ReadonlyValidatorDirective } from './readonly-validator.directive';
//import { MetadataLibModule } from 'metadata-lib-fcid';
//import { FormGroupProviderService } from '../form-group-provider.service';
import { FormGroupProviderDirective } from './form-group-provider.directive'
import { MetadataLibModule } from './metaDataLibModule/metadata-lib.module';
import { TestFieldtemplateComponent } from './Test Pages/Prototypes/test-fieldtemplate/test-fieldtemplate.component';
import { TextboxComponent } from './Field Template/textbox/textbox.component';
//import { RadioButtonComponent } from './radio-button/radio-button.component';
//import { CoreCascadeComponent } from './core-cascade/core-cascade.component';
//import { SingleFileUploadComponent } from 'metadata-lib-fcid/lib/Fcid Componenets/single-file-upload/single-file-upload.component';
// import { MultipleFileUploadComponent } from './multiple-file-upload/multiple-file-upload.component';
// import { SingleFileUploadComponent } from './single-file-upload/single-file-upload.component';
// import { SearchPipe } from './core-cascade/search.pipe';




export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PasswordResetComponent,
    ClientsBindingDirective,
    UserDebugInfoComponent,
    BadNavComponent,
    FcidVisibleDirective,
    //ClientAccountManageComponent,
    // CoreCascadeComponent,
    // MultipleFileUploadComponent,
    // SingleFileUploadComponent,
    // ColumnBindingDirective,
    // ColumnHeaderControlComponent,
    // ForeignkeyFieldControlComponent,
    // IconFieldControlComponent,
    // ImageFieldControlComponent,
    // CheckboxFilterControlComponent,
    // SwitchFilterControlComponent,
    ChangeLogComponent,
    ChangeLogBindingDirective,
    ClientAccountInsertComponent,
    //ClientAccountEditComponent,
    //SupplychainSiteInsertComponent,
    //SupplychainSiteEditComponent,
    MainmenuBindingDirective,
    ContextMenuBindingDirective,
    //SupplychainSiteManageComponent,
    //SupplychainSiteShowComponent,
    SitesBindingDirective,
    ChangeLogTipComponent,
    ChangeLogTipBindingDirective,
    SubcontextMenuBindingDirective,
    ChangeLogPopupListComponent,
    ChangeLogDateRangeComponent,
    // FormDropdownControlComponent,
    // FormMultiselectControlComponent,
    // FormDatePickerControlComponent,
    // FormDropdownBindingDirective,
    // FormDatePickerBindingDirective,
    // FormLabelControlComponent,
    // FormLabelBindingDirective,
    // PageHelpControlComponent,
    // PageHelpBindingDirective,
    // DropdownFilterControlComponent,
    // DropdownFilterBindingDirective,
    // ColumnHeaderBindingDirective,
    // IconFieldBindingDirective,
    // ImageFieldBindingDirective,
    // SwitchFilterBindingDirective,
    // FormMultiselectBindingDirective,
    // ForeignkeyFieldBindingDirective,
    MultiselectFilterControlComponent,
    MultiValueCellComponent,
    FormControlComponent,
    //MultiselectComponent,
    //SiteWithNewFieldTemplateComponent,
    FcidFooterComponent,
    FcidHeaderComponent,
    AutoCompleteTextboxComponent,
    // DecimalComponent,
    // IntegerComponent,
    // HyperlinkComponent,
    ListComponent,
    // TextAreaComponent,
    // UrlComponent,
    // TextEditorComponent,
    // TextComboComponent,
    // SingleFileUploadComponent,
    PasswordInputboxComponent,
    SearchPipe,
    // CascadeComponent,
    CompareValidatorDirective,
    DropdownComponent,
    // MultipleFileUploadComponent,
    // CoreCascadeComponent,
    // CoreImageComponent,
    // DateTimeComponent,
    // BooleanComponent,
    // CheckboxComponent,
    // FlyOutComponent,
    FilterListPipe,
    Level1FilterListPipe,
    Level2FilterListPipe,
    AftervaluechangeDirective,
    MockMetadaBindingDirective,
    ReadonlyValidatorDirective,
    DashboardComponent,
    FormGroupProviderDirective,
    TextboxComponent,
    TestFieldtemplateComponent 
  ],
  // Register the component that will be created dynamically
  entryComponents: [ ChangeLogPopupListComponent, AutoCompleteTextboxComponent, ListComponent, PasswordInputboxComponent, DropdownComponent,TextboxComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ButtonsModule,
    InputsModule,
    OAuthModule.forRoot(),
    DropDownsModule,
    DialogsModule,
    MenuModule,
    MenuLibraryModule,
    DateInputsModule,
    TooltipModule,
    FormsModule,
    PopupModule,
    EditorModule,
    UploadModule,
    LayoutModule,
    MetadataLibModule
  ],
  //exports:[FormMultiselectControlComponent],
  providers: [
    StartupService,
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
