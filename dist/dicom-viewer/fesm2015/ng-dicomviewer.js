import { Directive, ElementRef, HostListener, Input, Component, ViewChild, ViewChildren, NgModule } from '@angular/core';
import * as Hammer from 'hammerjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

class CornerstoneDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.imageList = [];
        this.imageIdList = [];
        this.currentIndex = 0;
        this.patientName = ''; // current image Patient name, do display on the overlay
        this.hospital = ''; // current image Institution name, to display on the overlay
        this.instanceNumber = ''; // current image Instance #, to display on the overlay
        // cornersTone Tools we use
        this.WwwcTool = cornerstoneTools.WwwcTool;
        this.PanTool = cornerstoneTools.PanTool;
        this.ZoomTool = cornerstoneTools.ZoomTool;
        this.ProbeTool = cornerstoneTools.ProbeTool;
        this.LengthTool = cornerstoneTools.LengthTool;
        this.AngleTool = cornerstoneTools.AngleTool;
        this.EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool;
        this.RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
        this.DragProbeTool = cornerstoneTools.DragProbeTool;
        this.ZoomTouchPinchTool = cornerstoneTools.ZoomTouchPinchTool;
        this.PanMultiTouchTool = cornerstoneTools.PanMultiTouchTool;
        this.StackScrollTool = cornerstoneTools.StackScrollTool;
        this.StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool;
        this.isCornerstoneEnabled = false;
    }
    get windowingValue() {
        if (this.isCornerstoneEnabled) {
            let viewport = cornerstone.getViewport(this.element);
            if (this.currentImage && viewport) {
                return Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter);
            }
        }
        return '';
    }
    get zoomValue() {
        if (this.isCornerstoneEnabled) {
            let viewport = cornerstone.getViewport(this.element);
            if (this.currentImage && viewport) {
                return viewport.scale.toFixed(2);
            }
        }
        return '';
    }
    onResize(event) {
        if (this.isCornerstoneEnabled) {
            cornerstone.resize(this.element, true);
        }
    }
    onMouseWheel(event) {
        event.preventDefault();
        if (this.imageList.length > 0) {
            const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
            // console.log(event);
            if (delta > 0) {
                this.currentIndex++;
                if (this.currentIndex >= this.imageList.length) {
                    this.currentIndex = this.imageList.length - 1;
                }
            }
            else {
                this.currentIndex--;
                if (this.currentIndex < 0) {
                    this.currentIndex = 0;
                }
            }
            this.displayImage(this.imageList[this.currentIndex]);
        }
    }
    ngOnInit() {
        // Retrieve the DOM element itself
        this.element = this.elementRef.nativeElement;
        // now add the Tools we use
        cornerstoneTools.external.cornerstone = cornerstone;
        cornerstoneTools.external.Hammer = Hammer;
        cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
        cornerstoneTools.init({ globalToolSyncEnabled: true });
        cornerstoneTools.addTool(this.WwwcTool);
        cornerstoneTools.addTool(this.PanTool);
        cornerstoneTools.addTool(this.ZoomTool);
        cornerstoneTools.addTool(this.ProbeTool);
        cornerstoneTools.addTool(this.LengthTool);
        cornerstoneTools.addTool(this.AngleTool);
        cornerstoneTools.addTool(this.EllipticalRoiTool);
        cornerstoneTools.addTool(this.RectangleRoiTool);
        cornerstoneTools.addTool(this.DragProbeTool);
        cornerstoneTools.addTool(this.ZoomTouchPinchTool);
        cornerstoneTools.addTool(this.PanMultiTouchTool);
        cornerstoneTools.addTool(this.StackScrollTool);
        cornerstoneTools.addTool(this.StackScrollMouseWheelTool);
        // Enable the element with Cornerstone
        this.resetViewer();
    }
    ngAfterViewChecked() {
        //  if (this.currentImage) cornerstone.resize(this.element, true);
    }
    //
    // reset the viewer, so only this current element is enabled
    //
    resetViewer() {
        this.disableViewer();
        cornerstone.enable(this.element);
        this.isCornerstoneEnabled = true;
    }
    disableViewer() {
        this.element = this.elementRef.nativeElement;
        try {
            cornerstone.disable(this.element);
        }
        finally { }
        this.isCornerstoneEnabled = false;
    }
    resetImageCache() {
        this.imageList = [];
        this.imageIdList = [];
        this.currentImage = null;
        this.currentIndex = 0;
        this.patientName = '';
        this.hospital = '';
        this.instanceNumber = '';
    }
    previousImage() {
        if (this.imageList.length > 0) {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = 0;
            }
            this.displayImage(this.imageList[this.currentIndex]);
        }
    }
    nextImage() {
        if (this.imageList.length > 0) {
            this.currentIndex++;
            if (this.currentIndex >= this.imageList.length) {
                this.currentIndex = this.imageList.length - 1;
            }
            this.displayImage(this.imageList[this.currentIndex]);
        }
    }
    addImageData(imageData) {
        this.element = this.elementRef.nativeElement;
        //if (!this.imageList.filter(img => img.imageId === imageData.imageId).length) {
        this.imageList.push(imageData);
        this.imageIdList.push(imageData.imageId);
        if (this.imageList.length === 1) {
            this.currentIndex = 0;
            this.displayImage(imageData);
        }
        //}
        cornerstone.resize(this.element, true);
    }
    displayImage(image) {
        this.element = this.elementRef.nativeElement;
        const viewport = cornerstone.getDefaultViewportForImage(this.element, image);
        cornerstone.displayImage(this.element, image, viewport);
        this.currentImage = image;
        // Fit the image to the viewport window
        cornerstone.fitToWindow(this.element);
        cornerstone.resize(this.element, true);
        // get image info to display in overlays
        if (image.data.string('x00100010'))
            this.patientName = image.data.string('x00100010').replace(/\^/g, '');
        this.hospital = image.data.string('x00080080');
        this.instanceNumber = image.data.intString('x00200011') + '/' + image.data.intString('x00200013');
        // Activate mouse clicks, mouse wheel and touch
        // cornerstoneTools.mouseInput.enable(this.element);
        // cornerstoneTools.mouseWheelInput.enable(this.element);
        // //cornerstoneTools.touchInput.enable(this.element);
        // cornerstoneTools.keyboardInput.enable(this.element);
        // Enable all tools we want to use with this element
        cornerstoneTools.setToolActiveForElement(this.element, 'Wwwc', { mouseButtonMask: 1 }, ['Mouse']); // ww/wc is the default tool for left mouse button
        cornerstoneTools.setToolActiveForElement(this.element, 'Pan', { mouseButtonMask: 4 }, ['Mouse']); // pan is the default tool for middle mouse button
        cornerstoneTools.setToolActiveForElement(this.element, 'Zoom', { mouseButtonMask: 2 }, ['Mouse']); // zoom is the default tool for right mouse button
        /*     cornerstoneTools.wwwc.activate(this.element, 1); // ww/wc is the default tool for left mouse button
            cornerstoneTools.pan.activate(this.element, 2); // pan is the default tool for middle mouse button
            cornerstoneTools.zoom.activate(this.element, 4); // zoom is the default tool for right mouse button
            cornerstoneTools.probe.enable(this.element);
            cornerstoneTools.length.enable(this.element);
            cornerstoneTools.angle.enable(this.element);
            cornerstoneTools.simpleAngle.enable(this.element);
            cornerstoneTools.ellipticalRoi.enable(this.element);
            cornerstoneTools.rectangleRoi.enable(this.element);
            cornerstoneTools.wwwcTouchDrag.activate(this.element) // - Drag
            cornerstoneTools.zoomTouchPinch.activate(this.element) // - Pinch
            cornerstoneTools.panMultiTouch.activate(this.element) // - Multi (x2) */
        // Stack tools
        // Define the Stack object
        const stack = {
            currentImageIdIndex: this.currentIndex,
            imageIds: this.imageIdList
        };
        cornerstoneTools.addStackStateManager(this.element, ['playClip']);
        // Add the stack tool state to the enabled element
        cornerstoneTools.addStackStateManager(this.element, ['stack']);
        cornerstoneTools.addToolState(this.element, 'stack', stack);
        // cornerstoneTools.stackScrollWheel.activate(this.element);
        // Enable all tools we want to use with this element
        cornerstoneTools.setToolActiveForElement(this.element, 'StackScroll', {});
        //cornerstoneTools.stackPrefetch.enable(this.element);
    }
    // cornerstone.displayImage(this.element, image);
    // deactivate all tools
    resetAllTools() {
        cornerstoneTools.setToolDisabledForElement(this.element, 'Wwwc');
        cornerstoneTools.setToolDisabledForElement(this.element, 'Pan');
        cornerstoneTools.setToolDisabledForElement(this.element, 'Zoom');
        cornerstoneTools.setToolDisabledForElement(this.element, 'Probe');
        cornerstoneTools.setToolDisabledForElement(this.element, 'Length');
        cornerstoneTools.setToolDisabledForElement(this.element, 'Angle');
        cornerstoneTools.setToolDisabledForElement(this.element, 'EllipticalRoi');
        cornerstoneTools.setToolDisabledForElement(this.element, 'RectangleRoi');
        cornerstoneTools.setToolDisabledForElement(this.element, 'DragProbe');
        cornerstoneTools.setToolDisabledForElement(this.element, 'ZoomTouchPinch');
        cornerstoneTools.setToolDisabledForElement(this.element, 'PanMultiTouch');
        cornerstoneTools.setToolDisabledForElement(this.element, 'StackScroll');
        cornerstoneTools.setToolDisabledForElement(this.element, 'StackScrollMouseWheel');
    }
}
CornerstoneDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cornerstone]',
            },] }
];
CornerstoneDirective.ctorParameters = () => [
    { type: ElementRef }
];
CornerstoneDirective.propDecorators = {
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }],
    onMouseWheel: [{ type: HostListener, args: ['wheel', ['$event'],] }]
};

class ThumbnailDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        // Retrieve the DOM element itself
        this.element = this.elementRef.nativeElement;
        // Enable the element with Cornerstone
        cornerstone.enable(this.element);
        this.setImageData(this.imageData);
    }
    ngAfterViewChecked() {
        this.refresh();
    }
    refresh() {
        this.setImageData(this.imageData);
    }
    setImageData(image) {
        this.imageData = image;
        if (this.imageData && this.element) {
            const viewport = cornerstone.getDefaultViewportForImage(this.element, this.imageData);
            cornerstone.displayImage(this.element, this.imageData, viewport);
            // Fit the image to the viewport window
            cornerstone.fitToWindow(this.element);
            cornerstone.resize(this.element, true);
        }
    }
}
ThumbnailDirective.decorators = [
    { type: Directive, args: [{
                selector: '[thumbnail]',
            },] }
];
ThumbnailDirective.ctorParameters = () => [
    { type: ElementRef }
];
ThumbnailDirective.propDecorators = {
    imageData: [{ type: Input }]
};

class DICOMViewerComponent {
    constructor() {
        this.enableViewerTools = false; // enable viewer tools
        this.enablePlayTools = false; // enable Play Clip tools
        this.downloadImagesURL = ''; // download images URL
        this.maxImagesToLoad = 20; // limit for the automatic loading of study images
        this.seriesList = []; // list of series on the images being displayed
        this.currentSeriesIndex = 0;
        this.currentSeries = {};
        this.imageCount = 0; // total image count being viewed
        // control exhibition of a loading images progress indicator
        this.loadingImages = false;
        this.loadedImages = [];
        this.imageIdList = [];
        this.targetImageCount = 0;
    }
    // control enable/disable image scroll buttons
    get hidePreviousImage() { return { color: (this.viewPort.currentIndex < 1) ? 'black' : 'white' }; }
    get hideNextImage() { return { color: (this.viewPort.currentIndex >= (this.imageCount - 1)) ? 'black' : 'white' }; }
    // control message for more images to load
    get moreImagestoLoad() {
        if (this.loadedImages.length < this.imageIdList.length && !this.loadingImages) { // are there any more images to load?
            const imagesToLoad = (this.maxImagesToLoad <= 0) ? (this.imageIdList.length - this.loadedImages.length) : Math.min(this.maxImagesToLoad, this.imageIdList.length - this.loadedImages.length);
            return imagesToLoad.toString();
        }
        else
            return '';
    }
    get showProgress() { return { display: (this.loadingImages) ? 'inline-block' : 'none' }; }
    ;
    ngOnInit() {
        this.element = this.viewPort.element;
    }
    /**
     * Load dicom images for display
     *
     * @param imageIdList list of imageIds to load and display
     */
    loadStudyImages(imageIdList) {
        this.element = this.viewPort.element;
        this.imageIdList = imageIdList;
        this.viewPort.resetViewer();
        this.viewPort.resetImageCache(); // clean up image cache
        this.seriesList = []; // start a new series list
        this.currentSeriesIndex = 0; // always display first series
        this.loadedImages = []; // reset list of images already loaded
        //
        // loop thru all imageIds, load and cache them for exhibition (up the the maximum limit defined)
        //
        const maxImages = (this.maxImagesToLoad <= 0) ? imageIdList.length : Math.min(this.maxImagesToLoad, imageIdList.length);
        this.loadingImages = true; // activate progress indicator
        this.targetImageCount = maxImages;
        for (let index = 0; index < maxImages; index++) {
            const imageId = imageIdList[index];
            cornerstone.loadAndCacheImage(imageId).then(imageData => { this.imageLoaded(imageData); });
        }
    }
    /**
     * Load the next batch of images
     */
    loadMoreImages() {
        this.element = this.viewPort.element;
        //
        // loop thru all imageIds, load and cache them for exhibition (up the the maximum limit defined)
        //
        const maxImages = (this.maxImagesToLoad <= 0) ? (this.imageIdList.length - this.loadedImages.length) : Math.min(this.maxImagesToLoad, this.imageIdList.length - this.loadedImages.length);
        this.loadingImages = true; // activate progress indicator
        this.targetImageCount += maxImages;
        let nextImageIndex = this.loadedImages.length;
        for (let index = 0; index < maxImages; index++) {
            const imageId = this.imageIdList[nextImageIndex++];
            cornerstone.loadAndCacheImage(imageId)
                .then(imageData => { this.imageLoaded(imageData); })
                .catch(err => { this.targetImageCount--; });
        }
    }
    /**
     *
     * @param imageData the dicom image data
     */
    imageLoaded(imageData) {
        //console.log(imageData.imageId)
        // build list of series in all loadded images
        const series = {
            studyID: imageData.data.string('x0020000d'),
            seriesID: imageData.data.string('x0020000e'),
            seriesNumber: imageData.data.intString('x00200011'),
            studyDescription: imageData.data.string('x00081030'),
            seriesDescription: imageData.data.string('x0008103e'),
            imageCount: 1,
            imageList: [imageData]
        };
        // if this is a new series, add it to the list
        let seriesIndex = this.seriesList.findIndex(item => item.seriesID === series.seriesID);
        if (seriesIndex < 0) {
            seriesIndex = this.seriesList.length;
            this.seriesList.push(series);
            this.seriesList.sort((a, b) => {
                if (a.seriesNumber > b.seriesNumber)
                    return 1;
                if (a.seriesNumber < b.seriesNumber)
                    return -1;
                return 0;
            });
        }
        else {
            let seriesItem = this.seriesList[seriesIndex];
            seriesItem.imageCount++;
            seriesItem.imageList.push(imageData);
            seriesItem.imageList.sort((a, b) => {
                if (a.data.intString('x00200013') > b.data.intString('x00200013'))
                    return 1;
                if (a.data.intString('x00200013') < b.data.intString('x00200013'))
                    return -1;
                return 0;
            });
        }
        this.loadedImages.push(imageData); // save to images loaded
        if (seriesIndex === this.currentSeriesIndex) {
            //this.currentSeries = this.seriesList[seriesIndex];
            //this.imageCount = this.currentSeries.imageCount; // get total image count
            //this.viewPort.addImageData(imageData);
            this.showSeries(this.currentSeriesIndex);
        }
        if (this.loadedImages.length >= this.targetImageCount) { // did we finish loading images?
            this.loadingImages = false; // deactivate progress indicator
        }
    }
    showSeries(index) {
        //        this.resetAllTools();
        this.currentSeriesIndex = index;
        this.currentSeries = this.seriesList[index];
        this.imageCount = this.currentSeries.imageCount; // get total image count
        this.viewPort.resetImageCache(); // clean up image cache
        //        this.loadingImages = true; // activate progress indicator
        for (let i = 0; i < this.currentSeries.imageList.length; i++) {
            const imageData = this.currentSeries.imageList[i];
            this.viewPort.addImageData(imageData);
        }
        //        this.loadingImages = false; // de-activate progress indicator
    }
    saveAs() {
        cornerstoneTools.saveAs(this.element, "teste.jpg");
    }
    /**
     * Image scroll methods
     */
    nextImage() {
        if (this.viewPort.currentIndex < this.imageCount) {
            this.viewPort.nextImage();
        }
    }
    previousImage() {
        if (this.viewPort.currentIndex > 0) {
            this.viewPort.previousImage();
        }
    }
    /**
     * Methods to activate/deactivate viewer tools
     */
    // deactivate all tools
    resetAllTools() {
        if (this.imageCount > 0) {
            this.viewPort.resetAllTools();
            this.stopClip();
        }
    }
    // activate windowing
    enableWindowing() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            // cornerstoneTools.wwwc.activate(this.element, 1);
            // cornerstoneTools.wwwcTouchDrag.activate(this.element);
            cornerstoneTools.setToolActiveForElement(this.element, 'Wwwc', { mouseButtonMask: 1 }, ['Mouse']);
        }
    }
    // activate zoom
    enableZoom() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            // cornerstoneTools.zoom.activate(this.element, 5); // 5 is right mouse button and left mouse button
            // cornerstoneTools.zoomTouchDrag.activate(this.element);
            cornerstoneTools.setToolActiveForElement(this.element, 'Zoom', { mouseButtonMask: 1 }, ['Mouse']); // zoom left mouse
            // cornerstoneTools.setToolActiveForElement(this.element, 'ZoomTouchPinch', { }, ['Mouse']);
            cornerstoneTools.setToolActiveForElement(this.element, 'Pan', { mouseButtonMask: 2 }, ['Mouse']); // pan right mouse
        }
    }
    // activate pan
    enablePan() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            // cornerstoneTools.pan.activate(this.element, 3); // 3 is middle mouse button and left mouse button
            // cornerstoneTools.panTouchDrag.activate(this.element);
            cornerstoneTools.setToolActiveForElement(this.element, 'Pan', { mouseButtonMask: 1 }, ['Mouse']);
        }
    }
    // activate image scroll
    enableScroll() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            // cornerstoneTools.stackScroll.activate(this.element, 1);
            // cornerstoneTools.stackScrollTouchDrag.activate(this.element);
            // cornerstoneTools.stackScrollKeyboard.activate(this.element);
            cornerstoneTools.setToolActiveForElement(this.element, 'StackScroll', { mouseButtonMask: 1 }, ['Mouse']);
        }
    }
    // activate length measurement
    enableLength() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            // cornerstoneTools.length.activate(this.element, 1);
            cornerstoneTools.setToolActiveForElement(this.element, 'Length', { mouseButtonMask: 1 }, ['Mouse']);
        }
    }
    // activate angle measurement
    enableAngle() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            // cornerstoneTools.simpleAngle.activate(this.element, 1);
            cornerstoneTools.setToolActiveForElement(this.element, 'Angle', { mouseButtonMask: 1 }, ['Mouse']);
        }
    }
    // activate pixel probe
    enableProbe() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            // cornerstoneTools.probe.activate(this.element, 1);
            cornerstoneTools.setToolActiveForElement(this.element, 'Probe', { mouseButtonMask: 1 }, ['Mouse']);
        }
    }
    // activate Elliptical ROI
    enableElliptical() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            // cornerstoneTools.ellipticalRoi.activate(this.element, 1);
            cornerstoneTools.setToolActiveForElement(this.element, 'EllipticalRoi', { mouseButtonMask: 1 }, ['Mouse']);
        }
    }
    // activate Rectangle ROI
    enableRectangle() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            // cornerstoneTools.rectangleRoi.activate(this.element, 1);
            cornerstoneTools.setToolActiveForElement(this.element, 'RectangleRoi', { mouseButtonMask: 1 }, ['Mouse']);
        }
    }
    // Play Clip
    playClip() {
        if (this.imageCount > 0) {
            let frameRate = 10;
            let stackState = cornerstoneTools.getToolState(this.element, 'stack');
            if (stackState) {
                frameRate = stackState.data[0].frameRate;
                // Play at a default 10 FPS if the framerate is not specified
                if (frameRate === undefined || frameRate === null || frameRate === 0) {
                    frameRate = 10;
                }
            }
            cornerstoneTools.playClip(this.element, frameRate);
        }
    }
    // Stop Clip
    stopClip() {
        cornerstoneTools.stopClip(this.element);
    }
    // invert image
    invertImage() {
        if (this.imageCount > 0) {
            let viewport = cornerstone.getViewport(this.element);
            // Toggle invert
            if (viewport.invert === true) {
                viewport.invert = false;
            }
            else {
                viewport.invert = true;
            }
            cornerstone.setViewport(this.element, viewport);
        }
    }
    // reset image
    resetImage() {
        if (this.imageCount > 0) {
            let toolStateManager = cornerstoneTools.getElementToolStateManager(this.element);
            // Note that this only works on ImageId-specific tool state managers (for now)
            //toolStateManager.clear(this.element);
            cornerstoneTools.clearToolState(this.element, "Length");
            cornerstoneTools.clearToolState(this.element, "Angle");
            // cornerstoneTools.clearToolState(this.element, "simpleAngle");
            cornerstoneTools.clearToolState(this.element, "Probe");
            cornerstoneTools.clearToolState(this.element, "EllipticalRoi");
            cornerstoneTools.clearToolState(this.element, "RectangleRoi");
            cornerstone.updateImage(this.element);
            this.resetAllTools();
        }
    }
    clearImage() {
        this.viewPort.resetViewer();
        this.viewPort.resetImageCache();
        this.seriesList = []; // list of series on the images being displayed
        this.currentSeriesIndex = 0;
        this.currentSeries = {};
        this.imageCount = 0; // total image count being viewed
    }
}
DICOMViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'dicom-viewer',
                template: "<div style=\"display: flex; width:100%; height: 100%;\">\n    <div class=\"thumbnailSelector\" *ngIf=\"seriesList.length > 1\" style=\"margin-right: 5px;\">\n        <div class=\"thumbnails list-group\" style=\"height: 100%;\">\n            <a *ngFor=\"let series of seriesList; let i=index\" [ngClass]=\"{'active': currentSeriesIndex === i}\" class=\"list-group-item\"\n                oncontextmenu=\"return false\" unselectable=\"on\" onselectstart=\"return false;\" onmousedown=\"return false;\"\n                (click)=\"showSeries(i)\">\n                <div thumbnail [imageData]=\"series.imageList[0]\" class=\"csthumbnail\" oncontextmenu=\"return false\"\n                    unselectable=\"on\" onselectstart=\"return false;\" onmousedown=\"return false;\">\n                </div>\n                <div class=\"text-center small\" style=\"color:white;\">{{series.seriesDescription}}</div>\n                <div id=\"mrtopright\" style=\"position: absolute;top:3px; right:3px\">\n                    <div id=\"imageCount\" style=\"color: rgb(211, 34, 81); font-size: 14pt\">{{series.imageCount}}</div>\n                </div>\n            </a>\n            <div class=\"version\">\n                <h6 style=\"color:white;\"><small>1.20.12.17</small></h6>\n            </div>\n        </div>\n    </div>\n\n    <!--container where image will be loaded-->\n    <div style=\"overflow: hidden; width: 100%; height: 100%; background-color: #424242;\">\n\n        <!-- Toolbar -->\n        <div>\n            <div class=\"btn-group\">\n                <div class=\"btn-group\" *ngIf=\"enableViewerTools\">\n\n                    <!-- WW/WL -->\n                    <button type=\"button\" (click)=\"enableWindowing()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Windowing\"><span class=\"fa fa-sun\"></span></button>\n                    <!-- Invert -->\n                    <button type=\"button\" (click)=\"invertImage()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Invert\"><span class=\"fa fa-adjust\"></span></button>\n                    <!-- Stack scroll -->\n                    <button type=\"button\" (click)=\"enableScroll()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Scroll\"><span class=\"fa fa-bars\"></span></button>\n                    <!-- Length measurement -->\n                    <button type=\"button\" (click)=\"enableLength()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Length\"><span class=\"fa fa-arrows-alt-v\"></span></button>\n                    <!-- Angle measurement -->\n                    <button type=\"button\" (click)=\"enableAngle()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Angle\"><span class=\"fa fa-angle-left\"></span></button>\n                    <!-- Pixel probe -->\n                    <button type=\"button\" (click)=\"enableProbe()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Pixel Probe\"><span class=\"fa fa-dot-circle\"></span></button>\n                    <!-- Elliptical ROI -->\n                    <button type=\"button\" (click)=\"enableElliptical()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Elliptical ROI\"><span class=\"fa fa-circle\"></span></button>\n                    <!-- Rectangle ROI -->\n                    <button type=\"button\" (click)=\"enableRectangle()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Rectangle ROI\"><span class=\"fa fa-square\"></span></button>\n                    <!-- Reset Image -->\n                    <button type=\"button\" (click)=\"resetImage()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Reset Image\"><span class=\"fa fa-window-restore\"></span></button>\n                </div>\n                <div class=\"btn-group\">\n                    <!-- Zoom -->\n                    <button type=\"  button\" (click)=\"enableZoom()\" class=\"btn btn-sm btn-default\" data-container='body'\n                      data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Zoom\"><span class=\"fa fa-search\"></span></button>\n                    <!-- Pan -->\n                    <button type=\"button\" (click)=\"enablePan()\" class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"tooltip\"\n                      data-placement=\"bottom\" title=\"Pan\"><span class=\"fa fa-arrows-alt\"></span></button>\n                    <!-- Play clip -->\n                    <button type=\"button\" *ngIf=\"enablePlayTools\" (click)=\"playClip()\" style=\"border-left: 1px dotted white;\" class=\"btn btn-sm btn-default\"\n                        data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Play Clip\"><span\n                            class=\"fa fa-play\"></span></button>\n                    <!-- Stop clip -->\n                    <button type=\"button\" *ngIf=\"enablePlayTools\" (click)=\"stopClip()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Stop Clip\"><span class=\"fa fa-stop\"></span></button>\n\n                    <!-- Layout -->\n                    <!--                 <button type=\"button\" style=\"border-left: 1px dotted white;\" [matMenuTriggerFor]=\"menu\" class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"dropdown\" aria-expanded=\"false\" data-placement=\"top\" title=\"Layout\"><span class=\"fa fa-th-large\"></span></button>\n                  <mat-menu #menu=\"matMenu\">\n                          <a mat-menu-item class=\"dropdown-item\" >1x1</a>\n                          <a mat-menu-item class=\"dropdown-item\" >2x1</a>\n                          <a mat-menu-item class=\"dropdown-item\" >1x2</a>\n                          <a mat-menu-item class=\"dropdown-item\" >2x2</a>\n\n                  </mat-menu> -->\n\n                    <!-- Download -->\n                    <a *ngIf=\"downloadImagesURL != ''\" [href]=\"downloadImagesURL\" download style=\"border-left: 1px dotted white;\"\n                        class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\"\n                        title=\"Download Imagens\">\n                        <span class=\"fa fa-download\"></span>\n                    </a>\n\n                    <!-- Imagem Anterior -->\n                    <button type=\"button\" (click)=\"previousImage()\" [ngStyle]=\"hidePreviousImage\" style=\"border-left: 1px dotted white;\"\n                        class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\"\n                        title=\"Imagem Anterior\"><span class=\"fa fa-backward\"></span></button>\n                    <!-- Pr\u00F3xima Imagem -->\n                    <button type=\"button\" (click)=\"nextImage()\" [ngStyle]=\"hideNextImage\" class=\"btn btn-sm btn-default\"\n                        data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Pr\u00F3xima Imagem\"><span\n                            class=\"fa fa-forward\"></span></button>\n\n                    <!-- Load Next Batch -->\n                    <a type=\"button\" *ngIf=\"moreImagestoLoad != ''\" (click)=\"loadMoreImages()\" style=\"border-left: 1px dotted white;color: white;white-space: nowrap;\"\n                        class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\"\n                        title=\"Carrega mais imagens...\"><i class=\"fas fa-cloud-download-alt\"></i> clique aqui para trazer as pr\u00F3ximas {{moreImagestoLoad}} imagens\n                    </a>\n\n                    <!-- Progress Spinner -->\n                    <div style=\"padding-left: 15px; padding-top: 15px;\" [ngStyle]=\"showProgress\">\n                        <mat-spinner style=\"display: inline-block;\" diameter=\"30\" strokeWidth=\"5\" color=\"warn\"></mat-spinner>\n                    </div>\n\n                </div>\n\n            </div>\n        </div>\n        <div style=\"width: 100%; height: calc(100% - 60px);position:relative;display:inline-block;color:white;\"\n            oncontextmenu=\"return false\" class='cornerstone-enabled-image' unselectable='on' onselectstart='return false;'\n            onmousedown='return false;'>\n            <div cornerstone style=\"width: 100%; height: 100%;top:0px;left:0px;position:absolute;outline:none;margin: 0 auto;\"\n                id=\"dicomImage\">\n            </div>\n            <div id=\"mrtopleft\" style=\"position: absolute;top:3px; left:3px\">\n                {{viewPort.patientName}}\n            </div>\n            <div id=\"mrtopright\" style=\"position: absolute;top:3px; right:3px\">\n                {{viewPort.hospital}}\n            </div>\n            <div id=\"mrbottomleft\" style=\"position: absolute;bottom:3px; left:3px\">\n                <div>\n                    {{viewPort.instanceNumber}}\n                </div>\n                <div>\n                    WW/WC: {{viewPort.windowingValue}}\n                </div>\n            </div>\n            <div id=\"mrbottomright\" style=\"position: absolute;bottom:6px; right:3px\">\n                <!-- <div id=\"zoomText\">Zoom: {{viewPort.zoomValue}}</div> -->\n                <div id=\"sliceText\">Image: {{(imageCount > 0)?viewPort.currentIndex+1:0}}/{{imageCount}}</div>\n            </div>\n        </div>\n\n    </div>\n\n</div>\n",
                styles: [".btn-default{color:#fff;background-color:#424242;border-color:#424242;font-size:24pt;background-image:none;text-shadow:none}.thumbnailSelector{width:106px;float:left;margin-left:5px;height:100%;background-color:#424242}.thumbnails{margin:0;overflow-y:scroll;overflow-x:hidden}.csthumbnail{color:#fff;background-color:#000;width:100px;height:100px;border:0;padding:0}.version{position:absolute;bottom:20px;width:106px;text-align:center}a.list-group-item{background-color:#000;padding:2px;border:1px solid #424242;z-index:5;margin-bottom:3px}a.list-group-item.active,a.list-group-item.active:focus,a.list-group-item.active:hover{background-color:#424242;border-color:#4e4e4e;background-image:linear-gradient(#d32251,#d32251,#d32251)}a.list-group-item.active{color:#00f}"]
            },] }
];
DICOMViewerComponent.ctorParameters = () => [];
DICOMViewerComponent.propDecorators = {
    enableViewerTools: [{ type: Input }],
    enablePlayTools: [{ type: Input }],
    downloadImagesURL: [{ type: Input }],
    maxImagesToLoad: [{ type: Input }],
    viewPort: [{ type: ViewChild, args: [CornerstoneDirective, { static: true },] }],
    thumbnails: [{ type: ViewChildren, args: [ThumbnailDirective,] }]
};

class DicomViewerModule {
}
DicomViewerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    CommonModule,
                    MatProgressSpinnerModule
                ],
                declarations: [DICOMViewerComponent, CornerstoneDirective, ThumbnailDirective],
                exports: [DICOMViewerComponent, CornerstoneDirective, ThumbnailDirective]
            },] }
];

/*
 * Public API Surface of dicom-viewer
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CornerstoneDirective, DICOMViewerComponent, DicomViewerModule, ThumbnailDirective };
//# sourceMappingURL=ng-dicomviewer.js.map
