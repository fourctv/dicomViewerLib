import { OnInit } from '@angular/core';
import { CornerstoneDirective } from './cornerstone.directive';
import { ThumbnailDirective } from './thumbnail.directive';
import * as ɵngcc0 from '@angular/core';
export declare class DICOMViewerComponent implements OnInit {
    enableViewerTools: boolean;
    enablePlayTools: boolean;
    downloadImagesURL: string;
    maxImagesToLoad: number;
    seriesList: any[];
    currentSeriesIndex: number;
    currentSeries: any;
    imageCount: number;
    get hidePreviousImage(): any;
    get hideNextImage(): any;
    get moreImagestoLoad(): string;
    loadingImages: boolean;
    get showProgress(): any;
    viewPort: CornerstoneDirective;
    thumbnails: Array<ThumbnailDirective>;
    private loadedImages;
    private imageIdList;
    private element;
    private targetImageCount;
    constructor();
    ngOnInit(): void;
    /**
     * Load dicom images for display
     *
     * @param imageIdList list of imageIds to load and display
     */
    loadStudyImages(imageIdList: Array<any>): void;
    /**
     * Load the next batch of images
     */
    loadMoreImages(): void;
    /**
     *
     * @param imageData the dicom image data
     */
    private imageLoaded;
    showSeries(index: any): void;
    saveAs(): void;
    /**
     * Image scroll methods
     */
    nextImage(): void;
    previousImage(): void;
    /**
     * Methods to activate/deactivate viewer tools
     */
    resetAllTools(): void;
    enableWindowing(): void;
    enableZoom(): void;
    enablePan(): void;
    enableScroll(): void;
    enableLength(): void;
    enableAngle(): void;
    enableProbe(): void;
    enableElliptical(): void;
    enableRectangle(): void;
    playClip(): void;
    stopClip(): void;
    invertImage(): void;
    resetImage(): void;
    clearImage(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DICOMViewerComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<DICOMViewerComponent, "dicom-viewer", never, { "enableViewerTools": "enableViewerTools"; "enablePlayTools": "enablePlayTools"; "downloadImagesURL": "downloadImagesURL"; "maxImagesToLoad": "maxImagesToLoad"; }, {}, never, never>;
}

//# sourceMappingURL=dicom-viewer.component.d.ts.map