import { ɵɵdefineComponent, ɵɵelementStart, ɵɵtext, ɵɵelementEnd, ɵsetClassMetadata, Component, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class NgxBubbleChartComponent {
    constructor() { }
    ngOnInit() {
    }
}
NgxBubbleChartComponent.ɵfac = function NgxBubbleChartComponent_Factory(t) { return new (t || NgxBubbleChartComponent)(); };
NgxBubbleChartComponent.ɵcmp = ɵɵdefineComponent({ type: NgxBubbleChartComponent, selectors: [["ngx-charts-ngx-bubble-chart"]], decls: 2, vars: 0, template: function NgxBubbleChartComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "p");
        ɵɵtext(1, "ngx-bubble-chart works!");
        ɵɵelementEnd();
    } }, styles: [""] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxBubbleChartComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-charts-ngx-bubble-chart',
                templateUrl: './ngx-bubble-chart.component.html',
                styleUrls: ['./ngx-bubble-chart.component.scss']
            }]
    }], function () { return []; }, null); })();

class NgxBubbleChartModule {
}
NgxBubbleChartModule.ɵmod = ɵɵdefineNgModule({ type: NgxBubbleChartModule });
NgxBubbleChartModule.ɵinj = ɵɵdefineInjector({ factory: function NgxBubbleChartModule_Factory(t) { return new (t || NgxBubbleChartModule)(); }, imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgxBubbleChartModule, { declarations: [NgxBubbleChartComponent], imports: [CommonModule], exports: [NgxBubbleChartComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxBubbleChartModule, [{
        type: NgModule,
        args: [{
                declarations: [NgxBubbleChartComponent],
                imports: [
                    CommonModule
                ],
                exports: [NgxBubbleChartComponent]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { NgxBubbleChartComponent, NgxBubbleChartModule };
//# sourceMappingURL=ngx-charts.js.map
