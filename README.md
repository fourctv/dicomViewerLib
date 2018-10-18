# Dicom Viewer Component

This is an Angular 6+ DICOM Web Viewer Component, based on [CornerstoneJS](https://github.com/cornerstonejs) Project.

It includes a demo app that can be tried [here](https://fourctv.github.io/dicomViewerDemo/). Demo app source is included in the project.

## Installation

Install via [NPM](https://www.npmjs.com):
```
npm install ng-dicomviewer --save
```

### Add `cornerstonejs` dependencies

This component depends on `conerstonejs`, so you need to also install `cornerstone` modules into your project:
```
npm install cornerstone-core cornerstone-math cornerstone-tools dicom-parser --save
```

## Usage

### Import **DICOMViewerModule**.

You need to import `DICOMViewerModule` into your `app.module.ts`, and include it into your imports:
```
...
import { DicomViewerModule } from 'ng-dicomviewer';
...
@NgModule({
    imports: [
...
       DicomViewerModule
...
    ]
    ...
```

