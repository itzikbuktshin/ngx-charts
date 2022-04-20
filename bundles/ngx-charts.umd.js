(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-charts', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory(global['ngx-charts'] = {}, global.ng.core, global.ng.common));
}(this, (function (exports, i0, common) { 'use strict';

    var NgxBubbleChartComponent = /** @class */ (function () {
        function NgxBubbleChartComponent() {
        }
        NgxBubbleChartComponent.prototype.ngOnInit = function () {
        };
        return NgxBubbleChartComponent;
    }());
    NgxBubbleChartComponent.ɵfac = function NgxBubbleChartComponent_Factory(t) { return new (t || NgxBubbleChartComponent)(); };
    NgxBubbleChartComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NgxBubbleChartComponent, selectors: [["ngx-charts-ngx-bubble-chart"]], decls: 2, vars: 0, template: function NgxBubbleChartComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "p");
                i0.ɵɵtext(1, "ngx-bubble-chart works!");
                i0.ɵɵelementEnd();
            }
        }, styles: [""] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NgxBubbleChartComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-charts-ngx-bubble-chart',
                        templateUrl: './ngx-bubble-chart.component.html',
                        styleUrls: ['./ngx-bubble-chart.component.scss']
                    }]
            }], function () { return []; }, null);
    })();

    var NgxBubbleChartModule = /** @class */ (function () {
        function NgxBubbleChartModule() {
        }
        return NgxBubbleChartModule;
    }());
    NgxBubbleChartModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxBubbleChartModule });
    NgxBubbleChartModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgxBubbleChartModule_Factory(t) { return new (t || NgxBubbleChartModule)(); }, imports: [[
                common.CommonModule
            ]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxBubbleChartModule, { declarations: [NgxBubbleChartComponent], imports: [common.CommonModule], exports: [NgxBubbleChartComponent] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NgxBubbleChartModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [NgxBubbleChartComponent],
                        imports: [
                            common.CommonModule
                        ],
                        exports: [NgxBubbleChartComponent]
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgxBubbleChartComponent = NgxBubbleChartComponent;
    exports.NgxBubbleChartModule = NgxBubbleChartModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-charts.umd.js.map
