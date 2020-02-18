import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';


@Injectable({
	providedIn: 'root'
})
export class MetadataLibService extends BehaviorSubject<FcidMetadata[]>{
	private subject$: Observable<FcidMetadata[]>;
	private cache$: Observable<Object>;
	_doamin: string;
	_context: string;
	_isThisTest: boolean = false;
	_serviceUrl: string = 'https://foodchainidbusinessmetadata2018091812145-development.azurewebsites.net/';
	_apiVersion: string = 'api/v1/';

	constructor(
		private http: HttpClient,
		private oauthService: OAuthService,
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
	public query() {
		this.fetchMetadata(this._doamin, this._context)
			.subscribe(x => super.next(x));
	}

	private fetchMetadata(domain: string, context: string): Observable<FcidMetadata[]> {
		if (!this.cache$) {
			this.cache$ = this.getDataSrc(domain, context).pipe(shareReplay(1));
		}
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
						let optionValues = entry[1];
						for (let ent of Object.entries(optionValues['metadataParamValue'])) {
							let valueAdapter = ent[1];
							let kvp = <KVP>{
								key: ent[0],
								value: {
									sort: valueAdapter['item1'],
									val: valueAdapter['item2']
								}
							}
							controlparameter.value.push(kvp);
						}
						fcidmetada.options.push(controlparameter);
					}
					result.push(fcidmetada);
				});
				return result;
			}),
			catchError(this.handleError)
		)
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

	public getMetadataByField(result: FcidMetadata[], filed: string): any {
		if (!result) return;
		var metadata = result.find(x => x.itemName === filed);
		return metadata ? metadata : null
	}
	
	public static getList(result: any) {
		if (!result) return;
		var option = result ? result.options.find(i => i.key === 'List') : null;
		return option ? option.value : null;
	}
	public getUIHint(result: FcidMetadata[], filed: string, key: string): any {
		if (!result) return;
		var metadata = result.find(x => x.itemName === filed);
		var option = metadata ? metadata.options.find(i => i.key === 'UIHint') : null;
		var UIHint = option ? option.value.find(d => d.key === key) : null;
		return UIHint ? UIHint.value.val : null
	}

	public getFieldAttributes(result: FcidMetadata[], field: string): any {
		if (!result) return;
		var metadata = result.find(x => x.itemName === field);
		return metadata.options;

	}


	public getFieldAttribute(result: FcidMetadata[], field: string, attribute: string): any {
		if (!result) return;
		var metadata = result.find(x => x.itemName === field);
		var fieldAttribute = metadata ? metadata.options.find(i => i.key === attribute) : null;
		return fieldAttribute;
	}

	public getFieldAttributeParam(result: FcidMetadata[], field: string, attribute: string, param: string): any {
		if (!result) return;
		var metadata = result.find(x => x.itemName === field);
		var fieldAttribute = metadata ? metadata.options.find(i => i.key === attribute) : null;
		var attributeParam = fieldAttribute ? fieldAttribute.value.find(p => p.key === param) : null
		return attributeParam ? attributeParam.value.val : null

	}

	public getList(result: FcidMetadata[], filed: string) {
		if (!result) return;
		var metadata = result.find(x => x.itemName === filed)
		var option = metadata ? metadata.options.find(i => i.key === 'List') : null;
		return option ? option.value : null;
	}

	private getDataSrc(domain: string, context: string) {
		let token = this.oauthService.getAccessToken();
		if (this._isThisTest) {
			return of(newMockData);
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
}

export interface FcidMetadata {
	metadataId: number,
	itemName: string;
	itemType: string;
	options?: ControlParameter[];
}
export interface ControlParameter {
	key?: string,
	value: KVP[]
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
	coreItemValue: any
}

export const mockData: object[] =
	[
		{
			"metadataId": 27,
			"itemName": "id",
			"itemType": "Table",
			"options": {
				"UIHint": {
					"metadataParamValue": {
						"DisplayName": {
							"item1": 0,
							"item2": "Client ID"
						},
						"filter": {
							"item1": 0,
							"item2": "numeric"
						},
						"columnWidth": {
							"item1": 0,
							"item2": "250px"
						}
					}
				}
			}
		},
		{
			"metadataId": 28,
			"itemName": "bPublic",
			"itemType": "Table",
			"options": {
				"UIHint": {
					"metadataParamValue": {
						"DisplayName": {
							"item1": 0,
							"item2": "Public"
						},
						"columnWidth": {
							"item1": 0,
							"item2": "150px"
						},
						"filter": {
							"item1": 0,
							"item2": "boolean"
						},
						"filterControl": {
							"item1": 0,
							"item2": "switch"
						},
						"fieldControl": {
							"item1": 0,
							"item2": "image"
						},
						"image0": {
							"item1": 0,
							"item2": "../assets/images/public_button.png"
						},
						"image1": {
							"item1": 0,
							"item2": "../assets/images/no_public_button.png"
						},
						"Image0ToolTip": {
							"item1": 0,
							"item2": "Image 0 tooltip"
						},
						"image1ToolTip": {
							"item1": 0,
							"item2": "Image 1 tooltip"
						},
						"width": {
							"item1": 0,
							"item2": "16"
						},
						"height": {
							"item1": 0,
							"item2": "16"
						},
						"offLabel": {
							"item1": 0,
							"item2": "NAY"
						},
						"onLabel": {
							"item1": 0,
							"item2": "YAY"
						}
					}
				}
			}
		},
		{
			"metadataId": 29,
			"itemName": "name",
			"itemType": "Table",
			"options": {
				"UIHint": {
					"metadataParamValue": {
						"DisplayName": {
							"item1": 0,
							"item2": "Trading Name"
						},
						"filter": {
							"item1": 0,
							"item2": "text"
						}
					}
				}
			}
		},
		{
			"metadataId": 30,
			"itemName": "bRet",
			"itemType": "Table",
			"options": {
				"UIHint": {
					"metadataParamValue": {
						"DisplayName": {
							"item1": 0,
							"item2": "Retailer"
						},
						"filter": {
							"item1": 0,
							"item2": "boolean"
						},
						"filterControl": {
							"item1": 0,
							"item2": "checkbox"
						},
						"fieldControl": {
							"item1": 0,
							"item2": "icon"
						},
						"columnWidth": {
							"item1": 0,
							"item2": "150px"
						},
						"troothyClass": {
							"item1": 0,
							"item2": "k-icon k-i-check-circle k-i-checkmark-circle green"
						},
						"falsyClass": {
							"item1": 0,
							"item2": "k-icon k-i-close-outline k-i-x-outline red"
						}
					}
				}
			}
		},
		{
			"metadataId": 31,
			"itemName": "bMfr",
			"itemType": "Table",
			"options": {
				"UIHint": {
					"metadataParamValue": {
						"DisplayName": {
							"item1": 0,
							"item2": "Copacker"
						},
						"filter": {
							"item1": 0,
							"item2": "boolean"
						},
						"filterControl": {
							"item1": 0,
							"item2": "switch"
						},
						"columnWidth": {
							"item1": 0,
							"item2": "150px"
						},
						"troothyClass": {
							"item1": 0,
							"item2": "k-icon k-i-check-circle k-i-checkmark-circle green"
						},
						"falsyClass": {
							"item1": 0,
							"item2": "k-icon k-i-close-outline k-i-x-outline red"
						}
					}
				}
			}
		},
		{
			"metadataId": 32,
			"itemName": "bSup",
			"itemType": "Table",
			"options": {
				"UIHint": {
					"metadataParamValue": {
						"DisplayName": {
							"item1": 0,
							"item2": "Supplier"
						},
						"filter": {
							"item1": 0,
							"item2": "boolean"
						},
						"filterControl": {
							"item1": 0,
							"item2": "switch"
						},
						"fieldControl": {
							"item1": 0,
							"item2": "icon"
						},
						"columnWidth": {
							"item1": 0,
							"item2": "150px"
						},
						"troothyClass": {
							"item1": 0,
							"item2": "k-icon k-i-check-circle k-i-checkmark-circle green"
						},
						"falsyClass": {
							"item1": 0,
							"item2": "k-icon k-i-close-outline k-i-x-outline red"
						}
					}
				}
			}
		},
		{
			"metadataId": 33,
			"itemName": "bDst",
			"itemType": "Table",
			"options": {
				"UIHint": {
					"metadataParamValue": {
						"DisplayName": {
							"item1": 0,
							"item2": "Distributer"
						},
						"filter": {
							"item1": 0,
							"item2": "boolean"
						},
						"filterControl": {
							"item1": 0,
							"item2": "switch"
						},
						"fieldControl": {
							"item1": 0,
							"item2": "icon"
						},
						"columnWidth": {
							"item1": 0,
							"item2": "150px"
						},
						"troothyClass": {
							"item1": 0,
							"item2": "k-icon k-i-check-circle k-i-checkmark-circle green"
						},
						"falsyClass": {
							"item1": 0,
							"item2": "k-icon k-i-close-outline k-i-x-outline red"
						}
					}
				}
			}
		},
		{
			"metadataId": 36,
			"itemName": "clientStatusId",
			"itemType": "Table",
			"options": {
				"List": {
					"metadataParamValue": {
						"32": {
							"item1": 6,
							"item2": "New"
						},
						"33": {
							"item1": 2,
							"item2": "Prospect"
						},
						"34": {
							"item1": 1,
							"item2": "Enrolled"
						},
						"36": {
							"item1": 4,
							"item2": "Renewal"
						},
						"37": {
							"item1": 3,
							"item2": "Hold"
						},
						"38": {
							"item1": 5,
							"item2": "Inactive"
						}
					}
				}
			}
		},
		{
			"metadataId": 49,
			"itemName": "dateAdded",
			"itemType": "Field",
			"options": {
				"Required": {
					"metadataParamValue": {
						"ErrorMessage": {
							"item1": 0,
							"item2": "A value is Required"
						}
					}
				},
				"UIHint": {
					"metadataParamValue": {
						"DisplayName": {
							"item1": 0,
							"item2": "Date Created"
						}
					}
				},
				"DisplayFormat": {
					"metadataParamValue": {
						"DateFormatString": {
							"item1": 0,
							"item2": "dd-MMM-yyyy"
						}
					}
				}
			}
		}
	];

export const newMockData: object[] = [
	{
		"routeId": 1,
		"apiId": 1,
		"fieldCode": "fcid-textbox",
		"metaType": "PageForm",
		"metas": [
		  {
			"metaId": 198,
			"ftCode": "fcid-textbox",
			"label": "TextBoxLabel",
			"toolTip": "TextBoxTooltip",
			"descr": "TextBoxDescr",
			"MetaParms": [
			  {
				"required": "true",
				"maxlength": "10",
				"readonly": "false",
				"width": "150px"
			  }
			]
		  }
		]
	  }
];