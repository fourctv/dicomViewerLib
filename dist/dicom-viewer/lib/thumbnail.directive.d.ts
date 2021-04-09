import { ElementRef, OnInit, AfterViewChecked } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class ThumbnailDirective implements OnInit, AfterViewChecked {
    private elementRef;
    imageData: any;
    element: any;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    refresh(): void;
    setImageData(image: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ThumbnailDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<ThumbnailDirective, "[thumbnail]", never, { "imageData": "imageData"; }, {}, never>;
}

//# sourceMappingURL=thumbnail.directive.d.ts.map