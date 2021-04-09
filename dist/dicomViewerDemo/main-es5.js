(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! /root/workspace/dicomViewerLib/src/main.ts */
      "zUnb");
      /***/
    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var dicomViewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! dicomViewer */
      "nfuk");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var AppComponent = /*#__PURE__*/function () {
        function AppComponent() {
          _classCallCheck(this, AppComponent);
        }

        _createClass(AppComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
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

        }, {
          key: "loadDICOMImages",
          value: function loadDICOMImages(files) {
            if (files && files.length > 0) {
              var imageList = [];
              var fileList = Array.from(files);
              fileList.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
              }); //cornerstoneWADOImageLoader.wadouri.fileManager.purge();

              cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.purge(); // loop thru the File list and build a list of wadouri imageIds (dicomfile:)

              for (var i = 0; i < fileList.length; i++) {
                var dicomFile = fileList[i];
                var imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(dicomFile);
                imageList.push(imageId);
              }

              this.viewPort.resetAllTools(); // now load all Images, using their wadouri

              this.viewPort.loadStudyImages(imageList);
            } else alert('Escolha imagens DICOM a exibir.');
          }
        }]);

        return AppComponent;
      }();

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)();
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        viewQuery: function AppComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](dicomViewer__WEBPACK_IMPORTED_MODULE_0__["DICOMViewerComponent"], 3);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.viewPort = _t.first);
          }
        },
        decls: 11,
        vars: 3,
        consts: [[2, "height", "100%", "width", "100%"], [2, "display", "flex", "margin-left", "120px", "align-items", "center"], ["href", "https://github.com/cornerstonejs"], [1, "choose_file"], ["type", "file", "multiple", "", "accept", "application/dicom", "id", "imagens", "title", "selecione arquivos de imagens", 1, "hide_file", 3, "change"], [2, "display", "flex", "height", "calc(100% - 90px)", "width", "100%"], [2, "height", "100%", "width", "100%", "margin", "10px", 3, "enableViewerTools", "enablePlayTools", "maxImagesToLoad"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " DICOM Viewer, based on ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Cornerstone");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, " Choose Your DICOM Files ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "input", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function AppComponent_Template_input_change_8_listener($event) {
              return ctx.loadDICOMImages($event.target.files);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "dicom-viewer", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("enableViewerTools", true)("enablePlayTools", false)("maxImagesToLoad", 20);
          }
        },
        directives: [dicomViewer__WEBPACK_IMPORTED_MODULE_0__["DICOMViewerComponent"]],
        styles: [".choose_file[_ngcontent-%COMP%]{\n    padding:5px 10px;\n    background:#00ad2d;\n    border:1px solid #00ad2d;\n    position:relative;\n    color:#fff;\n    border-radius:2px;\n    text-align:center;\n    float:left;\n    cursor:pointer;\n    margin-left: 50px;\n  }\n  .hide_file[_ngcontent-%COMP%] {\n      position: absolute;\n      z-index: 1000;\n      opacity: 0;\n      cursor: pointer;\n      right: 0;\n      top: 0;\n      height: 100%;\n      font-size: 24px;\n      width: 100%;\n      \n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQix3QkFBd0I7SUFDeEIsaUJBQWlCO0lBQ2pCLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLFVBQVU7SUFDVixjQUFjO0lBQ2QsaUJBQWlCO0VBQ25CO0VBQ0E7TUFDSSxrQkFBa0I7TUFDbEIsYUFBYTtNQUNiLFVBQVU7TUFDVixlQUFlO01BQ2YsUUFBUTtNQUNSLE1BQU07TUFDTixZQUFZO01BQ1osZUFBZTtNQUNmLFdBQVc7O0VBRWYiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2hvb3NlX2ZpbGV7XG4gICAgcGFkZGluZzo1cHggMTBweDtcbiAgICBiYWNrZ3JvdW5kOiMwMGFkMmQ7XG4gICAgYm9yZGVyOjFweCBzb2xpZCAjMDBhZDJkO1xuICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xuICAgIGNvbG9yOiNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czoycHg7XG4gICAgdGV4dC1hbGlnbjpjZW50ZXI7XG4gICAgZmxvYXQ6bGVmdDtcbiAgICBjdXJzb3I6cG9pbnRlcjtcbiAgICBtYXJnaW4tbGVmdDogNTBweDtcbiAgfVxuICAuaGlkZV9maWxlIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHotaW5kZXg6IDEwMDA7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICB0b3A6IDA7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIFxuICB9Il19 */"]
      });
      /***/
    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/material/progress-spinner */
      "Xa2L");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var dicomViewer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! dicomViewer */
      "nfuk");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || AppModule)();
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
        providers: [],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__["MatProgressSpinnerModule"], dicomViewer__WEBPACK_IMPORTED_MODULE_5__["DicomViewerModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__["MatProgressSpinnerModule"], dicomViewer__WEBPACK_IMPORTED_MODULE_5__["DicomViewerModule"]]
        });
      })();
      /***/

    },

    /***/
    "nfuk":
    /*!*******************************************************************!*\
      !*** ./dist/dicom-viewer/__ivy_ngcc__/fesm2015/ng-dicomviewer.js ***!
      \*******************************************************************/

    /*! exports provided: CornerstoneDirective, DICOMViewerComponent, DicomViewerModule, ThumbnailDirective */

    /***/
    function nfuk(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CornerstoneDirective", function () {
        return CornerstoneDirective;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DICOMViewerComponent", function () {
        return DICOMViewerComponent;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DicomViewerModule", function () {
        return DicomViewerModule;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ThumbnailDirective", function () {
        return ThumbnailDirective;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! hammerjs */
      "yLV6");
      /* harmony import */


      var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/material/progress-spinner */
      "Xa2L");

      var _c0 = function _c0(a0) {
        return {
          "active": a0
        };
      };

      function DICOMViewerComponent_div_1_a_2_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_div_1_a_2_Template_a_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10);

            var i_r8 = ctx.index;

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

            return ctx_r9.showSeries(i_r8);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var series_r7 = ctx.$implicit;
          var i_r8 = ctx.index;

          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c0, ctx_r6.currentSeriesIndex === i_r8));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("imageData", series_r7.imageList[0]);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](series_r7.seriesDescription);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](series_r7.imageCount);
        }
      }

      function DICOMViewerComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, DICOMViewerComponent_div_1_a_2_Template, 7, 6, "a", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h6", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "small");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "1.20.12.17");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.seriesList);
        }
      }

      function DICOMViewerComponent_div_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_div_5_Template_button_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r11.enableWindowing();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "span", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_div_5_Template_button_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r13.invertImage();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "span", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_div_5_Template_button_click_5_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r14.enableScroll();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "span", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_div_5_Template_button_click_7_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r15.enableLength();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "span", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_div_5_Template_button_click_9_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r16.enableAngle();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "span", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_div_5_Template_button_click_11_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r17.enableProbe();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "span", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 47);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_div_5_Template_button_click_13_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r18.enableElliptical();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "span", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 49);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_div_5_Template_button_click_15_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r19.enableRectangle();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "span", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_div_5_Template_button_click_17_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);

            var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r20.resetImage();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "span", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function DICOMViewerComponent_button_11_Template(rf, ctx) {
        if (rf & 1) {
          var _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_button_11_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22);

            var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r21.playClip();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "span", 54);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function DICOMViewerComponent_button_12_Template(rf, ctx) {
        if (rf & 1) {
          var _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 55);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_button_12_Template_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r24);

            var ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r23.stopClip();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "span", 56);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function DICOMViewerComponent_a_13_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "span", 58);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("href", ctx_r4.downloadImagesURL, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        }
      }

      function DICOMViewerComponent_a_18_Template(rf, ctx) {
        if (rf & 1) {
          var _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_a_18_Template_a_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r26);

            var ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r25.loadMoreImages();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" clique aqui para trazer as pr\xF3ximas ", ctx_r5.moreImagestoLoad, " imagens ");
        }
      }

      var CornerstoneDirective = /*#__PURE__*/function () {
        function CornerstoneDirective(elementRef) {
          _classCallCheck(this, CornerstoneDirective);

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

        _createClass(CornerstoneDirective, [{
          key: "windowingValue",
          get: function get() {
            if (this.isCornerstoneEnabled) {
              var viewport = cornerstone.getViewport(this.element);

              if (this.currentImage && viewport) {
                return Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter);
              }
            }

            return '';
          }
        }, {
          key: "zoomValue",
          get: function get() {
            if (this.isCornerstoneEnabled) {
              var viewport = cornerstone.getViewport(this.element);

              if (this.currentImage && viewport) {
                return viewport.scale.toFixed(2);
              }
            }

            return '';
          }
        }, {
          key: "onResize",
          value: function onResize(event) {
            if (this.isCornerstoneEnabled) {
              cornerstone.resize(this.element, true);
            }
          }
        }, {
          key: "onMouseWheel",
          value: function onMouseWheel(event) {
            event.preventDefault();

            if (this.imageList.length > 0) {
              var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail)); // console.log(event);

              if (delta > 0) {
                this.currentIndex++;

                if (this.currentIndex >= this.imageList.length) {
                  this.currentIndex = this.imageList.length - 1;
                }
              } else {
                this.currentIndex--;

                if (this.currentIndex < 0) {
                  this.currentIndex = 0;
                }
              }

              this.displayImage(this.imageList[this.currentIndex]);
            }
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            // Retrieve the DOM element itself
            this.element = this.elementRef.nativeElement; // now add the Tools we use

            cornerstoneTools.external.cornerstone = cornerstone;
            cornerstoneTools.external.Hammer = hammerjs__WEBPACK_IMPORTED_MODULE_1__;
            cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
            cornerstoneTools.init({
              globalToolSyncEnabled: true
            });
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
            cornerstoneTools.addTool(this.StackScrollMouseWheelTool); // Enable the element with Cornerstone

            this.resetViewer();
          }
        }, {
          key: "ngAfterViewChecked",
          value: function ngAfterViewChecked() {//  if (this.currentImage) cornerstone.resize(this.element, true);
          } //
          // reset the viewer, so only this current element is enabled
          //

        }, {
          key: "resetViewer",
          value: function resetViewer() {
            this.disableViewer();
            cornerstone.enable(this.element);
            this.isCornerstoneEnabled = true;
          }
        }, {
          key: "disableViewer",
          value: function disableViewer() {
            this.element = this.elementRef.nativeElement;

            try {
              cornerstone.disable(this.element);
            } finally {}

            this.isCornerstoneEnabled = false;
          }
        }, {
          key: "resetImageCache",
          value: function resetImageCache() {
            this.imageList = [];
            this.imageIdList = [];
            this.currentImage = null;
            this.currentIndex = 0;
            this.patientName = '';
            this.hospital = '';
            this.instanceNumber = '';
          }
        }, {
          key: "previousImage",
          value: function previousImage() {
            if (this.imageList.length > 0) {
              this.currentIndex--;

              if (this.currentIndex < 0) {
                this.currentIndex = 0;
              }

              this.displayImage(this.imageList[this.currentIndex]);
            }
          }
        }, {
          key: "nextImage",
          value: function nextImage() {
            if (this.imageList.length > 0) {
              this.currentIndex++;

              if (this.currentIndex >= this.imageList.length) {
                this.currentIndex = this.imageList.length - 1;
              }

              this.displayImage(this.imageList[this.currentIndex]);
            }
          }
        }, {
          key: "addImageData",
          value: function addImageData(imageData) {
            this.element = this.elementRef.nativeElement; //if (!this.imageList.filter(img => img.imageId === imageData.imageId).length) {

            this.imageList.push(imageData);
            this.imageIdList.push(imageData.imageId);

            if (this.imageList.length === 1) {
              this.currentIndex = 0;
              this.displayImage(imageData);
            } //}


            cornerstone.resize(this.element, true);
          }
        }, {
          key: "displayImage",
          value: function displayImage(image) {
            this.element = this.elementRef.nativeElement;
            var viewport = cornerstone.getDefaultViewportForImage(this.element, image);
            cornerstone.displayImage(this.element, image, viewport);
            this.currentImage = image; // Fit the image to the viewport window

            cornerstone.fitToWindow(this.element);
            cornerstone.resize(this.element, true); // get image info to display in overlays

            if (image.data.string('x00100010')) this.patientName = image.data.string('x00100010').replace(/\^/g, '');
            this.hospital = image.data.string('x00080080');
            this.instanceNumber = image.data.intString('x00200011') + '/' + image.data.intString('x00200013'); // Activate mouse clicks, mouse wheel and touch
            // cornerstoneTools.mouseInput.enable(this.element);
            // cornerstoneTools.mouseWheelInput.enable(this.element);
            // //cornerstoneTools.touchInput.enable(this.element);
            // cornerstoneTools.keyboardInput.enable(this.element);
            // Enable all tools we want to use with this element

            cornerstoneTools.setToolActiveForElement(this.element, 'Wwwc', {
              mouseButtonMask: 1
            }, ['Mouse']); // ww/wc is the default tool for left mouse button

            cornerstoneTools.setToolActiveForElement(this.element, 'Pan', {
              mouseButtonMask: 4
            }, ['Mouse']); // pan is the default tool for middle mouse button

            cornerstoneTools.setToolActiveForElement(this.element, 'Zoom', {
              mouseButtonMask: 2
            }, ['Mouse']); // zoom is the default tool for right mouse button

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

            var stack = {
              currentImageIdIndex: this.currentIndex,
              imageIds: this.imageIdList
            };
            cornerstoneTools.addStackStateManager(this.element, ['playClip']); // Add the stack tool state to the enabled element

            cornerstoneTools.addStackStateManager(this.element, ['stack']);
            cornerstoneTools.addToolState(this.element, 'stack', stack); // cornerstoneTools.stackScrollWheel.activate(this.element);
            // Enable all tools we want to use with this element

            cornerstoneTools.setToolActiveForElement(this.element, 'StackScroll', {}); //cornerstoneTools.stackPrefetch.enable(this.element);
          } // cornerstone.displayImage(this.element, image);
          // deactivate all tools

        }, {
          key: "resetAllTools",
          value: function resetAllTools() {
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
        }]);

        return CornerstoneDirective;
      }();

      CornerstoneDirective.ɵfac = function CornerstoneDirective_Factory(t) {
        return new (t || CornerstoneDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]));
      };

      CornerstoneDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
        type: CornerstoneDirective,
        selectors: [["", "cornerstone", ""]],
        hostBindings: function CornerstoneDirective_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resize", function CornerstoneDirective_resize_HostBindingHandler($event) {
              return ctx.onResize($event);
            }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"])("wheel", function CornerstoneDirective_wheel_HostBindingHandler($event) {
              return ctx.onMouseWheel($event);
            });
          }
        }
      });

      CornerstoneDirective.ctorParameters = function () {
        return [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
        }];
      };

      CornerstoneDirective.propDecorators = {
        onResize: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
          args: ['window:resize', ['$event']]
        }],
        onMouseWheel: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
          args: ['wheel', ['$event']]
        }]
      };

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CornerstoneDirective, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
          args: [{
            selector: '[cornerstone]'
          }]
        }], function () {
          return [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
          }];
        }, {
          onResize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['window:resize', ['$event']]
          }],
          onMouseWheel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['wheel', ['$event']]
          }]
        });
      })();

      var ThumbnailDirective = /*#__PURE__*/function () {
        function ThumbnailDirective(elementRef) {
          _classCallCheck(this, ThumbnailDirective);

          this.elementRef = elementRef;
        }

        _createClass(ThumbnailDirective, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            // Retrieve the DOM element itself
            this.element = this.elementRef.nativeElement; // Enable the element with Cornerstone

            cornerstone.enable(this.element);
            this.setImageData(this.imageData);
          }
        }, {
          key: "ngAfterViewChecked",
          value: function ngAfterViewChecked() {
            this.refresh();
          }
        }, {
          key: "refresh",
          value: function refresh() {
            this.setImageData(this.imageData);
          }
        }, {
          key: "setImageData",
          value: function setImageData(image) {
            this.imageData = image;

            if (this.imageData && this.element) {
              var viewport = cornerstone.getDefaultViewportForImage(this.element, this.imageData);
              cornerstone.displayImage(this.element, this.imageData, viewport); // Fit the image to the viewport window

              cornerstone.fitToWindow(this.element);
              cornerstone.resize(this.element, true);
            }
          }
        }]);

        return ThumbnailDirective;
      }();

      ThumbnailDirective.ɵfac = function ThumbnailDirective_Factory(t) {
        return new (t || ThumbnailDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]));
      };

      ThumbnailDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
        type: ThumbnailDirective,
        selectors: [["", "thumbnail", ""]],
        inputs: {
          imageData: "imageData"
        }
      });

      ThumbnailDirective.ctorParameters = function () {
        return [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
        }];
      };

      ThumbnailDirective.propDecorators = {
        imageData: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }]
      };

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ThumbnailDirective, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
          args: [{
            selector: '[thumbnail]'
          }]
        }], function () {
          return [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
          }];
        }, {
          imageData: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }]
        });
      })();

      var DICOMViewerComponent = /*#__PURE__*/function () {
        function DICOMViewerComponent() {
          _classCallCheck(this, DICOMViewerComponent);

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
        } // control enable/disable image scroll buttons


        _createClass(DICOMViewerComponent, [{
          key: "hidePreviousImage",
          get: function get() {
            return {
              color: this.viewPort.currentIndex < 1 ? 'black' : 'white'
            };
          }
        }, {
          key: "hideNextImage",
          get: function get() {
            return {
              color: this.viewPort.currentIndex >= this.imageCount - 1 ? 'black' : 'white'
            };
          } // control message for more images to load

        }, {
          key: "moreImagestoLoad",
          get: function get() {
            if (this.loadedImages.length < this.imageIdList.length && !this.loadingImages) {
              // are there any more images to load?
              var imagesToLoad = this.maxImagesToLoad <= 0 ? this.imageIdList.length - this.loadedImages.length : Math.min(this.maxImagesToLoad, this.imageIdList.length - this.loadedImages.length);
              return imagesToLoad.toString();
            } else return '';
          }
        }, {
          key: "showProgress",
          get: function get() {
            return {
              display: this.loadingImages ? 'inline-block' : 'none'
            };
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.element = this.viewPort.element;
          }
          /**
           * Load dicom images for display
           *
           * @param imageIdList list of imageIds to load and display
           */

        }, {
          key: "loadStudyImages",
          value: function loadStudyImages(imageIdList) {
            var _this = this;

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

            var maxImages = this.maxImagesToLoad <= 0 ? imageIdList.length : Math.min(this.maxImagesToLoad, imageIdList.length);
            this.loadingImages = true; // activate progress indicator

            this.targetImageCount = maxImages;

            for (var index = 0; index < maxImages; index++) {
              var imageId = imageIdList[index];
              cornerstone.loadAndCacheImage(imageId).then(function (imageData) {
                _this.imageLoaded(imageData);
              });
            }
          }
          /**
           * Load the next batch of images
           */

        }, {
          key: "loadMoreImages",
          value: function loadMoreImages() {
            var _this2 = this;

            this.element = this.viewPort.element; //
            // loop thru all imageIds, load and cache them for exhibition (up the the maximum limit defined)
            //

            var maxImages = this.maxImagesToLoad <= 0 ? this.imageIdList.length - this.loadedImages.length : Math.min(this.maxImagesToLoad, this.imageIdList.length - this.loadedImages.length);
            this.loadingImages = true; // activate progress indicator

            this.targetImageCount += maxImages;
            var nextImageIndex = this.loadedImages.length;

            for (var index = 0; index < maxImages; index++) {
              var imageId = this.imageIdList[nextImageIndex++];
              cornerstone.loadAndCacheImage(imageId).then(function (imageData) {
                _this2.imageLoaded(imageData);
              })["catch"](function (err) {
                _this2.targetImageCount--;
              });
            }
          }
          /**
           *
           * @param imageData the dicom image data
           */

        }, {
          key: "imageLoaded",
          value: function imageLoaded(imageData) {
            //console.log(imageData.imageId)
            // build list of series in all loadded images
            var series = {
              studyID: imageData.data.string('x0020000d'),
              seriesID: imageData.data.string('x0020000e'),
              seriesNumber: imageData.data.intString('x00200011'),
              studyDescription: imageData.data.string('x00081030'),
              seriesDescription: imageData.data.string('x0008103e'),
              imageCount: 1,
              imageList: [imageData]
            }; // if this is a new series, add it to the list

            var seriesIndex = this.seriesList.findIndex(function (item) {
              return item.seriesID === series.seriesID;
            });

            if (seriesIndex < 0) {
              seriesIndex = this.seriesList.length;
              this.seriesList.push(series);
              this.seriesList.sort(function (a, b) {
                if (a.seriesNumber > b.seriesNumber) return 1;
                if (a.seriesNumber < b.seriesNumber) return -1;
                return 0;
              });
            } else {
              var seriesItem = this.seriesList[seriesIndex];
              seriesItem.imageCount++;
              seriesItem.imageList.push(imageData);
              seriesItem.imageList.sort(function (a, b) {
                if (a.data.intString('x00200013') > b.data.intString('x00200013')) return 1;
                if (a.data.intString('x00200013') < b.data.intString('x00200013')) return -1;
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

            if (this.loadedImages.length >= this.targetImageCount) {
              // did we finish loading images?
              this.loadingImages = false; // deactivate progress indicator
            }
          }
        }, {
          key: "showSeries",
          value: function showSeries(index) {
            //        this.resetAllTools();
            this.currentSeriesIndex = index;
            this.currentSeries = this.seriesList[index];
            this.imageCount = this.currentSeries.imageCount; // get total image count

            this.viewPort.resetImageCache(); // clean up image cache
            //        this.loadingImages = true; // activate progress indicator

            for (var i = 0; i < this.currentSeries.imageList.length; i++) {
              var imageData = this.currentSeries.imageList[i];
              this.viewPort.addImageData(imageData);
            } //        this.loadingImages = false; // de-activate progress indicator

          }
        }, {
          key: "saveAs",
          value: function saveAs() {
            cornerstoneTools.saveAs(this.element, "teste.jpg");
          }
          /**
           * Image scroll methods
           */

        }, {
          key: "nextImage",
          value: function nextImage() {
            if (this.viewPort.currentIndex < this.imageCount) {
              this.viewPort.nextImage();
            }
          }
        }, {
          key: "previousImage",
          value: function previousImage() {
            if (this.viewPort.currentIndex > 0) {
              this.viewPort.previousImage();
            }
          }
          /**
           * Methods to activate/deactivate viewer tools
           */
          // deactivate all tools

        }, {
          key: "resetAllTools",
          value: function resetAllTools() {
            if (this.imageCount > 0) {
              this.viewPort.resetAllTools();
              this.stopClip();
            }
          } // activate windowing

        }, {
          key: "enableWindowing",
          value: function enableWindowing() {
            if (this.imageCount > 0) {
              this.resetAllTools(); // cornerstoneTools.wwwc.activate(this.element, 1);
              // cornerstoneTools.wwwcTouchDrag.activate(this.element);

              cornerstoneTools.setToolActiveForElement(this.element, 'Wwwc', {
                mouseButtonMask: 1
              }, ['Mouse']);
            }
          } // activate zoom

        }, {
          key: "enableZoom",
          value: function enableZoom() {
            if (this.imageCount > 0) {
              this.resetAllTools(); // cornerstoneTools.zoom.activate(this.element, 5); // 5 is right mouse button and left mouse button
              // cornerstoneTools.zoomTouchDrag.activate(this.element);

              cornerstoneTools.setToolActiveForElement(this.element, 'Zoom', {
                mouseButtonMask: 1
              }, ['Mouse']); // zoom left mouse
              // cornerstoneTools.setToolActiveForElement(this.element, 'ZoomTouchPinch', { }, ['Mouse']);

              cornerstoneTools.setToolActiveForElement(this.element, 'Pan', {
                mouseButtonMask: 2
              }, ['Mouse']); // pan right mouse
            }
          } // activate pan

        }, {
          key: "enablePan",
          value: function enablePan() {
            if (this.imageCount > 0) {
              this.resetAllTools(); // cornerstoneTools.pan.activate(this.element, 3); // 3 is middle mouse button and left mouse button
              // cornerstoneTools.panTouchDrag.activate(this.element);

              cornerstoneTools.setToolActiveForElement(this.element, 'Pan', {
                mouseButtonMask: 1
              }, ['Mouse']);
            }
          } // activate image scroll

        }, {
          key: "enableScroll",
          value: function enableScroll() {
            if (this.imageCount > 0) {
              this.resetAllTools(); // cornerstoneTools.stackScroll.activate(this.element, 1);
              // cornerstoneTools.stackScrollTouchDrag.activate(this.element);
              // cornerstoneTools.stackScrollKeyboard.activate(this.element);

              cornerstoneTools.setToolActiveForElement(this.element, 'StackScroll', {
                mouseButtonMask: 1
              }, ['Mouse']);
            }
          } // activate length measurement

        }, {
          key: "enableLength",
          value: function enableLength() {
            if (this.imageCount > 0) {
              this.resetAllTools(); // cornerstoneTools.length.activate(this.element, 1);

              cornerstoneTools.setToolActiveForElement(this.element, 'Length', {
                mouseButtonMask: 1
              }, ['Mouse']);
            }
          } // activate angle measurement

        }, {
          key: "enableAngle",
          value: function enableAngle() {
            if (this.imageCount > 0) {
              this.resetAllTools(); // cornerstoneTools.simpleAngle.activate(this.element, 1);

              cornerstoneTools.setToolActiveForElement(this.element, 'Angle', {
                mouseButtonMask: 1
              }, ['Mouse']);
            }
          } // activate pixel probe

        }, {
          key: "enableProbe",
          value: function enableProbe() {
            if (this.imageCount > 0) {
              this.resetAllTools(); // cornerstoneTools.probe.activate(this.element, 1);

              cornerstoneTools.setToolActiveForElement(this.element, 'Probe', {
                mouseButtonMask: 1
              }, ['Mouse']);
            }
          } // activate Elliptical ROI

        }, {
          key: "enableElliptical",
          value: function enableElliptical() {
            if (this.imageCount > 0) {
              this.resetAllTools(); // cornerstoneTools.ellipticalRoi.activate(this.element, 1);

              cornerstoneTools.setToolActiveForElement(this.element, 'EllipticalRoi', {
                mouseButtonMask: 1
              }, ['Mouse']);
            }
          } // activate Rectangle ROI

        }, {
          key: "enableRectangle",
          value: function enableRectangle() {
            if (this.imageCount > 0) {
              this.resetAllTools(); // cornerstoneTools.rectangleRoi.activate(this.element, 1);

              cornerstoneTools.setToolActiveForElement(this.element, 'RectangleRoi', {
                mouseButtonMask: 1
              }, ['Mouse']);
            }
          } // Play Clip

        }, {
          key: "playClip",
          value: function playClip() {
            if (this.imageCount > 0) {
              var frameRate = 10;
              var stackState = cornerstoneTools.getToolState(this.element, 'stack');

              if (stackState) {
                frameRate = stackState.data[0].frameRate; // Play at a default 10 FPS if the framerate is not specified

                if (frameRate === undefined || frameRate === null || frameRate === 0) {
                  frameRate = 10;
                }
              }

              cornerstoneTools.playClip(this.element, frameRate);
            }
          } // Stop Clip

        }, {
          key: "stopClip",
          value: function stopClip() {
            cornerstoneTools.stopClip(this.element);
          } // invert image

        }, {
          key: "invertImage",
          value: function invertImage() {
            if (this.imageCount > 0) {
              var viewport = cornerstone.getViewport(this.element); // Toggle invert

              if (viewport.invert === true) {
                viewport.invert = false;
              } else {
                viewport.invert = true;
              }

              cornerstone.setViewport(this.element, viewport);
            }
          } // reset image

        }, {
          key: "resetImage",
          value: function resetImage() {
            if (this.imageCount > 0) {
              var toolStateManager = cornerstoneTools.getElementToolStateManager(this.element); // Note that this only works on ImageId-specific tool state managers (for now)
              //toolStateManager.clear(this.element);

              cornerstoneTools.clearToolState(this.element, "Length");
              cornerstoneTools.clearToolState(this.element, "Angle"); // cornerstoneTools.clearToolState(this.element, "simpleAngle");

              cornerstoneTools.clearToolState(this.element, "Probe");
              cornerstoneTools.clearToolState(this.element, "EllipticalRoi");
              cornerstoneTools.clearToolState(this.element, "RectangleRoi");
              cornerstone.updateImage(this.element);
              this.resetAllTools();
            }
          }
        }, {
          key: "clearImage",
          value: function clearImage() {
            this.viewPort.resetViewer();
            this.viewPort.resetImageCache();
            this.seriesList = []; // list of series on the images being displayed

            this.currentSeriesIndex = 0;
            this.currentSeries = {};
            this.imageCount = 0; // total image count being viewed
          }
        }]);

        return DICOMViewerComponent;
      }();

      DICOMViewerComponent.ɵfac = function DICOMViewerComponent_Factory(t) {
        return new (t || DICOMViewerComponent)();
      };

      DICOMViewerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: DICOMViewerComponent,
        selectors: [["dicom-viewer"]],
        viewQuery: function DICOMViewerComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](CornerstoneDirective, 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](ThumbnailDirective, 1);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.viewPort = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.thumbnails = _t);
          }
        },
        inputs: {
          enableViewerTools: "enableViewerTools",
          enablePlayTools: "enablePlayTools",
          downloadImagesURL: "downloadImagesURL",
          maxImagesToLoad: "maxImagesToLoad"
        },
        decls: 35,
        vars: 15,
        consts: [[2, "display", "flex", "width", "100%", "height", "100%"], ["class", "thumbnailSelector", "style", "margin-right: 5px;", 4, "ngIf"], [2, "overflow", "hidden", "width", "100%", "height", "100%", "background-color", "#424242"], [1, "btn-group"], ["class", "btn-group", 4, "ngIf"], ["type", "  button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Zoom", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-search"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Pan", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-arrows-alt"], ["type", "button", "style", "border-left: 1px dotted white;", "class", "btn btn-sm btn-default", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Play Clip", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn btn-sm btn-default", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Stop Clip", 3, "click", 4, "ngIf"], ["download", "", "style", "border-left: 1px dotted white;", "class", "btn btn-sm btn-default", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Download Imagens", 3, "href", 4, "ngIf"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Imagem Anterior", 1, "btn", "btn-sm", "btn-default", 2, "border-left", "1px dotted white", 3, "ngStyle", "click"], [1, "fa", "fa-backward"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Pr\xF3xima Imagem", 1, "btn", "btn-sm", "btn-default", 3, "ngStyle", "click"], [1, "fa", "fa-forward"], ["type", "button", "style", "border-left: 1px dotted white;color: white;white-space: nowrap;", "class", "btn btn-sm btn-default", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Carrega mais imagens...", 3, "click", 4, "ngIf"], [2, "padding-left", "15px", "padding-top", "15px", 3, "ngStyle"], ["diameter", "30", "strokeWidth", "5", "color", "warn", 2, "display", "inline-block"], ["oncontextmenu", "return false", "unselectable", "on", "onselectstart", "return false;", "onmousedown", "return false;", 1, "cornerstone-enabled-image", 2, "width", "100%", "height", "calc(100% - 60px)", "position", "relative", "display", "inline-block", "color", "white"], ["cornerstone", "", "id", "dicomImage", 2, "width", "100%", "height", "100%", "top", "0px", "left", "0px", "position", "absolute", "outline", "none", "margin", "0 auto"], ["id", "mrtopleft", 2, "position", "absolute", "top", "3px", "left", "3px"], ["id", "mrtopright", 2, "position", "absolute", "top", "3px", "right", "3px"], ["id", "mrbottomleft", 2, "position", "absolute", "bottom", "3px", "left", "3px"], ["id", "mrbottomright", 2, "position", "absolute", "bottom", "6px", "right", "3px"], ["id", "sliceText"], [1, "thumbnailSelector", 2, "margin-right", "5px"], [1, "thumbnails", "list-group", 2, "height", "100%"], ["class", "list-group-item", "oncontextmenu", "return false", "unselectable", "on", "onselectstart", "return false;", "onmousedown", "return false;", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "version"], [2, "color", "white"], ["oncontextmenu", "return false", "unselectable", "on", "onselectstart", "return false;", "onmousedown", "return false;", 1, "list-group-item", 3, "ngClass", "click"], ["thumbnail", "", "oncontextmenu", "return false", "unselectable", "on", "onselectstart", "return false;", "onmousedown", "return false;", 1, "csthumbnail", 3, "imageData"], [1, "text-center", "small", 2, "color", "white"], ["id", "imageCount", 2, "color", "rgb(211, 34, 81)", "font-size", "14pt"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Windowing", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-sun"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Invert", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-adjust"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Scroll", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-bars"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Length", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-arrows-alt-v"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Angle", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-angle-left"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Pixel Probe", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-dot-circle"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Elliptical ROI", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-circle"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Rectangle ROI", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-square"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Reset Image", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-window-restore"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Play Clip", 1, "btn", "btn-sm", "btn-default", 2, "border-left", "1px dotted white", 3, "click"], [1, "fa", "fa-play"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Stop Clip", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-stop"], ["download", "", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Download Imagens", 1, "btn", "btn-sm", "btn-default", 2, "border-left", "1px dotted white", 3, "href"], [1, "fa", "fa-download"], ["type", "button", "data-container", "body", "data-toggle", "tooltip", "data-placement", "bottom", "title", "Carrega mais imagens...", 1, "btn", "btn-sm", "btn-default", 2, "border-left", "1px dotted white", "color", "white", "white-space", "nowrap", 3, "click"], [1, "fas", "fa-cloud-download-alt"]],
        template: function DICOMViewerComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, DICOMViewerComponent_div_1_Template, 7, 1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, DICOMViewerComponent_div_5_Template, 19, 0, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_Template_button_click_7_listener() {
              return ctx.enableZoom();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "span", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_Template_button_click_9_listener() {
              return ctx.enablePan();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "span", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, DICOMViewerComponent_button_11_Template, 2, 0, "button", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, DICOMViewerComponent_button_12_Template, 2, 0, "button", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, DICOMViewerComponent_a_13_Template, 2, 1, "a", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_Template_button_click_14_listener() {
              return ctx.previousImage();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "span", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DICOMViewerComponent_Template_button_click_16_listener() {
              return ctx.nextImage();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "span", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, DICOMViewerComponent_a_18_Template, 3, 1, "a", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "mat-spinner", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "div", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.seriesList.length > 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.enableViewerTools);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.enablePlayTools);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.enablePlayTools);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.downloadImagesURL != "");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx.hidePreviousImage);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx.hideNextImage);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.moreImagestoLoad != "");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx.showProgress);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.viewPort.patientName, " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.viewPort.hospital, " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.viewPort.instanceNumber, " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" WW/WC: ", ctx.viewPort.windowingValue, " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("Image: ", ctx.imageCount > 0 ? ctx.viewPort.currentIndex + 1 : 0, "/", ctx.imageCount, "");
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgStyle"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_4__["MatSpinner"], CornerstoneDirective, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], ThumbnailDirective],
        styles: [".btn-default[_ngcontent-%COMP%]{color:#fff;background-color:#424242;border-color:#424242;font-size:24pt;background-image:none;text-shadow:none}.thumbnailSelector[_ngcontent-%COMP%]{width:106px;float:left;margin-left:5px;height:100%;background-color:#424242}.thumbnails[_ngcontent-%COMP%]{margin:0;overflow-y:scroll;overflow-x:hidden}.csthumbnail[_ngcontent-%COMP%]{color:#fff;background-color:#000;width:100px;height:100px;border:0;padding:0}.version[_ngcontent-%COMP%]{position:absolute;bottom:20px;width:106px;text-align:center}a.list-group-item[_ngcontent-%COMP%]{background-color:#000;padding:2px;border:1px solid #424242;z-index:5;margin-bottom:3px}a.list-group-item.active[_ngcontent-%COMP%], a.list-group-item.active[_ngcontent-%COMP%]:focus, a.list-group-item.active[_ngcontent-%COMP%]:hover{background-color:#424242;border-color:#4e4e4e;background-image:linear-gradient(#d32251,#d32251,#d32251)}a.list-group-item.active[_ngcontent-%COMP%]{color:#00f}"]
      });

      DICOMViewerComponent.ctorParameters = function () {
        return [];
      };

      DICOMViewerComponent.propDecorators = {
        enableViewerTools: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        enablePlayTools: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        downloadImagesURL: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        maxImagesToLoad: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        viewPort: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
          args: [CornerstoneDirective, {
            "static": true
          }]
        }],
        thumbnails: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"],
          args: [ThumbnailDirective]
        }]
      };

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DICOMViewerComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'dicom-viewer',
            template: "<div style=\"display: flex; width:100%; height: 100%;\">\n    <div class=\"thumbnailSelector\" *ngIf=\"seriesList.length > 1\" style=\"margin-right: 5px;\">\n        <div class=\"thumbnails list-group\" style=\"height: 100%;\">\n            <a *ngFor=\"let series of seriesList; let i=index\" [ngClass]=\"{'active': currentSeriesIndex === i}\" class=\"list-group-item\"\n                oncontextmenu=\"return false\" unselectable=\"on\" onselectstart=\"return false;\" onmousedown=\"return false;\"\n                (click)=\"showSeries(i)\">\n                <div thumbnail [imageData]=\"series.imageList[0]\" class=\"csthumbnail\" oncontextmenu=\"return false\"\n                    unselectable=\"on\" onselectstart=\"return false;\" onmousedown=\"return false;\">\n                </div>\n                <div class=\"text-center small\" style=\"color:white;\">{{series.seriesDescription}}</div>\n                <div id=\"mrtopright\" style=\"position: absolute;top:3px; right:3px\">\n                    <div id=\"imageCount\" style=\"color: rgb(211, 34, 81); font-size: 14pt\">{{series.imageCount}}</div>\n                </div>\n            </a>\n            <div class=\"version\">\n                <h6 style=\"color:white;\"><small>1.20.12.17</small></h6>\n            </div>\n        </div>\n    </div>\n\n    <!--container where image will be loaded-->\n    <div style=\"overflow: hidden; width: 100%; height: 100%; background-color: #424242;\">\n\n        <!-- Toolbar -->\n        <div>\n            <div class=\"btn-group\">\n                <div class=\"btn-group\" *ngIf=\"enableViewerTools\">\n\n                    <!-- WW/WL -->\n                    <button type=\"button\" (click)=\"enableWindowing()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Windowing\"><span class=\"fa fa-sun\"></span></button>\n                    <!-- Invert -->\n                    <button type=\"button\" (click)=\"invertImage()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Invert\"><span class=\"fa fa-adjust\"></span></button>\n                    <!-- Stack scroll -->\n                    <button type=\"button\" (click)=\"enableScroll()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Scroll\"><span class=\"fa fa-bars\"></span></button>\n                    <!-- Length measurement -->\n                    <button type=\"button\" (click)=\"enableLength()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Length\"><span class=\"fa fa-arrows-alt-v\"></span></button>\n                    <!-- Angle measurement -->\n                    <button type=\"button\" (click)=\"enableAngle()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Angle\"><span class=\"fa fa-angle-left\"></span></button>\n                    <!-- Pixel probe -->\n                    <button type=\"button\" (click)=\"enableProbe()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Pixel Probe\"><span class=\"fa fa-dot-circle\"></span></button>\n                    <!-- Elliptical ROI -->\n                    <button type=\"button\" (click)=\"enableElliptical()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Elliptical ROI\"><span class=\"fa fa-circle\"></span></button>\n                    <!-- Rectangle ROI -->\n                    <button type=\"button\" (click)=\"enableRectangle()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Rectangle ROI\"><span class=\"fa fa-square\"></span></button>\n                    <!-- Reset Image -->\n                    <button type=\"button\" (click)=\"resetImage()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Reset Image\"><span class=\"fa fa-window-restore\"></span></button>\n                </div>\n                <div class=\"btn-group\">\n                    <!-- Zoom -->\n                    <button type=\"  button\" (click)=\"enableZoom()\" class=\"btn btn-sm btn-default\" data-container='body'\n                      data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Zoom\"><span class=\"fa fa-search\"></span></button>\n                    <!-- Pan -->\n                    <button type=\"button\" (click)=\"enablePan()\" class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"tooltip\"\n                      data-placement=\"bottom\" title=\"Pan\"><span class=\"fa fa-arrows-alt\"></span></button>\n                    <!-- Play clip -->\n                    <button type=\"button\" *ngIf=\"enablePlayTools\" (click)=\"playClip()\" style=\"border-left: 1px dotted white;\" class=\"btn btn-sm btn-default\"\n                        data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Play Clip\"><span\n                            class=\"fa fa-play\"></span></button>\n                    <!-- Stop clip -->\n                    <button type=\"button\" *ngIf=\"enablePlayTools\" (click)=\"stopClip()\" class=\"btn btn-sm btn-default\" data-container='body'\n                        data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Stop Clip\"><span class=\"fa fa-stop\"></span></button>\n\n                    <!-- Layout -->\n                    <!--                 <button type=\"button\" style=\"border-left: 1px dotted white;\" [matMenuTriggerFor]=\"menu\" class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"dropdown\" aria-expanded=\"false\" data-placement=\"top\" title=\"Layout\"><span class=\"fa fa-th-large\"></span></button>\n                  <mat-menu #menu=\"matMenu\">\n                          <a mat-menu-item class=\"dropdown-item\" >1x1</a>\n                          <a mat-menu-item class=\"dropdown-item\" >2x1</a>\n                          <a mat-menu-item class=\"dropdown-item\" >1x2</a>\n                          <a mat-menu-item class=\"dropdown-item\" >2x2</a>\n\n                  </mat-menu> -->\n\n                    <!-- Download -->\n                    <a *ngIf=\"downloadImagesURL != ''\" [href]=\"downloadImagesURL\" download style=\"border-left: 1px dotted white;\"\n                        class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\"\n                        title=\"Download Imagens\">\n                        <span class=\"fa fa-download\"></span>\n                    </a>\n\n                    <!-- Imagem Anterior -->\n                    <button type=\"button\" (click)=\"previousImage()\" [ngStyle]=\"hidePreviousImage\" style=\"border-left: 1px dotted white;\"\n                        class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\"\n                        title=\"Imagem Anterior\"><span class=\"fa fa-backward\"></span></button>\n                    <!-- Pr\xF3xima Imagem -->\n                    <button type=\"button\" (click)=\"nextImage()\" [ngStyle]=\"hideNextImage\" class=\"btn btn-sm btn-default\"\n                        data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Pr\xF3xima Imagem\"><span\n                            class=\"fa fa-forward\"></span></button>\n\n                    <!-- Load Next Batch -->\n                    <a type=\"button\" *ngIf=\"moreImagestoLoad != ''\" (click)=\"loadMoreImages()\" style=\"border-left: 1px dotted white;color: white;white-space: nowrap;\"\n                        class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\"\n                        title=\"Carrega mais imagens...\"><i class=\"fas fa-cloud-download-alt\"></i> clique aqui para trazer as pr\xF3ximas {{moreImagestoLoad}} imagens\n                    </a>\n\n                    <!-- Progress Spinner -->\n                    <div style=\"padding-left: 15px; padding-top: 15px;\" [ngStyle]=\"showProgress\">\n                        <mat-spinner style=\"display: inline-block;\" diameter=\"30\" strokeWidth=\"5\" color=\"warn\"></mat-spinner>\n                    </div>\n\n                </div>\n\n            </div>\n        </div>\n        <div style=\"width: 100%; height: calc(100% - 60px);position:relative;display:inline-block;color:white;\"\n            oncontextmenu=\"return false\" class='cornerstone-enabled-image' unselectable='on' onselectstart='return false;'\n            onmousedown='return false;'>\n            <div cornerstone style=\"width: 100%; height: 100%;top:0px;left:0px;position:absolute;outline:none;margin: 0 auto;\"\n                id=\"dicomImage\">\n            </div>\n            <div id=\"mrtopleft\" style=\"position: absolute;top:3px; left:3px\">\n                {{viewPort.patientName}}\n            </div>\n            <div id=\"mrtopright\" style=\"position: absolute;top:3px; right:3px\">\n                {{viewPort.hospital}}\n            </div>\n            <div id=\"mrbottomleft\" style=\"position: absolute;bottom:3px; left:3px\">\n                <div>\n                    {{viewPort.instanceNumber}}\n                </div>\n                <div>\n                    WW/WC: {{viewPort.windowingValue}}\n                </div>\n            </div>\n            <div id=\"mrbottomright\" style=\"position: absolute;bottom:6px; right:3px\">\n                <!-- <div id=\"zoomText\">Zoom: {{viewPort.zoomValue}}</div> -->\n                <div id=\"sliceText\">Image: {{(imageCount > 0)?viewPort.currentIndex+1:0}}/{{imageCount}}</div>\n            </div>\n        </div>\n\n    </div>\n\n</div>\n",
            styles: [".btn-default{color:#fff;background-color:#424242;border-color:#424242;font-size:24pt;background-image:none;text-shadow:none}.thumbnailSelector{width:106px;float:left;margin-left:5px;height:100%;background-color:#424242}.thumbnails{margin:0;overflow-y:scroll;overflow-x:hidden}.csthumbnail{color:#fff;background-color:#000;width:100px;height:100px;border:0;padding:0}.version{position:absolute;bottom:20px;width:106px;text-align:center}a.list-group-item{background-color:#000;padding:2px;border:1px solid #424242;z-index:5;margin-bottom:3px}a.list-group-item.active,a.list-group-item.active:focus,a.list-group-item.active:hover{background-color:#424242;border-color:#4e4e4e;background-image:linear-gradient(#d32251,#d32251,#d32251)}a.list-group-item.active{color:#00f}"]
          }]
        }], function () {
          return [];
        }, {
          enableViewerTools: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          enablePlayTools: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          downloadImagesURL: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          maxImagesToLoad: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          viewPort: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [CornerstoneDirective, {
              "static": true
            }]
          }],
          thumbnails: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"],
            args: [ThumbnailDirective]
          }]
        });
      })();

      var DicomViewerModule = function DicomViewerModule() {
        _classCallCheck(this, DicomViewerModule);
      };

      DicomViewerModule.ɵfac = function DicomViewerModule_Factory(t) {
        return new (t || DicomViewerModule)();
      };

      DicomViewerModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: DicomViewerModule
      });
      DicomViewerModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        imports: [[_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_4__["MatProgressSpinnerModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](DicomViewerModule, {
          declarations: function declarations() {
            return [DICOMViewerComponent, CornerstoneDirective, ThumbnailDirective];
          },
          imports: function imports() {
            return [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_4__["MatProgressSpinnerModule"]];
          },
          exports: function exports() {
            return [DICOMViewerComponent, CornerstoneDirective, ThumbnailDirective];
          }
        });
      })();

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DicomViewerModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_4__["MatProgressSpinnerModule"]],
            declarations: [DICOMViewerComponent, CornerstoneDirective, ThumbnailDirective],
            exports: [DICOMViewerComponent, CornerstoneDirective, ThumbnailDirective]
          }]
        }], null, null);
      })();
      /*
       * Public API Surface of dicom-viewer
       */

      /**
       * Generated bundle index. Do not edit.
       */

      /***/

    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map