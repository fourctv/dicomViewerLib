import { ElementRef, OnInit, AfterViewChecked } from '@angular/core';
export declare class ThumbnailDirective implements OnInit, AfterViewChecked {
    private elementRef;
    imageData: any;
    element: any;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    refresh(): void;
    setImageData(image: any): void;
}
