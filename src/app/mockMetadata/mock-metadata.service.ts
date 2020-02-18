//import { mockData } from './mock-metadata.service';
import { Injectable } from '@angular/core';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { shareReplay, map, catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { MetadataServiceService } from '../services/metadata-service.service';

@Injectable({
	providedIn: 'root'
})
export class MockMetadataService extends BehaviorSubject<FcidMetaDataModel[]>{

	private subject$: Observable<FcidMetadata[]>;
	private subjectData$: Observable<FcidMetaDataModel[]>;
	private cache$: Observable<Object>;
	_doamin: string;
	_context: string;
	_isThisTest: boolean = false;
	_serviceUrl: string = 'https://foodchainidbusinessmetadata2018091812145-development.azurewebsites.net/';
	_apiVersion: string = 'api/v1/';

	//mockData: object[];

	constructor(
		private http: HttpClient,
		private oauthService: OAuthService
	) {
		super(null);
	}

	public setProperties(domain: string, context: string, isThisTest: boolean = false, serviceUrl: string, apiVersion: string) {
		this._doamin = domain;
		this._context = context;
		this._isThisTest = isThisTest;
		this._serviceUrl = serviceUrl;
		this._apiVersion = apiVersion;
	}
	public query(mockData) {
		// this.fetchMetadata(this._doamin, this._context, mockData)
		// 	.subscribe(x => super.next(x));
	}

	public getQueryData(mockData) {
		debugger;
		this.getMetaData(mockData)
			.subscribe(x => super.next(x));
	}

	private getMetaData(mockData): Observable<FcidMetaDataModel[]> {
		debugger;
		if (this._isThisTest) {
			this.cache$ = this.getFcidMetaDataSrc(mockData).pipe(shareReplay(1));
			this.subjectData$ = this.cache$.pipe(
				map((res: object[]) => {
					let result: FcidMetaDataModel[] = [];
					let metaParameters : controlparamsModel[] = []
					res.forEach(element => {
						let fcidmetada = <FcidMetaDataModel>{
							routeId: element['routeId'],
  							apiId: element['apiId'],
  							fieldCode: element['fieldCode'],
  							metaType: element['metaType'],
  							metas: []
						};
						for (let entry of element['metas']) {
							let controlparamsData = <controlparamsModel>{
								metaId: entry['metaId'],
								ftCode: entry['ftCode'],
								label: entry['label'],
								toolTip: entry['toolTip'],
								descr: entry['descr'],
								MetaParms: [],
								List: []
							};
							
							for(let meta of entry['MetaParms']){
								controlparamsData.MetaParms.push(meta);
							}

							for(let list of entry['List']){
								controlparamsData.List.push(list);
							}

							fcidmetada.metas.push(controlparamsData);
						}
						result.push(fcidmetada);
					});
					return result;
				}),
				catchError(this.handleError)
			)
		} 
		return this.subjectData$;
	}

	private fetchMetadata(domain: string, context: string, mockData): Observable<FcidMetadata[]> {
		debugger;
		if (this._isThisTest) {
			if (!this.cache$) {
				this.cache$ = this.getDataSrc(domain, context, mockData).pipe(shareReplay(1));
			}
			//this.cache$ = this.getDataSrc(domain, context, mockData).pipe(shareReplay(1));
			this.subject$ = this.cache$.pipe(
				map((res: object[]) => {
					let result: FcidMetadata[] = [];
					res.forEach(element => {

						let fcidmetada = <FcidMetadata>{
							metadataId: element['metadataId'],
							itemName: element['itemName'],
							itemType: element['itemType'],
							options: []
						};
						for (let entry of Object.entries(element['options'])) {
							let controlparameter = <ControlParameter>{
								key: entry[0],
								value: []
							}
							let controlparam = <ControlParam>{
								key: entry[0],
								value: []
							}
							let optionValues = entry[1];
							let listValues = entry[0];
							if (listValues == "List") {
								for (let ent of Object.entries(optionValues['metadataParamValue'])) {
									let valueAdapter = ent[1];
									let klp = <KLP>{
										key: ent[0],
										value: {
											sort: valueAdapter['item1'],
											val: valueAdapter['item2'],
											val2: valueAdapter['item3'],
											val3: valueAdapter['item4'],
											val4: valueAdapter['item5'],
											val5: valueAdapter['item6']
										}
									}
									controlparam.value.push(klp);
								}
							} else {
								for (let ent of Object.entries(optionValues['metadataParamValue'])) {
									let valueAdapter = ent[1];
									let klp = <KLP>{
										key: ent[0],
										value: {
											sort: valueAdapter['item1'],
											val: valueAdapter['item2'],
											val2: valueAdapter['item3'],
											val3: valueAdapter['item4'],
											val4: valueAdapter['item5'],
											val5: valueAdapter['item6']
										}
									}
									controlparam.value.push(klp);
								}
							}
							fcidmetada.options.push(controlparam);
						}
						result.push(fcidmetada);
					});
					return result;
				}),
				catchError(this.handleError)
			)
		} else {
			if (!this.cache$) {
				this.cache$ = this.getDataSrc(domain, context, mockData).pipe(shareReplay(1));
			}
			//this.cache$ = this.getDataSrc(domain, context, mockData).pipe(shareReplay(1));
			this.subject$ = this.cache$.pipe(
				map((res: object[]) => {
					let result: FcidMetadata[] = [];
					res.forEach(element => {

						let fcidmetada = <FcidMetadata>{
							metadataId: element['metadataId'],
							itemName: element['itemName'],
							itemType: element['itemType'],
							options: []
						};
						for (let entry of Object.entries(element['options'])) {
							let controlparameter = <ControlParameter>{
								key: entry[0],
								value: []
							}
							let controlparam = <ControlParam>{
								key: entry[0],
								value: []
							}
							let optionValues = entry[1];
							let listValues = entry[0];
							if (listValues == "List") {
								for (let ent of Object.entries(optionValues['metadataParamValue'])) {
									let valueAdapter = ent[1];
									let klp = <KLP>{
										key: ent[0],
										value: {
											sort: valueAdapter['item1'],
											val: valueAdapter['item2'],
											val2: valueAdapter['item3'],
											val3: valueAdapter['item4'],
											val4: valueAdapter['item5'],
											val5: valueAdapter['item6']
										}
									}
									controlparam.value.push(klp);
								}
							} else {
								for (let ent of Object.entries(optionValues['metadataParamValue'])) {
									let valueAdapter = ent[1];
									let klp = <KLP>{
										key: ent[0],
										value: {
											sort: valueAdapter['item1'],
											val: valueAdapter['item2']
										}
									}
									controlparam.value.push(klp);
								}
							}
							fcidmetada.options.push(controlparam);
						}
						result.push(fcidmetada);
					});
					return result;
				}),
				catchError(this.handleError)
			)
		}

		return this.subject$;
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

	public getMetadataByField(result: FcidMetaDataModel[], filed: string): any {
		if (!result) return;
		var metadata = result.find(x => x.fieldCode === filed);
		return metadata ? metadata : null
	}

	public static getList(result: any) {
		if (!result) return;
		var option = result ? result.options.find(i => i.key === 'List') : null;
		return option ? option.value : null;
	}
	public getUIHint(result: FcidMetaDataModel[], filed: string): any {
		debugger;
		if (!result) return;
		var metadata = result.find(x => x.fieldCode === filed);
		var ftCode = metadata ? metadata.metas.find(i => i.ftCode === i.ftCode) : null;
		return ftCode.ftCode ? ftCode.ftCode : null
	}

	public getFieldAttributes(result: FcidMetaDataModel[], field: string): any {
		if (!result) return;
		var metadata = result.find(x => x.fieldCode === field);
		return metadata.metas;

	}


	public getFieldAttribute(result: FcidMetadata[], field: string, attribute: string): any {
		if (!result) return;
		var metadata = result.find(x => x.itemName === field);
		var fieldAttribute = metadata ? metadata.options.find(i => i.key === attribute) : null;
		return fieldAttribute;
	}

	public getFieldAttributeParam(result: FcidMetaDataModel[], field: string): any {
		debugger;
		if (!result) return;
		var metadata = result.find(x => x.fieldCode === field);
		var fieldAttribute = metadata ? metadata.metas.find(i => i.label === i.label) : null;
		//var attributeParam = fieldAttribute ? fieldAttribute.value.find(p => p.key === param) : null
		return fieldAttribute.label ? fieldAttribute.label : null

	}

	public getFieldAttributeLabel(result: FcidMetaDataModel[], field: string): any {
		debugger;
		if (!result) return;
		var metadata = result.find(x => x.fieldCode === field);
		var fieldAttribute = metadata ? metadata.metas.find(i => i.label === i.label) : null;
		//var attributeParam = fieldAttribute ? fieldAttribute.value.find(p => p.key === param) : null
		return fieldAttribute.label ? fieldAttribute.label : null
	}

	public getFieldAttributeHelp(result: FcidMetaDataModel[], field: string): any {
		debugger;
		if (!result) return;
		var metadata = result.find(x => x.fieldCode === field);
		var fieldAttribute = metadata ? metadata.metas.find(i => i.label === i.label) : null;
		//var attributeParam = fieldAttribute ? fieldAttribute.value.find(p => p.key === param) : null
		return fieldAttribute.toolTip ? fieldAttribute.toolTip : null
	}

	public getList(result: FcidMetadata[], filed: string) {
		if (!result) return;
		var metadata = result.find(x => x.itemName === filed)
		var option = metadata ? metadata.options.find(i => i.key === 'List') : null;
		return option ? option.value : null;
	}

	private getDataSrc(domain: string, context: string, mockData: any[]) {
		debugger;
		let token = this.oauthService.getAccessToken();
		if (this._isThisTest) {
			return of(mockData);
		}
		else {
			var headers = new HttpHeaders({
				"Authorization": "Bearer " + token,
				"Access-Control-Allow-Origin": this._serviceUrl,
			});
			let params = new HttpParams().set('domain', String(domain)).set('context', String(context));
			const url = `${this._serviceUrl}${this._apiVersion}Metadatas`;
			return this.http.get(url, { params, headers });
		}
	}

	private getFcidMetaDataSrc(mockData: any[]) {
		debugger;
		this._isThisTest = true
		let token = this.oauthService.getAccessToken();
		if (this._isThisTest) {
			return of(mockData);
		}
		else {
			var headers = new HttpHeaders({
				"Authorization": "Bearer " + token,
				"Access-Control-Allow-Origin": this._serviceUrl,
			});
			let params = new HttpParams();
			const url = `${this._serviceUrl}${this._apiVersion}Metadatas`;
			return this.http.get(url, { params, headers });
		}
	}
}

export interface FcidMetadata {
	metadataId: number,
	itemName: string;
	itemType: string;
	options?: ControlParam[];
}

export interface FcidMetaDataModel {
	routeId: number,
	apiId: number,
	fieldCode: string,
	metaType: string,
	metas?: controlparamsModel[]
}

export interface controlparamsModel {
	metaId: number,
	ftCode: string,
	label: string,
	toolTip: string,
	descr: string,
	MetaParms?: metaParms[],
	List?: listParms[]
}

export interface listParms{
	Id: number,
	DisplayName: string,
	Visible: boolean,
	Default: string
}

export interface metaParms {
	required: string,
	maxlength: string,
	readonly: string,
	width: string
}

export interface ControlParameter {
	key?: string,
	value: KVP[]
}

export interface ControlParam {
	key?: string,
	value: KLP[]
}

export interface KLP {
	key?: any,
	value?: { sort?: string, val: any, val2: boolean, val3: any, val4: any[] }
}
export interface KVP {
	key?: any,
	value?: { sort?: number, val: any }
}
export interface Items {
	item1?: any,
	item2?: { sort?: number, val: any }
}
export interface lCI {
	coreItemId?: number,
	coreItemValue: any,
	coreItemBool?: boolean,
	coreItemParentId: any,
	coreItemClassCode: any,
	coreItemChild?: any[],
}

export interface CCI {
	item1?: number,
	item2: any,
	item3?: boolean,
	item4: any,
	item5?: any[],
}