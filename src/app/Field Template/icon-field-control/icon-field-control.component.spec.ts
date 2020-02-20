// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { IconFieldControlComponent } from './icon-field-control.component';
// import { MetadataLibService, FcidMetadata, KVP } from '../metadata-lib.service';
// import { BehaviorSubject, Observable, of } from 'rxjs';

// describe('IconFieldControlComponent', () => {
//   let component: IconFieldControlComponent;
//   let fixture: ComponentFixture<IconFieldControlComponent>;
//   let serviceStub: MetadataLibService;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ IconFieldControlComponent ]
//     })
//     .overrideComponent(IconFieldControlComponent, {
//       set: {
//         providers: [
//           { provide: MetadataLibService, useClass: ServiceStub },
//         ]
//       }
//     })
//     .compileComponents()
//     .then(() => {
//       fixture = TestBed.createComponent(IconFieldControlComponent);
//       component = fixture.componentInstance;
//       serviceStub = fixture.debugElement.injector.get(MetadataLibService);
//       serviceStub.query();
//       fixture.detectChanges();
//     });
//   }));

//   it('ngOnInit success', () => {
//     component.field = 'clientStatusId';
//     component.ngOnInit();
//     fixture.detectChanges();
//     expect(component.troothyClass).not.toBeNull();
//     expect(component.falsyClass).not.toBeNull();
//   });
  
//   it('ngOnDestroy success', () => {
//     expect(component.ngOnDestroy()).toBeTruthy;
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
//     return 'test';
//   }
// }

