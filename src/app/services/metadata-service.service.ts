import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class MetadataServiceService {

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      console.log(data);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/api/metadata.json");
  }

  public getCascadeJSON(): Observable<any> {
    return this.http.get("./assets/api/cascade.json");
  }

  public getSingleFileJSON(): Observable<any> {
    return this.http.get("./assets/api/singleFile.json");
  }

  public getFlyoutFileJSON(): Observable<any> {
    return this.http.get("./assets/api/flyout.json");
  }

  public getSiteEditJSON(): Observable<any> {
    return this.http.get("./assets/api/siteEdit.json");
  }

  public getClientEditJSON(): Observable<any> {
    return this.http.get("./assets/api/clientEdit.json");
  }

  public getTestJSON(): Observable<any> {
    return this.http.get("./assets/api/TestJson.json");
  }
}
