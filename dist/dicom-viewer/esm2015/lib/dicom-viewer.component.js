import { Component, ViewChild, Input, ViewChildren } from '@angular/core';
import { CornerstoneDirective } from './cornerstone.directive';
import { ThumbnailDirective } from './thumbnail.directive';
export class DICOMViewerComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljb20tdmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2RpY29tLXZpZXdlci9zcmMvbGliL2RpY29tLXZpZXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQVkzRCxNQUFNLE9BQU8sb0JBQW9CO0lBb0MvQjtRQWxDZ0Isc0JBQWlCLEdBQUcsS0FBSyxDQUFDLENBQUMsc0JBQXNCO1FBQ2pELG9CQUFlLEdBQUcsS0FBSyxDQUFDLENBQUMseUJBQXlCO1FBQ2xELHNCQUFpQixHQUFHLEVBQUUsQ0FBQSxDQUFDLHNCQUFzQjtRQUM3QyxvQkFBZSxHQUFHLEVBQUUsQ0FBQyxDQUFDLGtEQUFrRDtRQUVqRixlQUFVLEdBQUcsRUFBRSxDQUFDLENBQUMsK0NBQStDO1FBQ2hFLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUN2QixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsaUNBQWlDO1FBY3hELDREQUE0RDtRQUNyRCxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQU1yQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVqQixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFFYixDQUFDO0lBeEJqQiw4Q0FBOEM7SUFDOUMsSUFBVyxpQkFBaUIsS0FBVSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9B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Z0U7WUFDaEUsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkQsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDL0QsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDOUQsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVNLFVBQVU7UUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQywrQ0FBK0M7UUFDckUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztJQUV4RCxDQUFDOzs7WUF0VkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixpOVRBQTRDOzthQUU3Qzs7OztnQ0FHRSxLQUFLOzhCQUNMLEtBQUs7Z0NBQ0wsS0FBSzs4QkFDTCxLQUFLO3VCQXVCTCxTQUFTLFNBQUMsb0JBQW9CLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3lCQUNoRCxZQUFZLFNBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29ybmVyc3RvbmVEaXJlY3RpdmUgfSBmcm9tICcuL2Nvcm5lcnN0b25lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUaHVtYm5haWxEaXJlY3RpdmUgfSBmcm9tICcuL3RodW1ibmFpbC5kaXJlY3RpdmUnO1xuXG5cblxuZGVjbGFyZSBjb25zdCBjb3JuZXJzdG9uZTtcbmRlY2xhcmUgY29uc3QgY29ybmVyc3RvbmVUb29scztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGljb20tdmlld2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RpY29tLXZpZXdlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RpY29tLXZpZXdlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRElDT01WaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBlbmFibGVWaWV3ZXJUb29scyA9IGZhbHNlOyAvLyBlbmFibGUgdmlld2VyIHRvb2xzXG4gIEBJbnB1dCgpIHB1YmxpYyBlbmFibGVQbGF5VG9vbHMgPSBmYWxzZTsgLy8gZW5hYmxlIFBsYXkgQ2xpcCB0b29sc1xuICBASW5wdXQoKSBwdWJsaWMgZG93bmxvYWRJbWFnZXNVUkwgPSAnJyAvLyBkb3dubG9hZCBpbWFnZXMgVVJMXG4gIEBJbnB1dCgpIHB1YmxpYyBtYXhJbWFnZXNUb0xvYWQgPSAyMDsgLy8gbGltaXQgZm9yIHRoZSBhdXRvbWF0aWMgbG9hZGluZyBvZiBzdHVkeSBpbWFnZXNcblxuICBwdWJsaWMgc2VyaWVzTGlzdCA9IFtdOyAvLyBsaXN0IG9mIHNlcmllcyBvbiB0aGUgaW1hZ2VzIGJlaW5nIGRpc3BsYXllZFxuICBwdWJsaWMgY3VycmVudFNlcmllc0luZGV4ID0gMDtcbiAgcHVibGljIGN1cnJlbnRTZXJpZXM6IGFueSA9IHt9O1xuICBwdWJsaWMgaW1hZ2VDb3VudCA9IDA7IC8vIHRvdGFsIGltYWdlIGNvdW50IGJlaW5nIHZpZXdlZFxuXG4gIC8vIGNvbnRyb2wgZW5hYmxlL2Rpc2FibGUgaW1hZ2Ugc2Nyb2xsIGJ1dHRvbnNcbiAgcHVibGljIGdldCBoaWRlUHJldmlvdXNJbWFnZSgpOiBhbnkgeyByZXR1cm4geyBjb2xvcjogKHRoaXMudmlld1BvcnQuY3VycmVudEluZGV4IDwgMSkgPyAnYmxhY2snIDogJ3doaXRlJyB9OyB9XG4gIHB1YmxpYyBnZXQgaGlkZU5leHRJbWFnZSgpOiBhbnkgeyByZXR1cm4geyBjb2xvcjogKHRoaXMudmlld1BvcnQuY3VycmVudEluZGV4ID49ICh0aGlzLmltYWdlQ291bnQgLSAxKSkgPyAnYmxhY2snIDogJ3doaXRlJyB9OyB9XG5cbiAgLy8gY29udHJvbCBtZXNzYWdlIGZvciBtb3JlIGltYWdlcyB0byBsb2FkXG4gIHB1YmxpYyBnZXQgbW9yZUltYWdlc3RvTG9hZCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmxvYWRlZEltYWdlcy5sZW5ndGggPCB0aGlzLmltYWdlSWRMaXN0Lmxlbmd0aCAmJiAhdGhpcy5sb2FkaW5nSW1hZ2VzKSB7IC8vIGFyZSB0aGVyZSBhbnkgbW9yZSBpbWFnZXMgdG8gbG9hZD9cbiAgICAgIGNvbnN0IGltYWdlc1RvTG9hZCA9ICh0aGlzLm1heEltYWdlc1RvTG9hZCA8PSAwKSA/ICh0aGlzLmltYWdlSWRMaXN0Lmxlbmd0aCAtIHRoaXMubG9hZGVkSW1hZ2VzLmxlbmd0aCkgOiBNYXRoLm1pbih0aGlzLm1heEltYWdlc1RvTG9hZCwgdGhpcy5pbWFnZUlkTGlzdC5sZW5ndGggLSB0aGlzLmxvYWRlZEltYWdlcy5sZW5ndGgpO1xuICAgICAgcmV0dXJuIGltYWdlc1RvTG9hZC50b1N0cmluZygpO1xuICAgIH0gZWxzZSByZXR1cm4gJyc7XG4gIH1cblxuICAvLyBjb250cm9sIGV4aGliaXRpb24gb2YgYSBsb2FkaW5nIGltYWdlcyBwcm9ncmVzcyBpbmRpY2F0b3JcbiAgcHVibGljIGxvYWRpbmdJbWFnZXMgPSBmYWxzZTtcbiAgcHVibGljIGdldCBzaG93UHJvZ3Jlc3MoKTogYW55IHsgcmV0dXJuIHsgZGlzcGxheTogKHRoaXMubG9hZGluZ0ltYWdlcykgPyAnaW5saW5lLWJsb2NrJyA6ICdub25lJyB9IH07XG5cbiAgQFZpZXdDaGlsZChDb3JuZXJzdG9uZURpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgdmlld1BvcnQ6IENvcm5lcnN0b25lRGlyZWN0aXZlOyAvLyB0aGUgbWFpbiBjb3JuZXJ0b25lIHZpZXcgcG9ydFxuICBAVmlld0NoaWxkcmVuKFRodW1ibmFpbERpcmVjdGl2ZSkgdGh1bWJuYWlsczogQXJyYXk8VGh1bWJuYWlsRGlyZWN0aXZlPjtcblxuICBwcml2YXRlIGxvYWRlZEltYWdlcyA9IFtdO1xuICBwcml2YXRlIGltYWdlSWRMaXN0ID0gW107XG4gIHByaXZhdGUgZWxlbWVudDogYW55O1xuICBwcml2YXRlIHRhcmdldEltYWdlQ291bnQgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy52aWV3UG9ydC5lbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgZGljb20gaW1hZ2VzIGZvciBkaXNwbGF5XG4gICAqXG4gICAqIEBwYXJhbSBpbWFnZUlkTGlzdCBsaXN0IG9mIGltYWdlSWRzIHRvIGxvYWQgYW5kIGRpc3BsYXlcbiAgICovXG4gIGxvYWRTdHVkeUltYWdlcyhpbWFnZUlkTGlzdDogQXJyYXk8YW55Pikge1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMudmlld1BvcnQuZWxlbWVudDtcbiAgICB0aGlzLmltYWdlSWRMaXN0ID0gaW1hZ2VJZExpc3Q7XG4gICAgdGhpcy52aWV3UG9ydC5yZXNldFZpZXdlcigpO1xuICAgIHRoaXMudmlld1BvcnQucmVzZXRJbWFnZUNhY2hlKCk7IC8vIGNsZWFuIHVwIGltYWdlIGNhY2hlXG4gICAgdGhpcy5zZXJpZXNMaXN0ID0gW107IC8vIHN0YXJ0IGEgbmV3IHNlcmllcyBsaXN0XG4gICAgdGhpcy5jdXJyZW50U2VyaWVzSW5kZXggPSAwOyAvLyBhbHdheXMgZGlzcGxheSBmaXJzdCBzZXJpZXNcbiAgICB0aGlzLmxvYWRlZEltYWdlcyA9IFtdOyAvLyByZXNldCBsaXN0IG9mIGltYWdlcyBhbHJlYWR5IGxvYWRlZFxuXG4gICAgLy9cbiAgICAvLyBsb29wIHRocnUgYWxsIGltYWdlSWRzLCBsb2FkIGFuZCBjYWNoZSB0aGVtIGZvciBleGhpYml0aW9uICh1cCB0aGUgdGhlIG1heGltdW0gbGltaXQgZGVmaW5lZClcbiAgICAvL1xuICAgIGNvbnN0IG1heEltYWdlcyA9ICh0aGlzLm1heEltYWdlc1RvTG9hZCA8PSAwKSA/IGltYWdlSWRMaXN0Lmxlbmd0aCA6IE1hdGgubWluKHRoaXMubWF4SW1hZ2VzVG9Mb2FkLCBpbWFnZUlkTGlzdC5sZW5ndGgpO1xuICAgIHRoaXMubG9hZGluZ0ltYWdlcyA9IHRydWU7IC8vIGFjdGl2YXRlIHByb2dyZXNzIGluZGljYXRvclxuICAgIHRoaXMudGFyZ2V0SW1hZ2VDb3VudCA9IG1heEltYWdlcztcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbWF4SW1hZ2VzOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBpbWFnZUlkID0gaW1hZ2VJZExpc3RbaW5kZXhdO1xuICAgICAgY29ybmVyc3RvbmUubG9hZEFuZENhY2hlSW1hZ2UoaW1hZ2VJZCkudGhlbihpbWFnZURhdGEgPT4geyB0aGlzLmltYWdlTG9hZGVkKGltYWdlRGF0YSkgfSk7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogTG9hZCB0aGUgbmV4dCBiYXRjaCBvZiBpbWFnZXNcbiAgICovXG4gIHB1YmxpYyBsb2FkTW9yZUltYWdlcygpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLnZpZXdQb3J0LmVsZW1lbnQ7XG4gICAgLy9cbiAgICAvLyBsb29wIHRocnUgYWxsIGltYWdlSWRzLCBsb2FkIGFuZCBjYWNoZSB0aGVtIGZvciBleGhpYml0aW9uICh1cCB0aGUgdGhlIG1heGltdW0gbGltaXQgZGVmaW5lZClcbiAgICAvL1xuICAgIGNvbnN0IG1heEltYWdlcyA9ICh0aGlzLm1heEltYWdlc1RvTG9hZCA8PSAwKSA/ICh0aGlzLmltYWdlSWRMaXN0Lmxlbmd0aCAtIHRoaXMubG9hZGVkSW1hZ2VzLmxlbmd0aCkgOiBNYXRoLm1pbih0aGlzLm1heEltYWdlc1RvTG9hZCwgdGhpcy5pbWFnZUlkTGlzdC5sZW5ndGggLSB0aGlzLmxvYWRlZEltYWdlcy5sZW5ndGgpO1xuICAgIHRoaXMubG9hZGluZ0ltYWdlcyA9IHRydWU7IC8vIGFjdGl2YXRlIHByb2dyZXNzIGluZGljYXRvclxuICAgIHRoaXMudGFyZ2V0SW1hZ2VDb3VudCArPSBtYXhJbWFnZXM7XG4gICAgbGV0IG5leHRJbWFnZUluZGV4ID0gdGhpcy5sb2FkZWRJbWFnZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBtYXhJbWFnZXM7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGltYWdlSWQgPSB0aGlzLmltYWdlSWRMaXN0W25leHRJbWFnZUluZGV4KytdO1xuICAgICAgY29ybmVyc3RvbmUubG9hZEFuZENhY2hlSW1hZ2UoaW1hZ2VJZClcbiAgICAgICAgLnRoZW4oaW1hZ2VEYXRhID0+IHsgdGhpcy5pbWFnZUxvYWRlZChpbWFnZURhdGEpIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4geyB0aGlzLnRhcmdldEltYWdlQ291bnQtLTsgfSk7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGltYWdlRGF0YSB0aGUgZGljb20gaW1hZ2UgZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBpbWFnZUxvYWRlZChpbWFnZURhdGEpIHtcbiAgICAvL2NvbnNvbGUubG9nKGltYWdlRGF0YS5pbWFnZUlkKVxuICAgIC8vIGJ1aWxkIGxpc3Qgb2Ygc2VyaWVzIGluIGFsbCBsb2FkZGVkIGltYWdlc1xuICAgIGNvbnN0IHNlcmllcyA9IHtcbiAgICAgIHN0dWR5SUQ6IGltYWdlRGF0YS5kYXRhLnN0cmluZygneDAwMjAwMDBkJyksXG4gICAgICBzZXJpZXNJRDogaW1hZ2VEYXRhLmRhdGEuc3RyaW5nKCd4MDAyMDAwMGUnKSxcbiAgICAgIHNlcmllc051bWJlcjogaW1hZ2VEYXRhLmRhdGEuaW50U3RyaW5nKCd4MDAyMDAwMTEnKSxcbiAgICAgIHN0dWR5RGVzY3JpcHRpb246IGltYWdlRGF0YS5kYXRhLnN0cmluZygneDAwMDgxMDMwJyksXG4gICAgICBzZXJpZXNEZXNjcmlwdGlvbjogaW1hZ2VEYXRhLmRhdGEuc3RyaW5nKCd4MDAwODEwM2UnKSxcbiAgICAgIGltYWdlQ291bnQ6IDEsXG4gICAgICBpbWFnZUxpc3Q6IFtpbWFnZURhdGFdXG4gICAgfVxuICAgIC8vIGlmIHRoaXMgaXMgYSBuZXcgc2VyaWVzLCBhZGQgaXQgdG8gdGhlIGxpc3RcbiAgICBsZXQgc2VyaWVzSW5kZXggPSB0aGlzLnNlcmllc0xpc3QuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5zZXJpZXNJRCA9PT0gc2VyaWVzLnNlcmllc0lEKTtcbiAgICBpZiAoc2VyaWVzSW5kZXggPCAwKSB7XG4gICAgICBzZXJpZXNJbmRleCA9IHRoaXMuc2VyaWVzTGlzdC5sZW5ndGg7XG4gICAgICB0aGlzLnNlcmllc0xpc3QucHVzaChzZXJpZXMpO1xuICAgICAgdGhpcy5zZXJpZXNMaXN0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGEuc2VyaWVzTnVtYmVyID4gYi5zZXJpZXNOdW1iZXIpIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5zZXJpZXNOdW1iZXIgPCBiLnNlcmllc051bWJlcikgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzZXJpZXNJdGVtID0gdGhpcy5zZXJpZXNMaXN0W3Nlcmllc0luZGV4XTtcbiAgICAgIHNlcmllc0l0ZW0uaW1hZ2VDb3VudCsrO1xuICAgICAgc2VyaWVzSXRlbS5pbWFnZUxpc3QucHVzaChpbWFnZURhdGEpO1xuICAgICAgc2VyaWVzSXRlbS5pbWFnZUxpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYS5kYXRhLmludFN0cmluZygneDAwMjAwMDEzJykgPiBiLmRhdGEuaW50U3RyaW5nKCd4MDAyMDAwMTMnKSkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhLmRhdGEuaW50U3RyaW5nKCd4MDAyMDAwMTMnKSA8IGIuZGF0YS5pbnRTdHJpbmcoJ3gwMDIwMDAxMycpKSByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRlZEltYWdlcy5wdXNoKGltYWdlRGF0YSk7IC8vIHNhdmUgdG8gaW1hZ2VzIGxvYWRlZFxuXG4gICAgaWYgKHNlcmllc0luZGV4ID09PSB0aGlzLmN1cnJlbnRTZXJpZXNJbmRleCkge1xuICAgICAgLy90aGlzLmN1cnJlbnRTZXJpZXMgPSB0aGlzLnNlcmllc0xpc3Rbc2VyaWVzSW5kZXhdO1xuICAgICAgLy90aGlzLmltYWdlQ291bnQgPSB0aGlzLmN1cnJlbnRTZXJpZXMuaW1hZ2VDb3VudDsgLy8gZ2V0IHRvdGFsIGltYWdlIGNvdW50XG4gICAgICAvL3RoaXMudmlld1BvcnQuYWRkSW1hZ2VEYXRhKGltYWdlRGF0YSk7XG4gICAgICB0aGlzLnNob3dTZXJpZXModGhpcy5jdXJyZW50U2VyaWVzSW5kZXgpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9hZGVkSW1hZ2VzLmxlbmd0aCA+PSB0aGlzLnRhcmdldEltYWdlQ291bnQpIHsgLy8gZGlkIHdlIGZpbmlzaCBsb2FkaW5nIGltYWdlcz9cbiAgICAgIHRoaXMubG9hZGluZ0ltYWdlcyA9IGZhbHNlOyAvLyBkZWFjdGl2YXRlIHByb2dyZXNzIGluZGljYXRvclxuICAgIH1cblxuICB9XG5cbiAgcHVibGljIHNob3dTZXJpZXMoaW5kZXgpIHtcbiAgICAvLyAgICAgICAgdGhpcy5yZXNldEFsbFRvb2xzKCk7XG4gICAgdGhpcy5jdXJyZW50U2VyaWVzSW5kZXggPSBpbmRleDtcbiAgICB0aGlzLmN1cnJlbnRTZXJpZXMgPSB0aGlzLnNlcmllc0xpc3RbaW5kZXhdO1xuICAgIHRoaXMuaW1hZ2VDb3VudCA9IHRoaXMuY3VycmVudFNlcmllcy5pbWFnZUNvdW50OyAvLyBnZXQgdG90YWwgaW1hZ2UgY291bnRcbiAgICB0aGlzLnZpZXdQb3J0LnJlc2V0SW1hZ2VDYWNoZSgpOyAvLyBjbGVhbiB1cCBpbWFnZSBjYWNoZVxuICAgIC8vICAgICAgICB0aGlzLmxvYWRpbmdJbWFnZXMgPSB0cnVlOyAvLyBhY3RpdmF0ZSBwcm9ncmVzcyBpbmRpY2F0b3JcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY3VycmVudFNlcmllcy5pbWFnZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGltYWdlRGF0YSA9IHRoaXMuY3VycmVudFNlcmllcy5pbWFnZUxpc3RbaV07XG4gICAgICB0aGlzLnZpZXdQb3J0LmFkZEltYWdlRGF0YShpbWFnZURhdGEpO1xuICAgIH1cbiAgICAvLyAgICAgICAgdGhpcy5sb2FkaW5nSW1hZ2VzID0gZmFsc2U7IC8vIGRlLWFjdGl2YXRlIHByb2dyZXNzIGluZGljYXRvclxuICB9XG5cbiAgcHVibGljIHNhdmVBcygpIHtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLnNhdmVBcyh0aGlzLmVsZW1lbnQsIFwidGVzdGUuanBnXCIpXG4gIH1cblxuICAvKipcbiAgICogSW1hZ2Ugc2Nyb2xsIG1ldGhvZHNcbiAgICovXG4gIHB1YmxpYyBuZXh0SW1hZ2UoKSB7XG4gICAgaWYgKHRoaXMudmlld1BvcnQuY3VycmVudEluZGV4IDwgdGhpcy5pbWFnZUNvdW50KSB7XG4gICAgICB0aGlzLnZpZXdQb3J0Lm5leHRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwcmV2aW91c0ltYWdlKCkge1xuICAgIGlmICh0aGlzLnZpZXdQb3J0LmN1cnJlbnRJbmRleCA+IDApIHtcbiAgICAgIHRoaXMudmlld1BvcnQucHJldmlvdXNJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2RzIHRvIGFjdGl2YXRlL2RlYWN0aXZhdGUgdmlld2VyIHRvb2xzXG4gICAqL1xuXG4gIC8vIGRlYWN0aXZhdGUgYWxsIHRvb2xzXG4gIHB1YmxpYyByZXNldEFsbFRvb2xzKCkge1xuICAgIGlmICh0aGlzLmltYWdlQ291bnQgPiAwKSB7XG4gICAgICB0aGlzLnZpZXdQb3J0LnJlc2V0QWxsVG9vbHMoKVxuICAgICAgdGhpcy5zdG9wQ2xpcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGFjdGl2YXRlIHdpbmRvd2luZ1xuICBwdWJsaWMgZW5hYmxlV2luZG93aW5nKCkge1xuICAgIGlmICh0aGlzLmltYWdlQ291bnQgPiAwKSB7XG4gICAgICB0aGlzLnJlc2V0QWxsVG9vbHMoKTtcbiAgICAgIC8vIGNvcm5lcnN0b25lVG9vbHMud3d3Yy5hY3RpdmF0ZSh0aGlzLmVsZW1lbnQsIDEpO1xuICAgICAgLy8gY29ybmVyc3RvbmVUb29scy53d3djVG91Y2hEcmFnLmFjdGl2YXRlKHRoaXMuZWxlbWVudCk7XG4gICAgICBjb3JuZXJzdG9uZVRvb2xzLnNldFRvb2xBY3RpdmVGb3JFbGVtZW50KHRoaXMuZWxlbWVudCwgJ1d3d2MnLCB7IG1vdXNlQnV0dG9uTWFzazogMSB9LCBbJ01vdXNlJ10pO1xuXG4gICAgfVxuICB9XG5cbiAgLy8gYWN0aXZhdGUgem9vbVxuICBwdWJsaWMgZW5hYmxlWm9vbSgpIHtcbiAgICBpZiAodGhpcy5pbWFnZUNvdW50ID4gMCkge1xuICAgICAgdGhpcy5yZXNldEFsbFRvb2xzKCk7XG4gICAgICAvLyBjb3JuZXJzdG9uZVRvb2xzLnpvb20uYWN0aXZhdGUodGhpcy5lbGVtZW50LCA1KTsgLy8gNSBpcyByaWdodCBtb3VzZSBidXR0b24gYW5kIGxlZnQgbW91c2UgYnV0dG9uXG4gICAgICAvLyBjb3JuZXJzdG9uZVRvb2xzLnpvb21Ub3VjaERyYWcuYWN0aXZhdGUodGhpcy5lbGVtZW50KTtcbiAgICAgIGNvcm5lcnN0b25lVG9vbHMuc2V0VG9vbEFjdGl2ZUZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnWm9vbScsIHsgbW91c2VCdXR0b25NYXNrOiAxIH0sIFsnTW91c2UnXSk7IC8vIHpvb20gbGVmdCBtb3VzZVxuICAgICAgLy8gY29ybmVyc3RvbmVUb29scy5zZXRUb29sQWN0aXZlRm9yRWxlbWVudCh0aGlzLmVsZW1lbnQsICdab29tVG91Y2hQaW5jaCcsIHsgfSwgWydNb3VzZSddKTtcbiAgICAgIGNvcm5lcnN0b25lVG9vbHMuc2V0VG9vbEFjdGl2ZUZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnUGFuJywgeyBtb3VzZUJ1dHRvbk1hc2s6IDIgfSwgWydNb3VzZSddKTsgLy8gcGFuIHJpZ2h0IG1vdXNlXG5cbiAgICB9XG4gIH1cblxuICAvLyBhY3RpdmF0ZSBwYW5cbiAgcHVibGljIGVuYWJsZVBhbigpIHtcbiAgICBpZiAodGhpcy5pbWFnZUNvdW50ID4gMCkge1xuICAgICAgdGhpcy5yZXNldEFsbFRvb2xzKCk7XG4gICAgICAvLyBjb3JuZXJzdG9uZVRvb2xzLnBhbi5hY3RpdmF0ZSh0aGlzLmVsZW1lbnQsIDMpOyAvLyAzIGlzIG1pZGRsZSBtb3VzZSBidXR0b24gYW5kIGxlZnQgbW91c2UgYnV0dG9uXG4gICAgICAvLyBjb3JuZXJzdG9uZVRvb2xzLnBhblRvdWNoRHJhZy5hY3RpdmF0ZSh0aGlzLmVsZW1lbnQpO1xuICAgICAgY29ybmVyc3RvbmVUb29scy5zZXRUb29sQWN0aXZlRm9yRWxlbWVudCh0aGlzLmVsZW1lbnQsICdQYW4nLCB7IG1vdXNlQnV0dG9uTWFzazogMSB9LCBbJ01vdXNlJ10pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGFjdGl2YXRlIGltYWdlIHNjcm9sbFxuICBwdWJsaWMgZW5hYmxlU2Nyb2xsKCkge1xuICAgIGlmICh0aGlzLmltYWdlQ291bnQgPiAwKSB7XG4gICAgICB0aGlzLnJlc2V0QWxsVG9vbHMoKTtcbiAgICAgIC8vIGNvcm5lcnN0b25lVG9vbHMuc3RhY2tTY3JvbGwuYWN0aXZhdGUodGhpcy5lbGVtZW50LCAxKTtcbiAgICAgIC8vIGNvcm5lcnN0b25lVG9vbHMuc3RhY2tTY3JvbGxUb3VjaERyYWcuYWN0aXZhdGUodGhpcy5lbGVtZW50KTtcbiAgICAgIC8vIGNvcm5lcnN0b25lVG9vbHMuc3RhY2tTY3JvbGxLZXlib2FyZC5hY3RpdmF0ZSh0aGlzLmVsZW1lbnQpO1xuICAgICAgY29ybmVyc3RvbmVUb29scy5zZXRUb29sQWN0aXZlRm9yRWxlbWVudCh0aGlzLmVsZW1lbnQsICdTdGFja1Njcm9sbCcsIHsgbW91c2VCdXR0b25NYXNrOiAxIH0sIFsnTW91c2UnXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gYWN0aXZhdGUgbGVuZ3RoIG1lYXN1cmVtZW50XG4gIHB1YmxpYyBlbmFibGVMZW5ndGgoKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VDb3VudCA+IDApIHtcbiAgICAgIHRoaXMucmVzZXRBbGxUb29scygpO1xuICAgICAgLy8gY29ybmVyc3RvbmVUb29scy5sZW5ndGguYWN0aXZhdGUodGhpcy5lbGVtZW50LCAxKTtcbiAgICAgIGNvcm5lcnN0b25lVG9vbHMuc2V0VG9vbEFjdGl2ZUZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnTGVuZ3RoJywgeyBtb3VzZUJ1dHRvbk1hc2s6IDEgfSwgWydNb3VzZSddKTtcbiAgICB9XG4gIH1cblxuICAvLyBhY3RpdmF0ZSBhbmdsZSBtZWFzdXJlbWVudFxuICBwdWJsaWMgZW5hYmxlQW5nbGUoKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VDb3VudCA+IDApIHtcbiAgICAgIHRoaXMucmVzZXRBbGxUb29scygpO1xuICAgICAgLy8gY29ybmVyc3RvbmVUb29scy5zaW1wbGVBbmdsZS5hY3RpdmF0ZSh0aGlzLmVsZW1lbnQsIDEpO1xuICAgICAgY29ybmVyc3RvbmVUb29scy5zZXRUb29sQWN0aXZlRm9yRWxlbWVudCh0aGlzLmVsZW1lbnQsICdBbmdsZScsIHsgbW91c2VCdXR0b25NYXNrOiAxIH0sIFsnTW91c2UnXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gYWN0aXZhdGUgcGl4ZWwgcHJvYmVcbiAgcHVibGljIGVuYWJsZVByb2JlKCkge1xuICAgIGlmICh0aGlzLmltYWdlQ291bnQgPiAwKSB7XG4gICAgICB0aGlzLnJlc2V0QWxsVG9vbHMoKTtcbiAgICAgIC8vIGNvcm5lcnN0b25lVG9vbHMucHJvYmUuYWN0aXZhdGUodGhpcy5lbGVtZW50LCAxKTtcbiAgICAgIGNvcm5lcnN0b25lVG9vbHMuc2V0VG9vbEFjdGl2ZUZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnUHJvYmUnLCB7IG1vdXNlQnV0dG9uTWFzazogMSB9LCBbJ01vdXNlJ10pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGFjdGl2YXRlIEVsbGlwdGljYWwgUk9JXG4gIHB1YmxpYyBlbmFibGVFbGxpcHRpY2FsKCkge1xuICAgIGlmICh0aGlzLmltYWdlQ291bnQgPiAwKSB7XG4gICAgICB0aGlzLnJlc2V0QWxsVG9vbHMoKTtcbiAgICAgIC8vIGNvcm5lcnN0b25lVG9vbHMuZWxsaXB0aWNhbFJvaS5hY3RpdmF0ZSh0aGlzLmVsZW1lbnQsIDEpO1xuICAgICAgY29ybmVyc3RvbmVUb29scy5zZXRUb29sQWN0aXZlRm9yRWxlbWVudCh0aGlzLmVsZW1lbnQsICdFbGxpcHRpY2FsUm9pJywgeyBtb3VzZUJ1dHRvbk1hc2s6IDEgfSwgWydNb3VzZSddKTtcbiAgICB9XG4gIH1cblxuICAvLyBhY3RpdmF0ZSBSZWN0YW5nbGUgUk9JXG4gIHB1YmxpYyBlbmFibGVSZWN0YW5nbGUoKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VDb3VudCA+IDApIHtcbiAgICAgIHRoaXMucmVzZXRBbGxUb29scygpO1xuICAgICAgLy8gY29ybmVyc3RvbmVUb29scy5yZWN0YW5nbGVSb2kuYWN0aXZhdGUodGhpcy5lbGVtZW50LCAxKTtcbiAgICAgIGNvcm5lcnN0b25lVG9vbHMuc2V0VG9vbEFjdGl2ZUZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnUmVjdGFuZ2xlUm9pJywgeyBtb3VzZUJ1dHRvbk1hc2s6IDEgfSwgWydNb3VzZSddKTtcbiAgICB9XG4gIH1cblxuICAvLyBQbGF5IENsaXBcbiAgcHVibGljIHBsYXlDbGlwKCkge1xuICAgIGlmICh0aGlzLmltYWdlQ291bnQgPiAwKSB7XG4gICAgICBsZXQgZnJhbWVSYXRlID0gMTA7XG4gICAgICBsZXQgc3RhY2tTdGF0ZSA9IGNvcm5lcnN0b25lVG9vbHMuZ2V0VG9vbFN0YXRlKHRoaXMuZWxlbWVudCwgJ3N0YWNrJyk7XG4gICAgICBpZiAoc3RhY2tTdGF0ZSkge1xuICAgICAgICBmcmFtZVJhdGUgPSBzdGFja1N0YXRlLmRhdGFbMF0uZnJhbWVSYXRlO1xuICAgICAgICAvLyBQbGF5IGF0IGEgZGVmYXVsdCAxMCBGUFMgaWYgdGhlIGZyYW1lcmF0ZSBpcyBub3Qgc3BlY2lmaWVkXG4gICAgICAgIGlmIChmcmFtZVJhdGUgPT09IHVuZGVmaW5lZCB8fCBmcmFtZVJhdGUgPT09IG51bGwgfHwgZnJhbWVSYXRlID09PSAwKSB7XG4gICAgICAgICAgZnJhbWVSYXRlID0gMTA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvcm5lcnN0b25lVG9vbHMucGxheUNsaXAodGhpcy5lbGVtZW50LCBmcmFtZVJhdGUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN0b3AgQ2xpcFxuICBwdWJsaWMgc3RvcENsaXAoKSB7XG4gICAgY29ybmVyc3RvbmVUb29scy5zdG9wQ2xpcCh0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgLy8gaW52ZXJ0IGltYWdlXG4gIHB1YmxpYyBpbnZlcnRJbWFnZSgpIHtcbiAgICBpZiAodGhpcy5pbWFnZUNvdW50ID4gMCkge1xuICAgICAgbGV0IHZpZXdwb3J0ID0gY29ybmVyc3RvbmUuZ2V0Vmlld3BvcnQodGhpcy5lbGVtZW50KTtcbiAgICAgIC8vIFRvZ2dsZSBpbnZlcnRcbiAgICAgIGlmICh2aWV3cG9ydC5pbnZlcnQgPT09IHRydWUpIHtcbiAgICAgICAgdmlld3BvcnQuaW52ZXJ0ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2aWV3cG9ydC5pbnZlcnQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgY29ybmVyc3RvbmUuc2V0Vmlld3BvcnQodGhpcy5lbGVtZW50LCB2aWV3cG9ydCk7XG4gICAgfVxuICB9XG5cbiAgLy8gcmVzZXQgaW1hZ2VcbiAgcHVibGljIHJlc2V0SW1hZ2UoKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VDb3VudCA+IDApIHtcbiAgICAgIGxldCB0b29sU3RhdGVNYW5hZ2VyID0gY29ybmVyc3RvbmVUb29scy5nZXRFbGVtZW50VG9vbFN0YXRlTWFuYWdlcih0aGlzLmVsZW1lbnQpO1xuICAgICAgLy8gTm90ZSB0aGF0IHRoaXMgb25seSB3b3JrcyBvbiBJbWFnZUlkLXNwZWNpZmljIHRvb2wgc3RhdGUgbWFuYWdlcnMgKGZvciBub3cpXG4gICAgICAvL3Rvb2xTdGF0ZU1hbmFnZXIuY2xlYXIodGhpcy5lbGVtZW50KTtcbiAgICAgIGNvcm5lcnN0b25lVG9vbHMuY2xlYXJUb29sU3RhdGUodGhpcy5lbGVtZW50LCBcIkxlbmd0aFwiKTtcbiAgICAgIGNvcm5lcnN0b25lVG9vbHMuY2xlYXJUb29sU3RhdGUodGhpcy5lbGVtZW50LCBcIkFuZ2xlXCIpO1xuICAgICAgLy8gY29ybmVyc3RvbmVUb29scy5jbGVhclRvb2xTdGF0ZSh0aGlzLmVsZW1lbnQsIFwic2ltcGxlQW5nbGVcIik7XG4gICAgICBjb3JuZXJzdG9uZVRvb2xzLmNsZWFyVG9vbFN0YXRlKHRoaXMuZWxlbWVudCwgXCJQcm9iZVwiKTtcbiAgICAgIGNvcm5lcnN0b25lVG9vbHMuY2xlYXJUb29sU3RhdGUodGhpcy5lbGVtZW50LCBcIkVsbGlwdGljYWxSb2lcIik7XG4gICAgICBjb3JuZXJzdG9uZVRvb2xzLmNsZWFyVG9vbFN0YXRlKHRoaXMuZWxlbWVudCwgXCJSZWN0YW5nbGVSb2lcIik7XG4gICAgICBjb3JuZXJzdG9uZS51cGRhdGVJbWFnZSh0aGlzLmVsZW1lbnQpO1xuICAgICAgdGhpcy5yZXNldEFsbFRvb2xzKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFySW1hZ2UoKSB7XG4gICAgdGhpcy52aWV3UG9ydC5yZXNldFZpZXdlcigpO1xuICAgIHRoaXMudmlld1BvcnQucmVzZXRJbWFnZUNhY2hlKCk7XG4gICAgdGhpcy5zZXJpZXNMaXN0ID0gW107IC8vIGxpc3Qgb2Ygc2VyaWVzIG9uIHRoZSBpbWFnZXMgYmVpbmcgZGlzcGxheWVkXG4gICAgdGhpcy5jdXJyZW50U2VyaWVzSW5kZXggPSAwO1xuICAgIHRoaXMuY3VycmVudFNlcmllcyA9IHt9O1xuICAgIHRoaXMuaW1hZ2VDb3VudCA9IDA7IC8vIHRvdGFsIGltYWdlIGNvdW50IGJlaW5nIHZpZXdlZFxuXG4gIH1cbn1cbiJdfQ==