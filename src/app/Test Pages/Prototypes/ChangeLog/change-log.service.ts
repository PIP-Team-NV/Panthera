import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { process, State, distinct, filterBy } from '@progress/kendo-data-query';
import { throwError, of, observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MessageService } from '../../../services/message.service';
import { state } from '@angular/animations';
import { OAuthService } from 'angular-oauth2-oidc';

import { StartupService } from 'src/startup.service';
import { ChangeLogModel } from './change-log-model';

@Injectable()
export class ChangeLogService extends BehaviorSubject<GridDataResult>{
  public loading: boolean = false;
  private gridView: Observable<GridDataResult>;
  private total: number = 0;
  public claimClientId: number;

  private changeLogData: Observable<ChangeLogModel[]>;


  private _BASE_URL: string;
  private get BASE_URL() {
    if (this._BASE_URL && this._BASE_URL != "") {
      return this._BASE_URL;
    }


    if (this.startupConfig.startupData && this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT) {
      // This url won't exactly match production.
      this._BASE_URL = `https://foodchainidbusinesschangelog-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net/`;

      if (this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT == "Production") {
        this._BASE_URL = `https://foodchainidbusinesschangelog20181011114840.azurewebsites.net/`;
      }
    }
    return this._BASE_URL;
  }

  private API_Version = 'api/v1/'

  constructor(
    private startupConfig: StartupService,
    private http: HttpClient,
    private messageService: MessageService,
    private oauthService: OAuthService) {
    super(null);
  }

  public query(state: State): void {
    // this.claimClientId=4296;
    if ((state.skip == undefined || state.skip == 0) && (state.filter == undefined)) {
      this.fetch(state)
        .subscribe(x => super.next(x));

    }
    else {
      this.slice(state)
        .subscribe(x => super.next(x));
    }

  }

  // fetchClient returns single client
  public fetchChanges(): Observable<ChangeLogModel[]> {
    if (this.changeLogData !== undefined) {
      return this.changeLogData;
    }


    var headers = new HttpHeaders({
      "Authorization": "Bearer " + this.oauthService.getAccessToken(),
      "Access-Control-Allow-Origin": this.BASE_URL
    });
    //this.claimClientId=4296;
    let params = new HttpParams();
    this.loading = true;

    // this.gridView = this.http.get(url)
    this.changeLogData = this.http.get(this.url, { params, headers })
      .pipe(
        map(response => response as ChangeLogModel[]),
        catchError(this.handleError),
        tap(() => this.loading = false)
      )

    return this.changeLogData;
  }

  protected get url() {
    const url = `${this.BASE_URL}${this.API_Version}ChangeLogs/clients/` + this.claimClientId;
    //TODO: Add information about domains. add input for domain string.
    return url;
  }

  protected fetch(state: State): Observable<GridDataResult> {

    var headers = new HttpHeaders({
      "Authorization": "Bearer " + this.oauthService.getAccessToken(),
      "Access-Control-Allow-Origin": this.BASE_URL
    });
    //this.claimClientId=4296;
    let params = new HttpParams();
    this.loading = true;

    // this.gridView = this.http.get(url)
    this.gridView = this.http.get(this.url, { params, headers })
      .pipe(


        map(response => (<GridDataResult>{
          // data: response['data'],
          // total: response['data'].length,
          data: response==null?[]: response
       
        })),

        catchError(this.handleError),
        tap(() => this.loading = false)
      );
    return this.slice(state);
  }


  protected slice(state: State): Observable<GridDataResult> {
    if ((state.filter) && (state.skip == 0)) {
      this.gridView = this.gridView.pipe(
        map(response => (<GridDataResult>{
              
          data: filterBy(response['data'], state.filter),
          total: filterBy(response['data'], state.filter).length,
          // data: filterBy(response, state.filter),
          // total: filterBy(response, state.filter).length,
                

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


