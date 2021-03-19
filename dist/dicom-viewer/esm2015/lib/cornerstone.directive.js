import { Directive, ElementRef, HostListener } from '@angular/core';
import * as Hammer from 'hammerjs';
export class CornerstoneDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ybmVyc3RvbmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZGljb20tdmlld2VyL3NyYy9saWIvY29ybmVyc3RvbmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxLQUFLLE1BQU0sTUFBTSxVQUFVLENBQUM7QUFjbkMsTUFBTSxPQUFPLG9CQUFvQjtJQThDL0IsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQTFDbkMsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNkLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLGdCQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsd0RBQXdEO1FBQzFFLGFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyw0REFBNEQ7UUFDM0UsbUJBQWMsR0FBRyxFQUFFLENBQUMsQ0FBQyxzREFBc0Q7UUFFbEYsMkJBQTJCO1FBQ25CLGFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7UUFDckMsWUFBTyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztRQUNuQyxhQUFRLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO1FBQ3JDLGNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7UUFDdkMsZUFBVSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztRQUN6QyxjQUFTLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFHLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDO1FBQ3ZELHFCQUFnQixHQUFHLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO1FBQ3JELGtCQUFhLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO1FBQy9DLHVC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Q0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEUsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuRSxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDMUUsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN6RSxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3RFLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUMzRSxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzFFLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDeEUsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7OztZQWxRRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7YUFDMUI7OztZQWJtQixVQUFVOzs7dUJBZ0UzQixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOzJCQU94QyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE9uSW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgSGFtbWVyIGZyb20gJ2hhbW1lcmpzJztcblxuXG5kZWNsYXJlIGNvbnN0IGNvcm5lcnN0b25lO1xuZGVjbGFyZSBjb25zdCBjb3JuZXJzdG9uZVRvb2xzO1xuZGVjbGFyZSBjb25zdCBjb3JuZXJzdG9uZU1hdGg7XG5cblxuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjb3JuZXJzdG9uZV0nLFxufSlcblxuZXhwb3J0IGNsYXNzIENvcm5lcnN0b25lRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkIHtcblxuICBwdWJsaWMgZWxlbWVudDogYW55O1xuXG4gIHB1YmxpYyBpbWFnZUxpc3QgPSBbXTtcbiAgcHJpdmF0ZSBpbWFnZUlkTGlzdCA9IFtdO1xuICBwdWJsaWMgY3VycmVudEluZGV4ID0gMDtcbiAgcHVibGljIGN1cnJlbnRJbWFnZTogYW55O1xuICBwdWJsaWMgcGF0aWVudE5hbWUgPSAnJzsgLy8gY3VycmVudCBpbWFnZSBQYXRpZW50IG5hbWUsIGRvIGRpc3BsYXkgb24gdGhlIG92ZXJsYXlcbiAgcHVibGljIGhvc3BpdGFsID0gJyc7IC8vIGN1cnJlbnQgaW1hZ2UgSW5zdGl0dXRpb24gbmFtZSwgdG8gZGlzcGxheSBvbiB0aGUgb3ZlcmxheVxuICBwdWJsaWMgaW5zdGFuY2VOdW1iZXIgPSAnJzsgLy8gY3VycmVudCBpbWFnZSBJbnN0YW5jZSAjLCB0byBkaXNwbGF5IG9uIHRoZSBvdmVybGF5XG5cbiAgLy8gY29ybmVyc1RvbmUgVG9vbHMgd2UgdXNlXG4gIHByaXZhdGUgV3d3Y1Rvb2wgPSBjb3JuZXJzdG9uZVRvb2xzLld3d2NUb29sO1xuICBwcml2YXRlIFBhblRvb2wgPSBjb3JuZXJzdG9uZVRvb2xzLlBhblRvb2w7XG4gIHByaXZhdGUgWm9vbVRvb2wgPSBjb3JuZXJzdG9uZVRvb2xzLlpvb21Ub29sO1xuICBwcml2YXRlIFByb2JlVG9vbCA9IGNvcm5lcnN0b25lVG9vbHMuUHJvYmVUb29sO1xuICBwcml2YXRlIExlbmd0aFRvb2wgPSBjb3JuZXJzdG9uZVRvb2xzLkxlbmd0aFRvb2w7XG4gIHByaXZhdGUgQW5nbGVUb29sID0gY29ybmVyc3RvbmVUb29scy5BbmdsZVRvb2w7XG4gIHByaXZhdGUgRWxsaXB0aWNhbFJvaVRvb2wgPSBjb3JuZXJzdG9uZVRvb2xzLkVsbGlwdGljYWxSb2lUb29sO1xuICBwcml2YXRlIFJlY3RhbmdsZVJvaVRvb2wgPSBjb3JuZXJzdG9uZVRvb2xzLlJlY3RhbmdsZVJvaVRvb2w7XG4gIHByaXZhdGUgRHJhZ1Byb2JlVG9vbCA9IGNvcm5lcnN0b25lVG9vbHMuRHJhZ1Byb2JlVG9vbDtcbiAgcHJpdmF0ZSBab29tVG91Y2hQaW5jaFRvb2wgPSBjb3JuZXJzdG9uZVRvb2xzLlpvb21Ub3VjaFBpbmNoVG9vbDtcbiAgcHJpdmF0ZSBQYW5NdWx0aVRvdWNoVG9vbCA9IGNvcm5lcnN0b25lVG9vbHMuUGFuTXVsdGlUb3VjaFRvb2w7XG4gIHByaXZhdGUgU3RhY2tTY3JvbGxUb29sID0gY29ybmVyc3RvbmVUb29scy5TdGFja1Njcm9sbFRvb2w7XG4gIHByaXZhdGUgU3RhY2tTY3JvbGxNb3VzZVdoZWVsVG9vbCA9IGNvcm5lcnN0b25lVG9vbHMuU3RhY2tTY3JvbGxNb3VzZVdoZWVsVG9vbDtcblxuXG4gIHB1YmxpYyBnZXQgd2luZG93aW5nVmFsdWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5pc0Nvcm5lcnN0b25lRW5hYmxlZCkge1xuICAgICAgbGV0IHZpZXdwb3J0ID0gY29ybmVyc3RvbmUuZ2V0Vmlld3BvcnQodGhpcy5lbGVtZW50KTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRJbWFnZSAmJiB2aWV3cG9ydCkgeyByZXR1cm4gTWF0aC5yb3VuZCh2aWV3cG9ydC52b2kud2luZG93V2lkdGgpICsgXCIvXCIgKyBNYXRoLnJvdW5kKHZpZXdwb3J0LnZvaS53aW5kb3dDZW50ZXIpOyB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgem9vbVZhbHVlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaXNDb3JuZXJzdG9uZUVuYWJsZWQpIHtcbiAgICAgIGxldCB2aWV3cG9ydCA9IGNvcm5lcnN0b25lLmdldFZpZXdwb3J0KHRoaXMuZWxlbWVudCk7XG4gICAgICBpZiAodGhpcy5jdXJyZW50SW1hZ2UgJiYgdmlld3BvcnQpIHsgcmV0dXJuIHZpZXdwb3J0LnNjYWxlLnRvRml4ZWQoMik7IH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0Nvcm5lcnN0b25lRW5hYmxlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuaXNDb3JuZXJzdG9uZUVuYWJsZWQpIHtcbiAgICAgIGNvcm5lcnN0b25lLnJlc2l6ZSh0aGlzLmVsZW1lbnQsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3doZWVsJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZVdoZWVsKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICh0aGlzLmltYWdlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBkZWx0YSA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCAoZXZlbnQud2hlZWxEZWx0YSB8fCAtZXZlbnQuZGV0YWlsKSkpO1xuICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQpO1xuXG5cbiAgICAgIGlmIChkZWx0YSA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMuaW1hZ2VMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5pbWFnZUxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleC0tO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPCAwKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5kaXNwbGF5SW1hZ2UodGhpcy5pbWFnZUxpc3RbdGhpcy5jdXJyZW50SW5kZXhdKTtcbiAgICB9XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgLy8gUmV0cmlldmUgdGhlIERPTSBlbGVtZW50IGl0c2VsZlxuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgLy8gbm93IGFkZCB0aGUgVG9vbHMgd2UgdXNlXG4gICAgY29ybmVyc3RvbmVUb29scy5leHRlcm5hbC5jb3JuZXJzdG9uZSA9IGNvcm5lcnN0b25lO1xuICAgIGNvcm5lcnN0b25lVG9vbHMuZXh0ZXJuYWwuSGFtbWVyID0gSGFtbWVyO1xuICAgIGNvcm5lcnN0b25lVG9vbHMuZXh0ZXJuYWwuY29ybmVyc3RvbmVNYXRoID0gY29ybmVyc3RvbmVNYXRoO1xuICAgIGNvcm5lcnN0b25lVG9vbHMuaW5pdCh7IGdsb2JhbFRvb2xTeW5jRW5hYmxlZDogdHJ1ZSB9KTtcblxuICAgIGNvcm5lcnN0b25lVG9vbHMuYWRkVG9vbCh0aGlzLld3d2NUb29sKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLmFkZFRvb2wodGhpcy5QYW5Ub29sKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLmFkZFRvb2wodGhpcy5ab29tVG9vbCk7XG4gICAgY29ybmVyc3RvbmVUb29scy5hZGRUb29sKHRoaXMuUHJvYmVUb29sKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLmFkZFRvb2wodGhpcy5MZW5ndGhUb29sKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLmFkZFRvb2wodGhpcy5BbmdsZVRvb2wpO1xuICAgIGNvcm5lcnN0b25lVG9vbHMuYWRkVG9vbCh0aGlzLkVsbGlwdGljYWxSb2lUb29sKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLmFkZFRvb2wodGhpcy5SZWN0YW5nbGVSb2lUb29sKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLmFkZFRvb2wodGhpcy5EcmFnUHJvYmVUb29sKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLmFkZFRvb2wodGhpcy5ab29tVG91Y2hQaW5jaFRvb2wpO1xuICAgIGNvcm5lcnN0b25lVG9vbHMuYWRkVG9vbCh0aGlzLlBhbk11bHRpVG91Y2hUb29sKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLmFkZFRvb2wodGhpcy5TdGFja1Njcm9sbFRvb2wpO1xuICAgIGNvcm5lcnN0b25lVG9vbHMuYWRkVG9vbCh0aGlzLlN0YWNrU2Nyb2xsTW91c2VXaGVlbFRvb2wpO1xuXG4gICAgLy8gRW5hYmxlIHRoZSBlbGVtZW50IHdpdGggQ29ybmVyc3RvbmVcbiAgICB0aGlzLnJlc2V0Vmlld2VyKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gIC8vICBpZiAodGhpcy5jdXJyZW50SW1hZ2UpIGNvcm5lcnN0b25lLnJlc2l6ZSh0aGlzLmVsZW1lbnQsIHRydWUpO1xuICB9XG5cbiAgLy9cbiAgLy8gcmVzZXQgdGhlIHZpZXdlciwgc28gb25seSB0aGlzIGN1cnJlbnQgZWxlbWVudCBpcyBlbmFibGVkXG4gIC8vXG4gIHB1YmxpYyByZXNldFZpZXdlcigpIHtcbiAgICB0aGlzLmRpc2FibGVWaWV3ZXIoKTtcbiAgICBjb3JuZXJzdG9uZS5lbmFibGUodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmlzQ29ybmVyc3RvbmVFbmFibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNhYmxlVmlld2VyKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRyeSB7XG4gICAgICBjb3JuZXJzdG9uZS5kaXNhYmxlKHRoaXMuZWxlbWVudCk7XG4gICAgfSBmaW5hbGx5IHsgfVxuXG4gICAgdGhpcy5pc0Nvcm5lcnN0b25lRW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHJlc2V0SW1hZ2VDYWNoZSgpIHtcbiAgICB0aGlzLmltYWdlTGlzdCA9IFtdO1xuICAgIHRoaXMuaW1hZ2VJZExpc3QgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IG51bGw7XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xuICAgIHRoaXMucGF0aWVudE5hbWUgPSAnJztcbiAgICB0aGlzLmhvc3BpdGFsID0gJyc7XG4gICAgdGhpcy5pbnN0YW5jZU51bWJlciA9ICcnO1xuICB9XG5cbiAgcHVibGljIHByZXZpb3VzSW1hZ2UoKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2VMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEluZGV4LS07XG4gICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPCAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGxheUltYWdlKHRoaXMuaW1hZ2VMaXN0W3RoaXMuY3VycmVudEluZGV4XSk7XG4gICAgfVxuXG4gIH1cblxuICBwdWJsaWMgbmV4dEltYWdlKCkge1xuICAgIGlmICh0aGlzLmltYWdlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xuICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMuaW1hZ2VMaXN0Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaW1hZ2VMaXN0Lmxlbmd0aCAtIDE7XG4gICAgICB9XG4gICAgICB0aGlzLmRpc3BsYXlJbWFnZSh0aGlzLmltYWdlTGlzdFt0aGlzLmN1cnJlbnRJbmRleF0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRJbWFnZURhdGEoaW1hZ2VEYXRhOiBhbnkpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAvL2lmICghdGhpcy5pbWFnZUxpc3QuZmlsdGVyKGltZyA9PiBpbWcuaW1hZ2VJZCA9PT0gaW1hZ2VEYXRhLmltYWdlSWQpLmxlbmd0aCkge1xuICAgIHRoaXMuaW1hZ2VMaXN0LnB1c2goaW1hZ2VEYXRhKTtcbiAgICB0aGlzLmltYWdlSWRMaXN0LnB1c2goaW1hZ2VEYXRhLmltYWdlSWQpO1xuICAgIGlmICh0aGlzLmltYWdlTGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcbiAgICAgIHRoaXMuZGlzcGxheUltYWdlKGltYWdlRGF0YSk7XG4gICAgfVxuICAgIC8vfVxuXG4gICAgY29ybmVyc3RvbmUucmVzaXplKHRoaXMuZWxlbWVudCwgdHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcGxheUltYWdlKGltYWdlKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3Qgdmlld3BvcnQgPSBjb3JuZXJzdG9uZS5nZXREZWZhdWx0Vmlld3BvcnRGb3JJbWFnZSh0aGlzLmVsZW1lbnQsIGltYWdlKTtcbiAgICBjb3JuZXJzdG9uZS5kaXNwbGF5SW1hZ2UodGhpcy5lbGVtZW50LCBpbWFnZSwgdmlld3BvcnQpO1xuICAgIHRoaXMuY3VycmVudEltYWdlID0gaW1hZ2U7XG4gICAgLy8gRml0IHRoZSBpbWFnZSB0byB0aGUgdmlld3BvcnQgd2luZG93XG4gICAgY29ybmVyc3RvbmUuZml0VG9XaW5kb3codGhpcy5lbGVtZW50KTtcbiAgICBjb3JuZXJzdG9uZS5yZXNpemUodGhpcy5lbGVtZW50LCB0cnVlKTtcblxuICAgIC8vIGdldCBpbWFnZSBpbmZvIHRvIGRpc3BsYXkgaW4gb3ZlcmxheXNcbiAgICBpZiAoaW1hZ2UuZGF0YS5zdHJpbmcoJ3gwMDEwMDAxMCcpKSB0aGlzLnBhdGllbnROYW1lID0gaW1hZ2UuZGF0YS5zdHJpbmcoJ3gwMDEwMDAxMCcpLnJlcGxhY2UoL1xcXi9nLCAnJyk7XG4gICAgdGhpcy5ob3NwaXRhbCA9IGltYWdlLmRhdGEuc3RyaW5nKCd4MDAwODAwODAnKTtcbiAgICB0aGlzLmluc3RhbmNlTnVtYmVyID0gaW1hZ2UuZGF0YS5pbnRTdHJpbmcoJ3gwMDIwMDAxMScpICsgJy8nICsgaW1hZ2UuZGF0YS5pbnRTdHJpbmcoJ3gwMDIwMDAxMycpO1xuXG4gICAgLy8gQWN0aXZhdGUgbW91c2UgY2xpY2tzLCBtb3VzZSB3aGVlbCBhbmQgdG91Y2hcbiAgICAvLyBjb3JuZXJzdG9uZVRvb2xzLm1vdXNlSW5wdXQuZW5hYmxlKHRoaXMuZWxlbWVudCk7XG4gICAgLy8gY29ybmVyc3RvbmVUb29scy5tb3VzZVdoZWVsSW5wdXQuZW5hYmxlKHRoaXMuZWxlbWVudCk7XG4gICAgLy8gLy9jb3JuZXJzdG9uZVRvb2xzLnRvdWNoSW5wdXQuZW5hYmxlKHRoaXMuZWxlbWVudCk7XG4gICAgLy8gY29ybmVyc3RvbmVUb29scy5rZXlib2FyZElucHV0LmVuYWJsZSh0aGlzLmVsZW1lbnQpO1xuXG4gICAgLy8gRW5hYmxlIGFsbCB0b29scyB3ZSB3YW50IHRvIHVzZSB3aXRoIHRoaXMgZWxlbWVudFxuICAgIGNvcm5lcnN0b25lVG9vbHMuc2V0VG9vbEFjdGl2ZUZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnV3d3YycsIHsgbW91c2VCdXR0b25NYXNrOiAxIH0sIFsnTW91c2UnXSk7IC8vIHd3L3djIGlzIHRoZSBkZWZhdWx0IHRvb2wgZm9yIGxlZnQgbW91c2UgYnV0dG9uXG4gICAgY29ybmVyc3RvbmVUb29scy5zZXRUb29sQWN0aXZlRm9yRWxlbWVudCh0aGlzLmVsZW1lbnQsICdQYW4nLCB7IG1vdXNlQnV0dG9uTWFzazogNCB9LCBbJ01vdXNlJ10pOyAvLyBwYW4gaXMgdGhlIGRlZmF1bHQgdG9vbCBmb3IgbWlkZGxlIG1vdXNlIGJ1dHRvblxuICAgIGNvcm5lcnN0b25lVG9vbHMuc2V0VG9vbEFjdGl2ZUZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnWm9vbScsIHsgbW91c2VCdXR0b25NYXNrOiAyIH0sIFsnTW91c2UnXSk7IC8vIHpvb20gaXMgdGhlIGRlZmF1bHQgdG9vbCBmb3IgcmlnaHQgbW91c2UgYnV0dG9uXG5cbiAgICAvKiAgICAgY29ybmVyc3RvbmVUb29scy53d3djLmFjdGl2YXRlKHRoaXMuZWxlbWVudCwgMSk7IC8vIHd3L3djIGlzIHRoZSBkZWZhdWx0IHRvb2wgZm9yIGxlZnQgbW91c2UgYnV0dG9uXG4gICAgICAgIGNvcm5lcnN0b25lVG9vbHMucGFuLmFjdGl2YXRlKHRoaXMuZWxlbWVudCwgMik7IC8vIHBhbiBpcyB0aGUgZGVmYXVsdCB0b29sIGZvciBtaWRkbGUgbW91c2UgYnV0dG9uXG4gICAgICAgIGNvcm5lcnN0b25lVG9vbHMuem9vbS5hY3RpdmF0ZSh0aGlzLmVsZW1lbnQsIDQpOyAvLyB6b29tIGlzIHRoZSBkZWZhdWx0IHRvb2wgZm9yIHJpZ2h0IG1vdXNlIGJ1dHRvblxuICAgICAgICBjb3JuZXJzdG9uZVRvb2xzLnByb2JlLmVuYWJsZSh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBjb3JuZXJzdG9uZVRvb2xzLmxlbmd0aC5lbmFibGUodGhpcy5lbGVtZW50KTtcbiAgICAgICAgY29ybmVyc3RvbmVUb29scy5hbmdsZS5lbmFibGUodGhpcy5lbGVtZW50KTtcbiAgICAgICAgY29ybmVyc3RvbmVUb29scy5zaW1wbGVBbmdsZS5lbmFibGUodGhpcy5lbGVtZW50KTtcbiAgICAgICAgY29ybmVyc3RvbmVUb29scy5lbGxpcHRpY2FsUm9pLmVuYWJsZSh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBjb3JuZXJzdG9uZVRvb2xzLnJlY3RhbmdsZVJvaS5lbmFibGUodGhpcy5lbGVtZW50KTtcbiAgICAgICAgY29ybmVyc3RvbmVUb29scy53d3djVG91Y2hEcmFnLmFjdGl2YXRlKHRoaXMuZWxlbWVudCkgLy8gLSBEcmFnXG4gICAgICAgIGNvcm5lcnN0b25lVG9vbHMuem9vbVRvdWNoUGluY2guYWN0aXZhdGUodGhpcy5lbGVtZW50KSAvLyAtIFBpbmNoXG4gICAgICAgIGNvcm5lcnN0b25lVG9vbHMucGFuTXVsdGlUb3VjaC5hY3RpdmF0ZSh0aGlzLmVsZW1lbnQpIC8vIC0gTXVsdGkgKHgyKSAqL1xuXG4gICAgLy8gU3RhY2sgdG9vbHNcblxuICAgIC8vIERlZmluZSB0aGUgU3RhY2sgb2JqZWN0XG4gICAgY29uc3Qgc3RhY2sgPSB7XG4gICAgICBjdXJyZW50SW1hZ2VJZEluZGV4OiB0aGlzLmN1cnJlbnRJbmRleCxcbiAgICAgIGltYWdlSWRzOiB0aGlzLmltYWdlSWRMaXN0XG4gICAgfTtcblxuICAgIGNvcm5lcnN0b25lVG9vbHMuYWRkU3RhY2tTdGF0ZU1hbmFnZXIodGhpcy5lbGVtZW50LCBbJ3BsYXlDbGlwJ10pO1xuICAgIC8vIEFkZCB0aGUgc3RhY2sgdG9vbCBzdGF0ZSB0byB0aGUgZW5hYmxlZCBlbGVtZW50XG4gICAgY29ybmVyc3RvbmVUb29scy5hZGRTdGFja1N0YXRlTWFuYWdlcih0aGlzLmVsZW1lbnQsIFsnc3RhY2snXSk7XG4gICAgY29ybmVyc3RvbmVUb29scy5hZGRUb29sU3RhdGUodGhpcy5lbGVtZW50LCAnc3RhY2snLCBzdGFjayk7XG4gICAgLy8gY29ybmVyc3RvbmVUb29scy5zdGFja1Njcm9sbFdoZWVsLmFjdGl2YXRlKHRoaXMuZWxlbWVudCk7XG4gICAgLy8gRW5hYmxlIGFsbCB0b29scyB3ZSB3YW50IHRvIHVzZSB3aXRoIHRoaXMgZWxlbWVudFxuICAgIGNvcm5lcnN0b25lVG9vbHMuc2V0VG9vbEFjdGl2ZUZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnU3RhY2tTY3JvbGwnLCB7fSk7XG4gICAgLy9jb3JuZXJzdG9uZVRvb2xzLnN0YWNrUHJlZmV0Y2guZW5hYmxlKHRoaXMuZWxlbWVudCk7XG5cbiAgfVxuXG5cbiAgLy8gY29ybmVyc3RvbmUuZGlzcGxheUltYWdlKHRoaXMuZWxlbWVudCwgaW1hZ2UpO1xuICAvLyBkZWFjdGl2YXRlIGFsbCB0b29sc1xuICBwdWJsaWMgcmVzZXRBbGxUb29scygpIHtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLnNldFRvb2xEaXNhYmxlZEZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnV3d3YycpO1xuICAgIGNvcm5lcnN0b25lVG9vbHMuc2V0VG9vbERpc2FibGVkRm9yRWxlbWVudCh0aGlzLmVsZW1lbnQsICdQYW4nKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLnNldFRvb2xEaXNhYmxlZEZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnWm9vbScpO1xuICAgIGNvcm5lcnN0b25lVG9vbHMuc2V0VG9vbERpc2FibGVkRm9yRWxlbWVudCh0aGlzLmVsZW1lbnQsICdQcm9iZScpO1xuICAgIGNvcm5lcnN0b25lVG9vbHMuc2V0VG9vbERpc2FibGVkRm9yRWxlbWVudCh0aGlzLmVsZW1lbnQsICdMZW5ndGgnKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLnNldFRvb2xEaXNhYmxlZEZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnQW5nbGUnKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLnNldFRvb2xEaXNhYmxlZEZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnRWxsaXB0aWNhbFJvaScpO1xuICAgIGNvcm5lcnN0b25lVG9vbHMuc2V0VG9vbERpc2FibGVkRm9yRWxlbWVudCh0aGlzLmVsZW1lbnQsICdSZWN0YW5nbGVSb2knKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLnNldFRvb2xEaXNhYmxlZEZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnRHJhZ1Byb2JlJyk7XG4gICAgY29ybmVyc3RvbmVUb29scy5zZXRUb29sRGlzYWJsZWRGb3JFbGVtZW50KHRoaXMuZWxlbWVudCwgJ1pvb21Ub3VjaFBpbmNoJyk7XG4gICAgY29ybmVyc3RvbmVUb29scy5zZXRUb29sRGlzYWJsZWRGb3JFbGVtZW50KHRoaXMuZWxlbWVudCwgJ1Bhbk11bHRpVG91Y2gnKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLnNldFRvb2xEaXNhYmxlZEZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnU3RhY2tTY3JvbGwnKTtcbiAgICBjb3JuZXJzdG9uZVRvb2xzLnNldFRvb2xEaXNhYmxlZEZvckVsZW1lbnQodGhpcy5lbGVtZW50LCAnU3RhY2tTY3JvbGxNb3VzZVdoZWVsJyk7XG4gIH1cblxufVxuIl19