import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DICOMViewerComponent } from './dicom-viewer.component';
import { CornerstoneDirective } from './cornerstone.directive';
import { ThumbnailDirective } from './thumbnail.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  declarations: [DICOMViewerComponent, CornerstoneDirective, ThumbnailDirective],
  exports: [DICOMViewerComponent, CornerstoneDirective, ThumbnailDirective]
})
export class DicomViewerModule { }
