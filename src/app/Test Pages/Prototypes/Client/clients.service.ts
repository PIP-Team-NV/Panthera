import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { process, State, distinct, filterBy, orderBy } from '@progress/kendo-data-query';
import { throwError, of, observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MessageService } from '../../../services/message.service';
import { state } from '@angular/animations';
import { OAuthService } from 'angular-oauth2-oidc';
import { StartupService } from 'src/startup.service';
import { ClientModule } from './client/client.module'

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends BehaviorSubject<GridDataResult> {
  public loading: boolean = false;
  private gridView: Observable<GridDataResult>;
  private total: number = 0;
  private client: Observable<any>;

  private _BASE_URL: string;
  private get BASE_URL() {
    if (this._BASE_URL && this._BASE_URL != "") {
      console.log("Preset: ", this._BASE_URL)
      return this._BASE_URL;
    }


    if (this.startupConfig.startupData && this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT) {
      // this._BASE_URL = `https://foodchainidbusinessaccount20180806032748.azurewebsites.net/`;
      this._BASE_URL = `https://foodchainidbusinessaccount-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net/`;

      if (this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT == "Production") {
        this._BASE_URL = `https://foodchainidbusinessaccount20180806032748.azurewebsites.net/`;
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
  ) {
    super(null);
  }

  public query(state: State): void {
    if ((state.skip == undefined || state.skip == 0) && (state.filter == undefined && state.sort == undefined)) {
      this.fetch(state, 11, 11)
        .subscribe(x => super.next(x));

    }
    else {
      this.slice(state)
        .subscribe(x => super.next(x));
    }

  }
  // fetchClient returns single client
  public fetchClient(id: any): Observable<ClientModule> {

    let token = this.oauthService.getAccessToken();
    var headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Access-Control-Allow-Origin": this.BASE_URL
    });
    const url = `${this.BASE_URL}${this.API_Version}Accounts/${id}`;
    this.client = this.http.get(url, { headers })
      .pipe(
        map(response => <ClientModule>(response)),
        catchError(this.handleError),
        tap(() => this.loading = false)
      )

    return this.client;
  }

  public insertClient(clientToInsert: any): Observable<number> {

    let insertStatus: any;
    let token = this.oauthService.getAccessToken();
    var headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Access-Control-Allow-Origin": this.BASE_URL,
    });
    const url = `${this.BASE_URL}${this.API_Version}Accounts`;
    //  const url = `https://localhost:44306/api/v1/Accounts`;
    insertStatus = this.http.put(url, { clientToInsert }, { headers })
      .pipe(
        map(response => <number>(response)),
        catchError(this.handleError),
        tap(() => this.loading = false)
      )

    return insertStatus;
  }
  public updateClient(id: number, originalClient: ClientModule, updateClient: ClientModule): Observable<ClientModule> {

    let updatedClient: any;
    let token = this.oauthService.getAccessToken();
    var headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Access-Control-Allow-Origin": this.BASE_URL,
    });
    let params = new HttpParams().set('id', String(id));
    const url = `${this.BASE_URL}${this.API_Version}Accounts/${id}`;
    //const url = `https://localhost:44306/api/v1/Accounts/${id}`;

    updatedClient = this.http.put(url, { originalClient, updateClient }, { params, headers })
      .pipe(
        map(response => <ClientModule>(response)),
        catchError(this.handleError),
        tap(() => this.loading = false)
      )

    return updatedClient;
  }


  protected fetch(state: State, clientId: number, repId: number): Observable<GridDataResult> {
    let token = this.oauthService.getAccessToken();
    var headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Access-Control-Allow-Origin": this.BASE_URL,

    });
    let params = new HttpParams().set('clientId', String(clientId)).set('repId', String(repId))
    const url = `${this.BASE_URL}${this.API_Version}Accounts`;
    this.loading = true;

    this.gridView = this.http.get(url, { params, headers })
      .pipe(
        map(response => (<GridDataResult>{
          data: response['data'],
          total: response['data'].length,

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
