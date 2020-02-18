import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, filterBy, orderBy } from '@progress/kendo-data-query';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MessageService } from '../../../services/message.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { StartupService } from 'src/startup.service';
import { SiteModule } from './site/site.module'
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SitesService extends BehaviorSubject<GridDataResult> {
  public loading: boolean = false;
  public clientId: number = 0;
  private gridView: Observable<GridDataResult>;
  private total: number = 0;
  private site: Observable<any>;

  private _BASE_URL: string;
  private get BASE_URL() {
    if (this._BASE_URL && this._BASE_URL != "") {
      console.log("Preset: ", this._BASE_URL)
      return this._BASE_URL;
    }


    if (this.startupConfig.startupData && this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT) {
      this._BASE_URL = `https://foodchainidbusinesssite-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net/`;

      if (this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT == "Production") {
        this._BASE_URL = `https://foodchainidbusinesssite20181114024655.azurewebsites.net/`;
      }
    }

    console.log("Defined: ", this._BASE_URL)
    return this._BASE_URL;
  }

  private API_Version = 'api/v1/'

  constructor(
    private startupConfig: StartupService,
    private http: HttpClient,
    private messageService: MessageService,
    private oauthService: OAuthService,
    private route: ActivatedRoute,
  ) {
    super(null);
  }

  public insertSite(site: SiteModule): Observable<number> {

    let siteId: any;
    let token = this.oauthService.getAccessToken();
    var headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Access-Control-Allow-Origin": this.BASE_URL,
      "Content-Type": "application/x-www-form-urlencoded",
    });

    const url = `${this.BASE_URL}${this.API_Version}Sites/`;
    siteId = this.http.post(url, { site }, { headers })
      .pipe(
        map(response => <number>(response)),
        catchError(this.handleError),
        tap(() => this.loading = false)
      )


    return siteId;
  }

  public updateSite(siteId: any, originalSite: SiteModule, updatedSite: SiteModule): Observable<SiteModule> {

    console.log(originalSite);
    console.log(updatedSite);

    let returnedSite: Observable<SiteModule>;
    let token = this.oauthService.getAccessToken();
    var headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Access-Control-Allow-Origin": this.BASE_URL,
    });
    let params = new HttpParams().set('siteId', siteId);
    const url = `${this.BASE_URL}${this.API_Version}Sites/${siteId}`;
    returnedSite = this.http.put(url, { originalSite, updatedSite }, { headers })
      .pipe(
        map(response => <SiteModule>(response)),
        catchError(this.handleError),
        tap(() => this.loading = false)
      )

    return returnedSite;
  }

  public query(state: State): void {
    if ((state.skip == undefined || state.skip == 0) && (state.filter == undefined && state.sort == undefined)) {
      this.route.paramMap.subscribe(params => this.clientId = + params.get('clientId'))
      this.fetch(state, this.clientId)
        .subscribe(x => super.next(x));
    }
    else {
      this.slice(state)
        .subscribe(x => super.next(x));
    }
  }
  // fetchSite returns single site
  public fetchSite(siteId: any): Observable<SiteModule> {

    let token = this.oauthService.getAccessToken();
    var headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Access-Control-Allow-Origin": this.BASE_URL
    });
    const url = `${this.BASE_URL}${this.API_Version}Sites/${siteId}`;
    this.site = this.http.get(url, { headers })
      .pipe(
        map(response => <SiteModule>(response)),
        catchError(this.handleError),
        tap(() => this.loading = false)
      )

    return this.site;
  }

  protected fetch(state: State, clientId: number): Observable<GridDataResult> {
    let token = this.oauthService.getAccessToken();
    var headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Access-Control-Allow-Origin": this.BASE_URL
    });
    let params = new HttpParams().set('clientId', String(clientId));
    const url = `${this.BASE_URL}${this.API_Version}Sites/`;
    this.loading = true;

    this.gridView = this.http.get(url, { params, headers })
      .pipe(
        map(response => (<GridDataResult>{
          data: response['data']==null? []:response['data'],
         total: response['data']==null?0:response['data'].length,
        })),
        catchError(this.handleError),
        tap(() => this.loading = false)
      );

    
    
    
    return this.slice(state);
  }

  protected slice(state: State): Observable<GridDataResult> {
    if (state.sort) {
      this.gridView = this.gridView.pipe(
        map(response => (<GridDataResult>{
          data: orderBy(response['data'], state.sort),
          total: orderBy(response['data'], state.sort).length,
        }))
      );
    }
    if ((state.filter) && (state.skip == 0)) {
      this.gridView = this.gridView.pipe(
        map(response => (<GridDataResult>{
          data: filterBy(response['data'], state.filter),
          total: filterBy(response['data'], state.filter).length,
        }))
      );
    }
    return this.gridView.pipe(
      map(response => (<GridDataResult>{
        data: response['data'].slice(state.skip, state.skip + state.take),
        total: response['data'].length,
      }))
    );
  }


  private handleError(error: HttpErrorResponse) {
    var errorMsg = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,

      // HTTP Code: 403 - Unauthorized
      if (error.status === 403) {
        errorMsg = "403: User is not authorized to access this service.";
      }
      else {
        console.error(`Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }

    }
    // return an observable with a user-facing error message
    return throwError(errorMsg);
  };

}
