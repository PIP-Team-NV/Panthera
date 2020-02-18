import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StartupService {

    private _startupData: any;

    private _configApi: string = window.location.origin + "/appSettings.php";

    constructor(private http: HttpClient) { }

    // This is the method you want to call at bootstrap
    // Important: It should return a Promise
    load(): Promise<any> {

        console.log("StartupData: ", this._startupData)
        if (this._startupData !== undefined && this._startupData !== null)
            return Promise.resolve(this._startupData);        

        if (window.location.origin.search("localhost") !== -1)
        {
            var developmentJSON = { "ASPNETCORE_ENVIRONMENT": "Development" };
            this._startupData = developmentJSON;
            return Promise.resolve(developmentJSON);
        }            
        else
        {
            return this.http
            .get(this._configApi)
            .toPromise()
            .then((data: any) => {
                this._startupData = data
            })
            .catch((err: any) => Promise.resolve());
        }

    }

    get startupData(): any {
        return this._startupData;
    }
}