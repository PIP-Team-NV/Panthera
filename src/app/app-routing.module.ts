
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './App Layout/home/home.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthGuard } from './Test Pages/Prototypes/Security/auth.guard';
import { ClientAccountManageComponent } from './Test Pages/Prototypes/Client/client-account-manage/client-account-manage.component';
import { ChangeLogComponent } from './Test Pages/Prototypes/ChangeLog/change-log/change-log.component';

import { ClientAccountInsertComponent } from './Test Pages/Prototypes/Client/client-account-insert/client-account-insert.component';
import { ClientAccountEditComponent } from './Test Pages/Prototypes/Client/client-account-edit/client-account-edit.component';

import { SupplychainSiteInsertComponent } from './Test Pages/Prototypes/Site/supplychain-site-insert/supplychain-site-insert.component';
import { SupplychainSiteEditComponent } from './Test Pages/Prototypes/Site/supplychain-site-edit/supplychain-site-edit.component'
import { SupplychainSiteManageComponent } from './Test Pages/Prototypes/Site/supplychain-site-manage/supplychain-site-manage.component';
import { SupplychainSiteShowComponent } from './Test Pages/Prototypes/Site/supplychain-site-show/supplychain-site-show.component';
import { SiteWithNewFieldTemplateComponent } from './Test Pages/Prototypes/Site/site-with-new-field-template/site-with-new-field-template.component';
import { DashboardComponent } from './Test Pages/Prototypes/dashboard/dashboard.component';
import { TestFieldtemplateComponent } from './Test Pages/Prototypes/test-fieldtemplate/test-fieldtemplate.component';


const appRoutes: Routes = [
  /*All Routes*/
    { path: 'home', component: HomeComponent },
    { path: 'resetPassword', component: PasswordResetComponent },
    { path: 'changeLogs/:id', component: ChangeLogComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, pathMatch: 'full' },
    //{ path: 'accounts/:clientId/sites/insert', component: SupplychainSiteInsertComponent, canActivate: [AuthGuard] },
    
  /*MGR/CSR Only Routs (These will include the clientId in the path to be used on the page)*/
    //{ path: 'accounts', component: ClientAccountManageComponent, canActivate: [AuthGuard] },
    //{ path: 'accounts/:clientId/sites', component: SupplychainSiteShowComponent, canActivate: [AuthGuard] },
    { path: 'accounts/insert', component: ClientAccountInsertComponent, canActivate: [AuthGuard] },
    //{ path: 'accounts/edit/:clientId', component: ClientAccountEditComponent, canActivate: [AuthGuard] },
    //{ path: 'accounts/:clientId/sites/edit/:siteId', component: SupplychainSiteEditComponent, canActivate: [AuthGuard] },
    //{ path: 'accounts/:clientId/sites/edit2/:siteId', component: SiteWithNewFieldTemplateComponent, canActivate: [AuthGuard] },

  /* Client Only Routes (These will get the clientId from IdentityServer)*/
    //{ path: 'accounts/edit', component: ClientAccountEditComponent, canActivate: [AuthGuard] },
    //{ path: 'sites', component: SupplychainSiteManageComponent, canActivate: [AuthGuard] },
    //{ path: 'sites/edit/:siteId', component: SupplychainSiteEditComponent, canActivate: [AuthGuard] },
    { path: 'testpage', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'testfiledtemp', component: TestFieldtemplateComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
