// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ImageFieldControlComponent } from './image-field-control.component';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { FcidMetadata, MetadataLibService, KVP } from '../metadata-lib.service';

// describe('ImageFieldControlComponent', () => {
//   let component: ImageFieldControlComponent;
//   let fixture: ComponentFixture<ImageFieldControlComponent>;
//   let serviceStub: MetadataLibService;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ImageFieldControlComponent]
//     })
//       .overrideComponent(ImageFieldControlComponent, {
//         set: {
//           providers: [
//             { provide: MetadataLibService, useClass: ServiceStub },
//           ]
//         }
//       })
//       .compileComponents()
//       .then(() => {
//         fixture = TestBed.createComponent(ImageFieldControlComponent);
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
//     expect(component.image0).not.toBeNull();
//     expect(component.image1).not.toBeNull();
//     expect(component.Image0ToolTip).not.toBeNull();
//     expect(component.Image1ToolTip).not.toBeNull();
//     expect(component.width).not.toBeNull();
//     expect(component.height).not.toBeNull();
//     expect(component.field).not.toBeNull();
//   });

//   it('ngOnDestroy success', () => {
//     expect(component.ngOnDestroy()).toBeTruthy;
//     fixture.detectChanges();
//   });
//   it('Condition success', () => {
//     expect(component.Condition("image", false)).toEqual('image');
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
