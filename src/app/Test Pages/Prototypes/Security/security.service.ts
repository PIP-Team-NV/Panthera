import { Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OAuthService, ReceivedTokens } from 'angular-oauth2-oidc';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  @Output() tokenReceivedEvent : EventEmitter = new EventEmitter();

  private securityPredicates : {key : string, predicate: () => boolean}[] = [];

  constructor(private oauthService: OAuthService) {
    this.addPredicate('admin', () => this.claims.role === "mgr");
    this.addPredicate('basicClient', () => this.claims.role === "cli");
    this.addPredicate('FlexFields', () => this.claims.perm.find(item => item === "FlexFields"));
    this.addPredicate('FlexFieldsAdmin', () => this.claims.perm.find(item => item === "FlexFields") && this.claims.perm.find(item => item === "FlexFieldsAdmin"));
    this.addPredicate('loggedInUser', () => this.isLoggedIn());
    this.addPredicate('Eval4', () => this.claims.perm.find(item => item === "Eval4"));
    this.addPredicate('standerdCSR',()=> this.claims.role=="mgr"||this.claims.role=="csr")
  }

  loggingOut : boolean = false;
  get claims() : any {
    if (this.loggingOut)
      return { perm: [] };
    let claims : any = this.oauthService.getIdentityClaims();
    if (claims)
    {
      if(!claims.perm) 
      {
        claims.perm = []
      }
      return claims;
    }
    else
      return { perm: [] };    
  }


  /**
   * This is to simplify adding predicates to the list.
   * @param keyString string key to represent a predicate.
   * @param predicateFunc Predicate function returned by key.
   */
  private addPredicate(keyString : string, predicateFunc: () => boolean)
  {
    this.securityPredicates.push({key: keyString, predicate: predicateFunc});
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  logout() {    
    this.loggingOut = true;
    this.onTokenReceived();

    this.oauthService.logOut();    
    this.loggingOut = false;
  }

  public get givenName() {
    return this.claims.given_name ? this.claims.given_name : '';
  }  

  public get clientId() {
    return this.claims.clientId ? this.claims.clientId : '';
  }  

  /**
   * This method is used by the application to trigger the tokenReceivedEvent which users can subscribe to.
   * 
   * The fcid-visible directive uses this to update its predicate check when the clients user identity has changes (Logging in for example)
   */
  public onTokenReceived() {
    // Notify subscribers that a new token has been received.
    this.tokenReceivedEvent.emit(null);
  }

  /**
   * This method will evaluate a given predicate from the lookup'd key value.
   * @param key Lookup key against the predicateList
   */
  public checkPredicate(key : string)
  {
    if (!this.securityPredicates.find(item => item.key === key))
    {
      return false;
    }

    return this.securityPredicates.find(item => item.key === key).predicate();
  }

  resetPassword(username:string):Observable<string>{
    //TODO: Need to provide a means to achieve a reset password.
    let resetPasswordStatus='' ;
    resetPasswordStatus='email has been sent to reset password.'
  
    return of(resetPasswordStatus);    
  } 
}
