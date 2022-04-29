(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../dist/ngx-charts/fesm2015/ngx-charts.js":
/*!**************************************************************************************!*\
  !*** /home/runner/work/ngx-charts/ngx-charts/dist/ngx-charts/fesm2015/ngx-charts.js ***!
  \**************************************************************************************/
/*! exports provided: NgxBubbleChartComponent, NgxBubbleChartModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxBubbleChartComponent", function() { return NgxBubbleChartComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxBubbleChartModule", function() { return NgxBubbleChartModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




class Circle {
    constructor(radius, center, selected) {
        this.selected = false;
        this.radius = radius;
        this.center = center;
        this.selected = selected;
    }
    get geo() {
        return {
            cx: this.center.x,
            cy: this.center.y,
            r: this.radius
        };
    }
    surface() {
        return Math.PI * this.radius * this.radius;
    }
    distance(circle) {
        return this.center.dist(circle.center) - this.radius - circle.radius;
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    dist(p) {
        return this.vect(p).norm();
    }
    vect(p) {
        return new Point(p.x - this.x, p.y - this.y);
    }
    norm() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    add(v) {
        return new Point(this.x + v.x, this.y + v.y);
    }
    mult(a) {
        return new Point(this.x * a, this.y * a);
    }
    inCircle(cx, cy, radius) {
        const dx = cx - this.x;
        const dy = cy - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < radius;
    }
}

class Packer {
    constructor(radiuses, ratio, circles) {
        this.radiuses = radiuses;
        this.ratio = ratio || 1;
        this.list = circles || this.solve();
    }
    compute(surface) {
        const bounding_r = Math.sqrt(surface) * 100;
        const w = (this.width = Math.sqrt(surface * this.ratio));
        const h = (this.height = this.width / this.ratio);
        const in_rect = (radius, center) => {
            if (center.x - radius < -w / 2)
                return false;
            if (center.x + radius > w / 2)
                return false;
            if (center.y - radius < -h / 2)
                return false;
            if (center.y + radius > h / 2)
                return false;
            return true;
        };
        // approximate a segment with an "infinite" radius circle
        const bounding_circle = (x0, y0, x1, y1) => {
            const xm = Math.abs((x1 - x0) * w);
            const ym = Math.abs((y1 - y0) * h);
            const m = xm > ym ? xm : ym;
            const theta = Math.asin(m / 4 / bounding_r);
            const r = bounding_r * Math.cos(theta);
            return new Circle(bounding_r, new Point((r * (y0 - y1)) / 2 + ((x0 + x1) * w) / 4, (r * (x1 - x0)) / 2 + ((y0 + y1) * h) / 4));
        };
        // return the corner placements for two circles
        const corner = (radius, c1, c2) => {
            let u = c1.center.vect(c2.center); // c1 to c2 vector
            const A = u.norm();
            if (A == 0)
                return []; // same centers
            u = u.mult(1 / A); // c1 to c2 unary vector
            // compute c1 and c2 intersection coordinates in (u,v) base
            const B = c1.radius + radius;
            const C = c2.radius + radius;
            if (A > B + C)
                return []; // too far apart
            const x = (A + (B * B - C * C) / A) / 2;
            const y = Math.sqrt(B * B - x * x);
            const base = c1.center.add(u.mult(x));
            const res = [];
            const p1 = new Point(base.x - u.y * y, base.y + u.x * y);
            const p2 = new Point(base.x + u.y * y, base.y - u.x * y);
            if (in_rect(radius, p1))
                res.push(new Circle(radius, p1));
            if (in_rect(radius, p2))
                res.push(new Circle(radius, p2));
            return res;
        };
        // place our bounding circles
        const placed = [
            bounding_circle(1, 1, 1, -1),
            bounding_circle(1, -1, -1, -1),
            bounding_circle(-1, -1, -1, 1),
            bounding_circle(-1, 1, 1, 1)
        ];
        // Initialize our rectangles list
        const unplaced = this.radiuses.slice(0); // clones the array
        while (unplaced.length > 0) {
            // compute all possible placements of the unplaced circles
            const lambda = {};
            const circle = {};
            for (let i = 0; i != unplaced.length; i++) {
                let lambda_min = 1e10;
                lambda[i] = -1e10;
                // match current circle against all possible pairs of placed circles
                for (let j = 0; j < placed.length; j++)
                    for (let k = j + 1; k < placed.length; k++) {
                        const corners = corner(unplaced[i], placed[j], placed[k]);
                        // check each placement
                        for (let c = 0; c != corners.length; c++) {
                            // check for overlap and compute min distance
                            let d_min = 1e10;
                            let l = 0;
                            for (; l != placed.length; l++) {
                                // skip the two circles used for the placement
                                if (l == j || l == k)
                                    continue;
                                // compute distance from current circle
                                const d = placed[l].distance(corners[c]);
                                if (d < 0)
                                    break; // circles overlap
                                if (d < d_min)
                                    d_min = d;
                            }
                            if (l == placed.length) {
                                // no overlap
                                if (d_min < lambda_min) {
                                    lambda_min = d_min;
                                    lambda[i] = 1 - d_min / unplaced[i];
                                    circle[i] = corners[c];
                                }
                            }
                        }
                    }
            }
            // select the circle with maximal gain
            let lambda_max = -1e10;
            let i_max = -1;
            for (let i = 0; i != unplaced.length; i++) {
                if (lambda[i] > lambda_max) {
                    lambda_max = lambda[i];
                    i_max = i;
                }
            }
            // failure if no circle fits
            if (i_max == -1)
                break;
            // place the selected circle
            unplaced.splice(i_max, 1);
            placed.push(circle[i_max]);
        }
        // return all placed circles except the four bounding circles
        this.tmpBounds = placed.splice(0, 4);
        return placed;
    }
    solve() {
        let surface = 0;
        for (let i = 0; i != this.radiuses.length; i++) {
            surface += Math.PI * Math.pow(this.radiuses[i], 2);
        }
        // set a suitable precision
        const limit = surface / 1000;
        let step = surface / 2;
        let res = [];
        while (step > limit) {
            const placement = this.compute(surface);
            if (placement.length != this.radiuses.length) {
                surface += step;
            }
            else {
                res = placement;
                this.bounds = this.tmpBounds;
                surface -= step;
            }
            step /= 2;
        }
        return res;
    }
}

function getFont(fontSize = '12px', fontName = 'Helvetica') {
    return `${fontSize} ${fontName}`;
}
function wrapTextInCircle(ctx, text, circle, textHeight, fontName, fontSize, textColor, paddingX = 20) {
    if (!text)
        return;
    let index = 0;
    let textRows = [];
    const words = text.split(" ");
    const font = `500 ${fontSize}px ${fontName}`;
    const lineHeight = textHeight + 7;
    const { cx, cy, r } = circle.geo;
    const circleDiameter = 2 * r;
    const y0 = cy - r;
    const initTextLines = () => {
        const lines = [];
        for (let y = r; y > -r; y -= lineHeight) {
            let height = Math.abs(r - y);
            const length = 2 * Math.sqrt(height * (circleDiameter - height));
            if (length && length > 10) {
                const maxLength = (length + paddingX >= circleDiameter) ? length - paddingX : length;
                lines.push({ y, maxLength });
            }
        }
        return lines;
    };
    // calculate how many words will fit on a line
    const calcAllowableWords = (maxWidth, words) => {
        let testLine = "";
        let spacer = "";
        let fittedWidth = 0;
        let fittedText = "";
        let width = 0;
        ctx.font = font;
        for (let i = 0; i < words.length; i++) {
            testLine += spacer + words[i];
            spacer = " ";
            width = ctx.measureText(testLine).width;
            if (width > maxWidth) {
                return ({
                    count: i,
                    width: fittedWidth,
                    text: fittedText
                });
            }
            fittedWidth = width;
            fittedText = testLine;
        }
        return {
            count: words.length,
            width: width,
            text: testLine,
        };
    };
    const textLines = initTextLines();
    while (index < textLines.length && words.length > 0) {
        const line = textLines[index++];
        const lineData = calcAllowableWords(line.maxLength, words);
        let lineWords = words.splice(0, lineData.count);
        let textLine = lineWords.join(" ");
        const textLineData = {
            lineData,
            line,
            textLine
        };
        textRows.push(textLineData);
    }
    ;
    const placedWords = textRows.map(({ lineData }) => lineData.count).reduce((prev, next) => prev + next);
    const unplacedWords = text.split(" ").length - placedWords;
    if (unplacedWords > 0) {
        // scale font size
        return this.wrapTextInCircle(ctx, text, circle, textHeight, fontName, fontSize -= 1, textColor);
    }
    const placedRows = textRows.filter(({ lineData }) => {
        return lineData.count !== 0;
    });
    const textBoxHeight = placedRows.length * lineHeight;
    const topPadding = ((circleDiameter - textBoxHeight) / 2);
    ctx.fillStyle = textColor;
    placedRows.forEach(({ lineData, textLine }, index) => {
        let x = cx - lineData.width / 2;
        let y = (y0 + topPadding) + (lineHeight * (index + 1));
        ctx.fillText(textLine, x, y);
    });
}
function drawImage(ctx, src, imageWidth, imageHeight, dx, dy, text, textColor = '') {
    let image = null;
    const space = !!text ? 5 : 0;
    if (!!text) {
        const txtSize = ctx.measureText(text);
        const blockSize = imageWidth + space + txtSize.width;
        dx = dx - (blockSize / 2);
        this.fillText(ctx, text, textColor, (dx + space + imageWidth), dy + imageHeight);
    }
    image = new Image(imageWidth, imageHeight);
    image.src = src;
    image.onload = () => {
        ctx.drawImage(image, dx, dy);
    };
}
function fillText(ctx, text, textColor, dx, dy, maxWidth, fontSize = '12px', fontName = 'Helvetica') {
    const txtSize = ctx.measureText(text);
    ctx.fillStyle = textColor;
    ctx.font = this.getFont(fontSize, fontName);
    ctx.fillText(text, dx, dy, maxWidth || txtSize.width);
    return txtSize.width;
}

class NgxBubbleChartService {
    constructor() {
        this._bubbleSelectedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this._circlels = [];
        this._margin = 0.85;
        this._marginFactor = 0;
    }
    get bubbleSelected$() {
        return this._bubbleSelectedSubject.asObservable();
    }
    draw(bubbles, width, height, minRadius, maxRadius, chartElm) {
        this._circlels = [];
        let bubblesCircles;
        const radiuses = this.getRadiuses(bubbles, minRadius, maxRadius);
        this._canvasWidth = width;
        this._canvasHeight = height;
        const ratio = this._canvasWidth / this._canvasHeight;
        const canvas = chartElm.nativeElement;
        bubbles.forEach(({ circleRef }) => {
            if (!circleRef)
                return;
            if (!bubblesCircles)
                bubblesCircles = [];
            bubblesCircles.push(circleRef);
        });
        const packer = new Packer(radiuses, ratio, bubblesCircles);
        packer.mx = (width * this._marginFactor) / 2;
        packer.my = (height * this._marginFactor) / 2;
        packer.dx = packer.width / 2;
        packer.dy = packer.height / 2;
        this.drawResult(packer, canvas, bubbles);
        this.listenToClickEvents(canvas, packer);
    }
    drawCircle(circle, ctx, packer) {
        const color = circle.selected ? "#1300ab" : "#e5e5e5";
        const fontName = 'Helvetica';
        const paddingBottom = 20;
        const { countOther, value } = circle.data || { countOther: 1, value: '' };
        if (!value)
            return;
        const cx = (circle.center.x + packer.dx) * packer.zoom + packer.mx;
        const cy = (circle.center.y + packer.dy) * packer.zoom + packer.my;
        const r = circle.radius * packer.zoom * this._margin;
        const textColor = circle.selected ? "#ffffff" : "#737373";
        const imageSrc = `assets/images/person-user${circle.selected ? '-active' : ''}-icon.svg`;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#e5e5e5';
        ctx.stroke();
         false && false;
         false && false;
        ctx.closePath();
    }
    ;
    drawResult(packer, canvas, bubbles) {
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = this._canvasWidth;
        ctx.canvas.height = this._canvasHeight;
        const zx = (canvas.width * (1 - this._marginFactor)) / packer.width;
        const zy = (canvas.height * (1 - this._marginFactor)) / packer.height;
        packer.zoom = zx < zy ? zx : zy;
        const sortedCircles = packer.list.sort((a, b) => (a.radius > b.radius ? -1 : 1));
        sortedCircles.forEach((circle, index) => {
            const { id, selected, value } = bubbles[index];
            circle.id = id;
            circle.data = {
                value
            };
            const bubble = bubbles.find((bubble) => bubble.id === id);
            bubble.circleRef = circle;
            circle.selected = selected;
            this.drawCircle(circle, ctx, packer);
            this._circlels.push(circle);
        });
        // draw bounding circles
        for (var i = 0; i != packer.bounds.length; i++) {
            this.drawCircle(packer.bounds[i], ctx, packer);
        }
        ctx.beginPath();
        ctx.rect((-packer.width / 2 + packer.dx) * packer.zoom + packer.mx, (-packer.height / 2 + packer.dy) * packer.zoom + packer.my, packer.width * packer.zoom, packer.height * packer.zoom);
        ctx.closePath();
    }
    getRadiuses(bubbles, minRadius, maxRadius) {
        const radiuses = [];
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;
        bubbles.forEach((bubble) => {
            if (bubble.value > max) {
                max = bubble.value;
            }
            else if (bubble.value < min) {
                min = bubble.value;
            }
        });
        bubbles.forEach((bubble) => {
            const { value } = bubble;
            const radius = (((value - min) / (max - min)) * (maxRadius - minRadius)) + minRadius;
            radiuses.push(radius);
        });
        return radiuses;
    }
    isPointInCircle(circle, point, packer) {
        const { radius } = circle;
        const cx = (circle.center.x + packer.dx) * packer.zoom + packer.mx;
        const cy = (circle.center.y + packer.dy) * packer.zoom + packer.my;
        return point.inCircle(cx, cy, radius * packer.zoom * this._margin);
    }
    listenToClickEvents(canvas, packer) {
        const ctx = canvas.getContext('2d');
        canvas.addEventListener("click", (event) => {
            let clikedPoint = new Point(event.offsetX, event.offsetY);
            this._circlels.forEach((circle) => {
                if (!this.isPointInCircle(circle, clikedPoint, packer))
                    return;
                this._bubbleSelectedSubject.next(circle.id);
                circle.selected = !circle.selected;
                this.drawCircle(circle, ctx, packer);
            });
        }, true);
    }
}
NgxBubbleChartService.ɵfac = function NgxBubbleChartService_Factory(t) { return new (t || NgxBubbleChartService)(); };
NgxBubbleChartService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: NgxBubbleChartService, factory: NgxBubbleChartService.ɵfac });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(NgxBubbleChartService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], null, null); })();

const _c0 = ["bubbleChart"];
class NgxBubbleChartComponent {
    constructor(bubbleChartService) {
        this.bubbleChartService = bubbleChartService;
        this.id = `ngx-bubble-chart-${NgxBubbleChartComponent.Id++}`;
    }
    set chart(chart) {
        var _a;
        const bubbles = (_a = chart === null || chart === void 0 ? void 0 : chart.bubbles) === null || _a === void 0 ? void 0 : _a.map((bubble) => {
            var _a;
            return Object.assign(Object.assign({}, bubble), { selected: (_a = chart === null || chart === void 0 ? void 0 : chart.selectedBubbles) === null || _a === void 0 ? void 0 : _a.includes(bubble.id) });
        });
        const bubbleChart = Object.assign(Object.assign({}, chart), { bubbles });
        this.draw(bubbleChart);
    }
    draw(bubbleChart) {
        const isMobile = false;
        const minRadius = isMobile ? 45 : 35;
        const maxRadius = isMobile ? 80 : 90;
        setTimeout(() => {
            this.bubbleChartService.draw(bubbleChart.bubbles, bubbleChart.options.width, bubbleChart.options.height, minRadius, maxRadius, this.chartElm);
        }, 0);
    }
}
NgxBubbleChartComponent.Id = 0;
NgxBubbleChartComponent.ɵfac = function NgxBubbleChartComponent_Factory(t) { return new (t || NgxBubbleChartComponent)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"])(NgxBubbleChartService)); };
NgxBubbleChartComponent.ɵcmp = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"])({ type: NgxBubbleChartComponent, selectors: [["ngx-charts-ngx-bubble-chart"]], viewQuery: function NgxBubbleChartComponent_Query(rf, ctx) { if (rf & 1) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"])(_c0, true);
    } if (rf & 2) {
        var _t;
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"])(_t = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"])()) && (ctx.chartElm = _t.first);
    } }, inputs: { chart: "chart" }, decls: 4, vars: 1, consts: [[1, "bubbleChart"], [3, "id"], ["bubbleChart", ""]], template: function NgxBubbleChartComponent_Template(rf, ctx) { if (rf & 1) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(0, "div", 0);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(1, "canvas", 1, 2);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(3, "div");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
    } if (rf & 2) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"])("id", ctx.id);
    } }, styles: [".bubbleChart[_ngcontent-%COMP%], [_nghost-%COMP%]{height:100%;width:100%}"] });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(NgxBubbleChartComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ngx-charts-ngx-bubble-chart',
                templateUrl: './ngx-bubble-chart.component.html',
                styleUrls: ['./ngx-bubble-chart.component.scss']
            }]
    }], function () { return [{ type: NgxBubbleChartService }]; }, { chartElm: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['bubbleChart']
        }], chart: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();

class NgxBubbleChartModule {
}
NgxBubbleChartModule.ɵmod = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"])({ type: NgxBubbleChartModule });
NgxBubbleChartModule.ɵinj = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"])({ factory: function NgxBubbleChartModule_Factory(t) { return new (t || NgxBubbleChartModule)(); }, providers: [NgxBubbleChartService], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"])(NgxBubbleChartModule, { declarations: [NgxBubbleChartComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]], exports: [NgxBubbleChartComponent] }); })();
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(NgxBubbleChartModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [NgxBubbleChartComponent],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
                ],
                providers: [NgxBubbleChartService],
                exports: [NgxBubbleChartComponent]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=ngx-charts.js.map


/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _components_bubble_chart_bubble_chart_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/bubble-chart/bubble-chart.component */ "./src/app/components/bubble-chart/bubble-chart.component.ts");





const routes = [
    {
        path: '',
        redirectTo: 'bubbles',
        pathMatch: 'full'
    },
    {
        path: 'bubbles',
        component: _components_bubble_chart_bubble_chart_component__WEBPACK_IMPORTED_MODULE_2__["BubbleChartComponent"]
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class AppComponent {
    constructor() {
        this.title = 'demo';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["demo-root"]], decls: 4, vars: 1, consts: [[1, "content"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "router-outlet");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.title, " app is running!");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9kZW1vL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'demo-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/components.module */ "./src/app/components/components.module.ts");






class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _components_components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/components/bubble-chart/bubble-chart.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/bubble-chart/bubble-chart.component.ts ***!
  \*******************************************************************/
/*! exports provided: BubbleChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BubbleChartComponent", function() { return BubbleChartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ngx_charts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-charts */ "../../dist/ngx-charts/fesm2015/ngx-charts.js");



class BubbleChartComponent {
    constructor() {
        this.bubbleChart = {
            options: {
                width: 500,
                height: 500
            },
            selectedBubbles: [1],
            bubbles: [
                { id: 1, value: 10 },
                { id: 2, value: 30 },
                { id: 3, value: 20 },
                { id: 4, value: 8 },
                { id: 5, value: 15 },
                { id: 6, value: 7 },
                { id: 7, value: 7 },
                { id: 8, value: 104 },
                { id: 9, value: 140 },
            ]
        };
    }
    add() {
        const nextId = this.getNextId();
        const bubbles = [
            ...this.bubbleChart.bubbles,
            {
                id: nextId,
                value: 55
            }
        ];
        this.refreshChart(bubbles);
    }
    remove() {
        const lestId = this.getLastAdded();
        if (!lestId)
            return;
        const bubbles = [
            ...this.bubbleChart.bubbles.filter((b) => b.id !== lestId)
        ];
        this.refreshChart(bubbles);
    }
    getNextId() {
        const maxId = this.getLastAdded() || 0;
        return maxId + 1;
    }
    getLastAdded() {
        const [max] = this.bubbleChart.bubbles.sort((a, b) => (a.id > b.id ? 1 : -1));
        return max === null || max === void 0 ? void 0 : max.id;
    }
    refreshChart(bubbles) {
        this.bubbleChart = Object.assign(Object.assign({}, this.bubbleChart), { bubbles });
    }
}
BubbleChartComponent.ɵfac = function BubbleChartComponent_Factory(t) { return new (t || BubbleChartComponent)(); };
BubbleChartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: BubbleChartComponent, selectors: [["demo-bubble-chart"]], decls: 5, vars: 1, consts: [[3, "click"], [3, "chart"]], template: function BubbleChartComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BubbleChartComponent_Template_button_click_0_listener() { return ctx.add(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Add");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BubbleChartComponent_Template_button_click_2_listener() { return ctx.remove(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Remove");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "ngx-charts-ngx-bubble-chart", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("chart", ctx.bubbleChart);
    } }, directives: [ngx_charts__WEBPACK_IMPORTED_MODULE_1__["NgxBubbleChartComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9kZW1vL3NyYy9hcHAvY29tcG9uZW50cy9idWJibGUtY2hhcnQvYnViYmxlLWNoYXJ0LmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BubbleChartComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'demo-bubble-chart',
                templateUrl: './bubble-chart.component.html',
                styleUrls: ['./bubble-chart.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/components/bubble-chart/bubble-chart.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/components/bubble-chart/bubble-chart.module.ts ***!
  \****************************************************************/
/*! exports provided: BubbleChartModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BubbleChartModule", function() { return BubbleChartModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var ngx_charts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-charts */ "../../dist/ngx-charts/fesm2015/ngx-charts.js");
/* harmony import */ var _bubble_chart_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bubble-chart.component */ "./src/app/components/bubble-chart/bubble-chart.component.ts");





class BubbleChartModule {
}
BubbleChartModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: BubbleChartModule });
BubbleChartModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function BubbleChartModule_Factory(t) { return new (t || BubbleChartModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            ngx_charts__WEBPACK_IMPORTED_MODULE_2__["NgxBubbleChartModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](BubbleChartModule, { declarations: [_bubble_chart_component__WEBPACK_IMPORTED_MODULE_3__["BubbleChartComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        ngx_charts__WEBPACK_IMPORTED_MODULE_2__["NgxBubbleChartModule"]], exports: [_bubble_chart_component__WEBPACK_IMPORTED_MODULE_3__["BubbleChartComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BubbleChartModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_bubble_chart_component__WEBPACK_IMPORTED_MODULE_3__["BubbleChartComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    ngx_charts__WEBPACK_IMPORTED_MODULE_2__["NgxBubbleChartModule"]
                ],
                exports: [_bubble_chart_component__WEBPACK_IMPORTED_MODULE_3__["BubbleChartComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/components/components.module.ts":
/*!*************************************************!*\
  !*** ./src/app/components/components.module.ts ***!
  \*************************************************/
/*! exports provided: ComponentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentsModule", function() { return ComponentsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _bubble_chart_bubble_chart_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bubble-chart/bubble-chart.module */ "./src/app/components/bubble-chart/bubble-chart.module.ts");




class ComponentsModule {
}
ComponentsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ComponentsModule });
ComponentsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ComponentsModule_Factory(t) { return new (t || ComponentsModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _bubble_chart_bubble_chart_module__WEBPACK_IMPORTED_MODULE_2__["BubbleChartModule"]
        ], _bubble_chart_bubble_chart_module__WEBPACK_IMPORTED_MODULE_2__["BubbleChartModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ComponentsModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _bubble_chart_bubble_chart_module__WEBPACK_IMPORTED_MODULE_2__["BubbleChartModule"]], exports: [_bubble_chart_bubble_chart_module__WEBPACK_IMPORTED_MODULE_2__["BubbleChartModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ComponentsModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _bubble_chart_bubble_chart_module__WEBPACK_IMPORTED_MODULE_2__["BubbleChartModule"]
                ],
                exports: [_bubble_chart_bubble_chart_module__WEBPACK_IMPORTED_MODULE_2__["BubbleChartModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
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


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/ngx-charts/ngx-charts/projects/demo/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map