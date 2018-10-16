import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { CornerstoneDirective } from './cornerstone.directive';



declare const cornerstone;
declare const cornerstoneTools;

@Component({
    selector: 'dicom-viewer',
    templateUrl: './dicom-viewer.component.html',
    styleUrls: ['./dicom-viewer.component.css']
})
export class DICOMViewerComponent implements AfterViewInit {

    @Input()public enableViewerTools = false; // enable viewer tools
    @Input()public downloadImagesURL = '' // download images URL
    @Input()public maxImagesToLoad = 20; // limit for the automatic loading of study images

    public seriesList = []; // list of series on the images being displayed
    public currentSeriesIndex = 0;
    public currentSeries:any = {};
    public imageCount = 0; // total image count being viewed

    // control enable/disable image scroll buttons
    public get hidePreviousImage(): any { return { color: (this.viewPort.currentIndex < 1) ? 'black' : 'white' }; }
    public get hideNextImage(): any { return { color: (this.viewPort.currentIndex >= (this.imageCount - 1)) ? 'black' : 'white' }; }

    // control message for more images to load
    public get moreImagestoLoad():string {
        if (this.loadedImages.length < this.imageIdList.length && !this.loadingImages) { // are there any more images to load?
            const imagesToLoad = (this.maxImagesToLoad <= 0)?(this.imageIdList.length - this.loadedImages.length):Math.min(this.maxImagesToLoad,this.imageIdList.length - this.loadedImages.length);
            return 'load next '+imagesToLoad+' images';
        } else return '';
    }

    // control exhibition of a loading images progress indicator
    public loadingImages = false;
    public get showProgress(): any { return { display: (this.loadingImages) ? 'inline-block' : 'none' } };

    @ViewChild(CornerstoneDirective) viewPort: CornerstoneDirective; // the main cornertone view port
    
    private loadedImages = [];
    private imageIdList = [];
    private element:any;

    constructor() {}

    ngAfterViewInit() {
        this.element = this.viewPort.element;
    }

    /**
     * Load dicom images for display
     * 
     * @param imageIdList list of imageIds to load and display
     */
    loadStudyImages(imageIdList: Array<any>) {
        this.imageIdList = imageIdList;
        this.viewPort.resetImageCache(); // clean up image cache
        this.seriesList = []; // start a new series list
        this.currentSeriesIndex = 0; // always display first series
        this.loadedImages = []; // reset list of images already loaded
        
        //
        // loop thru all imageIds, load and cache them for exhibition (up the the maximum limit defined)
        //
        const maxImages = (this.maxImagesToLoad <= 0)?imageIdList.length:Math.min(this.maxImagesToLoad,imageIdList.length);
        this.loadingImages = true; // activate progress indicator
        for (let index = 0; index < maxImages; index++) {
            const imageId = imageIdList[index];
            cornerstone.loadAndCacheImage(imageId).then(imageData => {this.imageLoaded(imageData, index, maxImages)});  
        }

    }

    /**
     * Load the next batch of images
     */
    public loadMoreImages() {
        //
        // loop thru all imageIds, load and cache them for exhibition (up the the maximum limit defined)
        //
        const maxImages = (this.maxImagesToLoad <= 0)?(this.imageIdList.length - this.loadedImages.length):Math.min(this.maxImagesToLoad,this.imageIdList.length - this.loadedImages.length);
        this.loadingImages = true; // activate progress indicator
        let nextImageIndex = this.loadedImages.length;
        for (let index = 0; index < maxImages; index++) {
            const imageId = this.imageIdList[nextImageIndex++];
            cornerstone.loadAndCacheImage(imageId).then(imageData => {this.imageLoaded(imageData, index, maxImages)});  
        }

    }

    /**
     * 
     * @param imageData the dicom image data
     * @param imageIndex the image index loades
     * @param maxImages max images to load
     */
    private imageLoaded(imageData, imageIndex, maxImages) {
        console.log(imageData.imageId)
               // build list of series in all loadded images
                const series = {
                    studyID: imageData.data.string('x0020000d'),
                    seriesID: imageData.data.string('x0020000d'),
                    seriesNumber: imageData.data.intString('x00200011'),
                    studyDescription: imageData.data.string('x00081030'),
                    seriesDescription: imageData.data.string('x0008103e'),
                    imageCount: 1,
                    imageList: [imageData]
                }
                // if this is a new series, add it to the list
                let seriesIndex = this.seriesList.findIndex(item => item.seriesID === series.seriesID);
                if (seriesIndex < 0) {
                    seriesIndex = this.seriesList.length;
                    this.seriesList.push(series);
                } else {
                    let seriesItem = this.seriesList[seriesIndex];
                    seriesItem.imageCount++;
                    seriesItem.imageList.push(imageData);
                }
    
                if (seriesIndex === this.currentSeriesIndex) {
                    this.currentSeries = this.seriesList[seriesIndex];
                    this.imageCount = this.currentSeries.imageCount; // get total image count
                    this.viewPort.addImageData(imageData);
                }

                this.loadedImages.push(imageData); // save to images loaded
    
                if ((imageIndex+1) >= maxImages) { // did we finish loading images?
                    this.loadingImages = false; // deactivate progress indicator
                }

    }

    public showSeries(index) {
        this.resetAllTools();
        this.currentSeriesIndex = index;
        this.currentSeries = this.seriesList[index];
        this.imageCount = this.currentSeries.imageCount; // get total image count
        this.viewPort.resetImageCache(); // clean up image cache
        this.loadingImages = true; // activate progress indicator
        for (let i = 0; i < this.currentSeries.imageList.length; i++) {
            const imageData = this.currentSeries.imageList[i];
            this.viewPort.addImageData(imageData);
        }
        this.loadingImages = false; // de-activate progress indicator
   }

   public saveAs() {
    cornerstoneTools.saveAs(this.element,"teste.jpg")
   }

    /**
     * Image scroll methods
     */
    public nextImage() {
        if (this.viewPort.currentIndex < this.imageCount) {
            this.viewPort.nextImage();
        }
    }

    public previousImage() {
        if (this.viewPort.currentIndex > 0) {
            this.viewPort.previousImage();
        }
    }

    /**
     * Methods to activate/deactivate viewer tools
     */

    // deactivate all tools
    public resetAllTools() {
        if (this.imageCount > 0) {
            cornerstoneTools.wwwc.deactivate(this.element, 1);
            cornerstoneTools.pan.deactivate(this.element, 1);
            cornerstoneTools.zoom.deactivate(this.element, 1);
            cornerstoneTools.probe.deactivate(this.element, 1);
            cornerstoneTools.length.deactivate(this.element, 1);
            cornerstoneTools.simpleAngle.deactivate(this.element, 1);
            cornerstoneTools.ellipticalRoi.deactivate(this.element, 1);
            cornerstoneTools.rectangleRoi.deactivate(this.element, 1);
            cornerstoneTools.stackScroll.deactivate(this.element, 1);
            cornerstoneTools.wwwcTouchDrag.deactivate(this.element);
            cornerstoneTools.zoomTouchDrag.deactivate(this.element);
            cornerstoneTools.panTouchDrag.deactivate(this.element);
            cornerstoneTools.stackScrollTouchDrag.deactivate(this.element);
            this.stopClip();
        }
    }

    // activate windowing
    public enableWindowing() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            cornerstoneTools.wwwc.activate(this.element, 1);
            cornerstoneTools.wwwcTouchDrag.activate(this.element);
        }
    }

    // activate zoom
    public enableZoom() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            cornerstoneTools.zoom.activate(this.element, 5); // 5 is right mouse button and left mouse button
            cornerstoneTools.zoomTouchDrag.activate(this.element);
        }
    }

    // activate pan
    public enablePan() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            cornerstoneTools.pan.activate(this.element, 3); // 3 is middle mouse button and left mouse button
            cornerstoneTools.panTouchDrag.activate(this.element);
        }
    }

    // activate image scroll
    public enableScroll() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            cornerstoneTools.stackScroll.activate(this.element, 1);
            cornerstoneTools.stackScrollTouchDrag.activate(this.element);
            cornerstoneTools.stackScrollKeyboard.activate(this.element);
        }
    }

    // activate length measurement
    public enableLength() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            cornerstoneTools.length.activate(this.element, 1);
        }
    }

    // activate angle measurement
    public enableAngle() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            cornerstoneTools.simpleAngle.activate(this.element, 1);
        }
    }

    // activate pixel probe
    public enableProbe() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            cornerstoneTools.probe.activate(this.element, 1);
        }
    }

    // activate Elliptical ROI
    public enableElliptical() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            cornerstoneTools.ellipticalRoi.activate(this.element, 1);
        }
    }

    // activate Rectangle ROI
    public enableRectangle() {
        if (this.imageCount > 0) {
            this.resetAllTools();
            cornerstoneTools.rectangleRoi.activate(this.element, 1);
        }
    }

    // Play Clip
    public playClip() {
        if (this.imageCount > 0) {
            let frameRate = 10;
            let stackState = cornerstoneTools.getToolState(this.element, 'stack');
            if (stackState) {
                frameRate = stackState.data[0].frameRate;
                // Play at a default 10 FPS if the framerate is not specified
                if (frameRate === undefined) {
                    frameRate = 10;
                }
            }
            cornerstoneTools.playClip(this.element, frameRate);
        }
    }

    // Stop Clip
    public stopClip() {
        cornerstoneTools.stopClip(this.element);
    }

    // invert image
    public invertImage() {
        if (this.imageCount > 0) {
            let viewport = cornerstone.getViewport(this.element);
            // Toggle invert
            if (viewport.invert === true) {
                viewport.invert = false;
            } else {
                viewport.invert = true;
            }
            cornerstone.setViewport(this.element, viewport);
        }
    }

    // reset image
    public resetImage() {
        if (this.imageCount > 0) {
            let toolStateManager = cornerstoneTools.getElementToolStateManager(this.element);
            // Note that this only works on ImageId-specific tool state managers (for now)
            //toolStateManager.clear(this.element);
            cornerstoneTools.clearToolState(this.element, "length");
            cornerstoneTools.clearToolState(this.element, "angle");
            cornerstoneTools.clearToolState(this.element, "simpleAngle");
            cornerstoneTools.clearToolState(this.element, "probe");
            cornerstoneTools.clearToolState(this.element, "ellipticalRoi");
            cornerstoneTools.clearToolState(this.element, "rectangleRoi");
            cornerstone.updateImage(this.element);
            this.resetAllTools();
        }
    }

}
