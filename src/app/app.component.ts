import { Component } from '@angular/core';
import { OAuthService, ReceivedTokens } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './authConfig';
import { SecurityService } from './Test Pages/Prototypes/Security/security.service';
import { HttpClient } from '@angular/common/http';
import { StartupService } from 'src/startup.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private startupConfig: StartupService, private oauthService: OAuthService, private securityService: SecurityService) {
    this.configureWithNewConfigApi(this.securityService);
    console.log(this.startupConfig.startupData);
  }

  private configureWithNewConfigApi(secService : SecurityService) {
    if (this.startupConfig.startupData && this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT)
    {
      authConfig.issuer = `https://foodchainididentityserver-${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()}.azurewebsites.net`;
      console.log(`${this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT.toLowerCase()} Issuer Used`)
      if (this.startupConfig.startupData.ASPNETCORE_ENVIRONMENT == "Production")
      {
        console.log("Production Issuer Used")
        authConfig.issuer = 'https://foodchainididentityserver.azurewebsites.net';
      }
    }
      
    this.oauthService.configure(authConfig); 
    this.oauthService.setStorage(localStorage);   
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    // If the user is already logged in don't relog in.
    if (!this.oauthService.hasValidIdToken())
    {
      this.oauthService.loadDiscoveryDocumentAndLogin({ 
        onTokenReceived: function() {
          secService.onTokenReceived();
        }
      });
    }
    else
    {
      this.oauthService.loadDiscoveryDocument();
    }
  }
}
