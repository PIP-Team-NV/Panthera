// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { ForeignkeyFieldControlComponent } from './foreignkey-field-control.component';
// import { MetadataLibService, FcidMetadata, KVP } from '../metadata-lib.service';
// import { BehaviorSubject, Observable, of } from 'rxjs';

// describe('ForeignkeyFieldControlComponent', () => {
//   let component: ForeignkeyFieldControlComponent;
//   let fixture: ComponentFixture<ForeignkeyFieldControlComponent>;
//   let serviceStub: MetadataLibService;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ForeignkeyFieldControlComponent]
//     })
//       .overrideComponent(ForeignkeyFieldControlComponent, {
//         set: {
//           providers: [
//             { provide: MetadataLibService, useClass: ServiceStub },
//           ]
//         }
//       })
//       .compileComponents()
//       .then(() => {
//         fixture = TestBed.createComponent(ForeignkeyFieldControlComponent);
//         component = fixture.componentInstance;
//         serviceStub = fixture.debugElement.injector.get(MetadataLibService);
//         serviceStub.query();
//         fixture.detectChanges();
//       });
//   }));
//   it('ngOnInit success', () => {
//     component.field = 'clientStatusId';
//     component.ngOnInit();
//     fixture.detectChanges();
//     expect(component.list).not.toBeNull();
//     expect(component.list.find(i => i.key == 32).value.val == 'New');
//   });
//   it('ngOnDestroy success', () => {
//     expect(component.ngOnDestroy()).toBeTruthy;
//     fixture.detectChanges();
//   });
//   it('transform success', () => {
//     expect(component.transform(component.list,32)).toEqual('New');
//     fixture.detectChanges();
//   });
// });


// class ServiceStub extends BehaviorSubject<FcidMetadata[]>{
//   constructor() {
//     super(null);
//   }
//   public query() {
//     this.fetchMetadata()
//       .subscribe(x => super.next(x));
//   }

//   private fetchMetadata(): Observable<FcidMetadata[]> {
//     return of([]);
//   }
//   public getUIHint(result: FcidMetadata[], filed: string, key: string) {
//     return 'public';
//   }
//   public getList(result: FcidMetadata[], filed: string) {
//     let mockResult: KVP[] = [
//       {
//         key: 'CoreClassCode',
//         value: { sort: 0, val: 'CertStatus' }
//       },
//       {
//         key: 32,
//         value: { sort: 0, val: 'New' }
//       },
//       {
//         key: 33,
//         value: { sort: 2, val: 'Prospect' }
//       },
//       {
//         key: 34,
//         value: { sort: 1, val: 'Enroled' }
//       },
//       {
//         key: 36,
//         value: { sort: 3, val: 'Renewal' }
//       },
//       {
//         key: 37,
//         value: { sort: 4, val: 'Hold' }
//       },
//       {
//         key: 38,
//         value: { sort: 5, val: 'Inactive' }
//       }
//     ];
//     return mockResult;
//   }
// }
