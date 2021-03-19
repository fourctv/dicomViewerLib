import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DICOMViewerComponent } from './dicom-viewer.component';
import { CornerstoneDirective } from './cornerstone.directive';
import { ThumbnailDirective } from './thumbnail.directive';
export class DicomViewerModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljb20tdmlld2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2RpY29tLXZpZXdlci9zcmMvbGliL2RpY29tLXZpZXdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBVzNELE1BQU0sT0FBTyxpQkFBaUI7OztZQVQ3QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFdBQVc7b0JBQ1gsWUFBWTtvQkFDWix3QkFBd0I7aUJBQ3pCO2dCQUNELFlBQVksRUFBRSxDQUFDLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDO2dCQUM5RSxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQzthQUMxRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLXNwaW5uZXInO1xuXG5pbXBvcnQgeyBESUNPTVZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vZGljb20tdmlld2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3JuZXJzdG9uZURpcmVjdGl2ZSB9IGZyb20gJy4vY29ybmVyc3RvbmUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRodW1ibmFpbERpcmVjdGl2ZSB9IGZyb20gJy4vdGh1bWJuYWlsLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0RJQ09NVmlld2VyQ29tcG9uZW50LCBDb3JuZXJzdG9uZURpcmVjdGl2ZSwgVGh1bWJuYWlsRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0RJQ09NVmlld2VyQ29tcG9uZW50LCBDb3JuZXJzdG9uZURpcmVjdGl2ZSwgVGh1bWJuYWlsRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBEaWNvbVZpZXdlck1vZHVsZSB7IH1cbiJdfQ==