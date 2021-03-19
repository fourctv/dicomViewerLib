import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DICOMViewerComponent } from './dicom-viewer.component';

describe('DICOMViewerComponent', () => {
  let component: DICOMViewerComponent;
  let fixture: ComponentFixture<DICOMViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DICOMViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DICOMViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
