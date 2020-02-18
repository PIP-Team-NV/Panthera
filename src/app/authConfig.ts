import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // This is a config file for the angular-oauth2-oidc library. If we plan to use this this config will easily connect to an Identity Server Test that I have created.

  // Url of the Identity Provider
  issuer: 'https://foodchainididentityserver-development.azurewebsites.net',


  showDebugInformation: false,

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  postLogoutRedirectUri: window.location.origin,

  // logoutUrl: window.location.origin,

  // the SPA's id. The SPA is registered with this id at the auth-server
  clientId: 'implicitCli',
  // clientId: 'ro.client',
  dummyClientSecret: 'secret',

  // set the scope for the permissions the client should request
  scope: 'accountBusAPI metadataBusAPI changeLogBusAPI openid profile userData offline_access siteBusAPI',

  // oidc: true
}
