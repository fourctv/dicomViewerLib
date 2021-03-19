import { Directive, ElementRef, Input } from '@angular/core';
export class ThumbnailDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGh1bWJuYWlsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2RpY29tLXZpZXdlci9zcmMvbGliL3RodW1ibmFpbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVUsS0FBSyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQVV2RixNQUFNLE9BQU8sa0JBQWtCO0lBTTdCLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDMUMsQ0FBQztJQUVELFFBQVE7UUFDVCxrQ0FBa0M7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUU3QyxzQ0FBc0M7UUFDdEMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sWUFBWSxDQUFDLEtBQUs7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbEMsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RGLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2pFLHVDQUF1QztZQUN2QyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDeEM7SUFFSCxDQUFDOzs7WUF4Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2FBQ3hCOzs7WUFSbUIsVUFBVTs7O3dCQVkzQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkluaXQsIElucHV0LCBBZnRlclZpZXdDaGVja2VkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuZGVjbGFyZSBjb25zdCBjb3JuZXJzdG9uZTtcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdGh1bWJuYWlsXScsXG59KVxuXG5leHBvcnQgY2xhc3MgVGh1bWJuYWlsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkIHtcblxuICBASW5wdXQoKSBwdWJsaWMgaW1hZ2VEYXRhOiBhbnk7XG5cbiAgcHVibGljIGVsZW1lbnQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuIC8vIFJldHJpZXZlIHRoZSBET00gZWxlbWVudCBpdHNlbGZcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIC8vIEVuYWJsZSB0aGUgZWxlbWVudCB3aXRoIENvcm5lcnN0b25lXG4gICAgY29ybmVyc3RvbmUuZW5hYmxlKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5zZXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgcHVibGljIHJlZnJlc2goKSB7XG4gICAgdGhpcy5zZXRJbWFnZURhdGEodGhpcy5pbWFnZURhdGEpO1xuICB9XG5cbiAgcHVibGljIHNldEltYWdlRGF0YShpbWFnZSkge1xuICAgIHRoaXMuaW1hZ2VEYXRhID0gaW1hZ2U7XG4gICAgaWYgKHRoaXMuaW1hZ2VEYXRhICYmIHRoaXMuZWxlbWVudCkge1xuICAgICAgY29uc3Qgdmlld3BvcnQgPSBjb3JuZXJzdG9uZS5nZXREZWZhdWx0Vmlld3BvcnRGb3JJbWFnZSh0aGlzLmVsZW1lbnQsIHRoaXMuaW1hZ2VEYXRhKTtcbiAgICAgIGNvcm5lcnN0b25lLmRpc3BsYXlJbWFnZSh0aGlzLmVsZW1lbnQsIHRoaXMuaW1hZ2VEYXRhLCB2aWV3cG9ydCk7XG4gICAgICAvLyBGaXQgdGhlIGltYWdlIHRvIHRoZSB2aWV3cG9ydCB3aW5kb3dcbiAgICAgIGNvcm5lcnN0b25lLmZpdFRvV2luZG93KHRoaXMuZWxlbWVudCk7XG4gICAgICBjb3JuZXJzdG9uZS5yZXNpemUodGhpcy5lbGVtZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgfVxufVxuIl19