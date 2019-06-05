import { Component, OnInit, ViewChild } from '@angular/core';
import { DICOMViewerComponent } from 'dicomViewer';

declare const cornerstone;
declare const cornerstoneWADOImageLoader;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(DICOMViewerComponent, { static: true }) viewPort: DICOMViewerComponent;

  ngOnInit() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone; // inicializa WADO Image loader

    // configura codecs e web workers
    cornerstoneWADOImageLoader.webWorkerManager.initialize({
        webWorkerPath: './assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js',
        taskConfiguration: {
            'decodeTask': {
                codecsPath: '../codecs/cornerstoneWADOImageLoaderCodecs.js'
            }
        }
    });

  }

  /**
   * Load selected DICOM images
   *
   * @param files list of selected dicom files
   */
  loadDICOMImages(files: FileList) {
    if (files && files.length > 0) {
      let imageList = [];
      const fileList:Array<File> = Array.from(files);
      fileList.sort((a,b) => {
        if ( a.name > b.name ) return 1;
        if ( b.name > a.name ) return -1;
        return 0;
      })
      //cornerstoneWADOImageLoader.wadouri.fileManager.purge();
      cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.purge();

      // loop thru the File list and build a list of wadouri imageIds (dicomfile:)
      for (let i = 0; i < fileList.length; i++) {
        const dicomFile: File = fileList[i];
        const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(dicomFile);
        imageList.push(imageId);
      }

      this.viewPort.resetAllTools();

      // now load all Images, using their wadouri
      this.viewPort.loadStudyImages(imageList);

    } else alert('Escolha imagens DICOM a exibir.');
  }
}
