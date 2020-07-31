# Dicom Viewer Component

[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/fourctv/dicomViewerLib.svg)](https://david-dm.org/fourctv/dicomViewerLib)
[![devDependency Status](https://david-dm.org/fourctv/dicomViewerLib/dev-status.svg)](https://david-dm.org/fourctv/dicomViewerLib#info=devDependencies)
[![npm version](https://badge.fury.io/js/dicomViewerLib.svg)](https://badge.fury.io/js/ng-dicomviewer)

This is an Angular 9+ DICOM Web Viewer Component, based on [CornerstoneJS](https://github.com/cornerstonejs) Project.

It includes a demo app that can be tried [here](https://fourctv.github.io/dicomViewerDemo/). Demo app source is included in the project.

## Installation

Install via [NPM](https://www.npmjs.com):
```
npm install ng-dicomviewer --save
```

### Add `cornerstonejs` dependencies

This component depends on `cornerstonejs`, so you need to also install `cornerstone` and `cornerstoneTools` modules into your project:
```
npm install cornerstone-core cornerstone-math dicom-parser cornerstone-tools@2.5.0 --save
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

### Add Cornerstone modules to your build

You need to manually force `cornerstone` libraries to be included into your build. For that you need to edit you `angular.json` file and add the following to the `architect.build.options.scripts`:
```
            "scripts": [
              "node_modules/cornerstone-core/dist/cornerstone.js",
              "node_modules/cornerstone-math/dist/cornerstoneMath.js",
              "node_modules/cornerstone-tools/dist/cornerstoneTools.js",
              "node_modules/dicom-parser/dist/dicomParser.js",
              "src/assets/cornerstone/lib/cornerstoneWADOImageLoader.js"
      
            ]
```

(see example [here](https://github.com/fourctv/dicomViewerLib/blob/master/angular.json))

### Add component to your page

```
  <div style="height: 100%; width:100%;">
    <dicom-viewer [enableViewerTools]="true" style="height:100%; width:100%; margin: 10px;"></dicom-viewer>
  </div>
```

## API

The component includes some input properties and a method to load/show dicom images.

### Input properties

- enableViewerTools: a boolean `true|false` to indicate if Viewer tools should be enabled or not. Tools include Langth, Angle, Elliptical ROI, etc...
- enablePlayTools: a boolean `true|false` to indicate if Play Clip tools should be enabled or not.
- maxImagesToLoad: maximum number of images to load for display (default: 20). If more images are set for display, they will be loaded `maxImagesToLoad` at a time. If value is set to `0` or `-1`, no image loading limit will apply.
- downloadImagesURL: optional property, if set a **Download Images** button will be enabled. The URI value set will be used to download all images as a `.zip` file.

### DICOM Images to Display

In order to display a Study/Series one has to call the component's `loadStudyImages` method, passing an array of **Image Ids**. Those **Image Ids** will then be used to load images for display. Image loading uses `cornerstone` [Image Loaders](https://github.com/cornerstonejs/cornerstone/wiki/ImageLoader), so **[Image Ids](https://github.com/cornerstonejs/cornerstone/wiki/ImageIds)** must follow `cornerstone` [requirements](https://github.com/cornerstonejs/cornerstone/wiki/ImageIds).

## Example

This project includes a demo application that allows one to select DICOM files for display. It can be found [here](https://github.com/fourctv/dicomViewerLib/blob/master/src/app/app.component.ts).

The example uses [Cornerstone WADO Image Loader](https://github.com/cornerstonejs/cornerstoneWADOImageLoader).

