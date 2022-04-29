import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxBubble } from './ui/bubble';
import { Circle } from './ui/circle';
import { Packer } from './ui/packer';
import { Point } from './ui/point';
import { drawImage, wrapTextInCircle } from './utils/canvas.utils';

@Injectable()
export class NgxBubbleChartService {
  private _bubbleSelectedSubject = new Subject<number>();
  private _circlels: Circle[] = [];
  private _margin: number = 0.85;
  private _marginFactor: number = 0;
  private _canvasWidth: number;
  private _canvasHeight: number;

  get bubbleSelected$() {
    return this._bubbleSelectedSubject.asObservable();
  }

  draw(bubbles: NgxBubble[], width, height, minRadius, maxRadius, chartElm: ElementRef) {
    this._circlels = [];
    let bubblesCircles: Circle[];

    const radiuses = this.getRadiuses(bubbles, minRadius, maxRadius);
    this._canvasWidth = width;
    this._canvasHeight = height;
    const ratio = this._canvasWidth / this._canvasHeight;
    const canvas: any = <HTMLElement>chartElm.nativeElement;

    bubbles.forEach(({ circleRef }) => {
      if (!circleRef) return;
      if (!bubblesCircles) bubblesCircles = [];
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

  private drawCircle(circle: Circle, ctx: CanvasRenderingContext2D, packer: Packer) {
    const color = circle.selected ? "#1300ab" : "#e5e5e5";
    const fontName = 'Helvetica';
    const paddingBottom = 20;
    const { countOther, value } = circle.data || { countOther: 1, value: '' };
    if (!value) return;
    const cx = (circle.center.x + packer.dx) * packer.zoom + packer.mx;
    const cy = (circle.center.y + packer.dy) * packer.zoom + packer.my;
    const r = circle.radius * packer.zoom * this._margin;
    const textColor = circle.selected ? "#ffffff" : "#737373";
    const imageSrc = `assets/images/person-user${circle.selected ? '-active' : ''}-icon.svg`;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);

    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#e5e5e5'
    ctx.stroke();

    false && drawImage(ctx, imageSrc, 12, 12, cx, (cy + r) - paddingBottom, `${countOther}`, textColor);
    false && wrapTextInCircle(ctx, value, new Circle(r, new Point(cx, cy)), 10, fontName, 16, textColor);
    ctx.closePath();
  };

  private drawResult(packer: Packer, canvas, bubbles: NgxBubble[]) {
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    
    ctx.canvas.width = this._canvasWidth;
    ctx.canvas.height = this._canvasHeight;
    const zx = (canvas.width * (1 - this._marginFactor)) / packer.width;
    const zy = (canvas.height * (1 - this._marginFactor)) / packer.height;
    packer.zoom = zx < zy ? zx : zy;

    const sortedCircles: Circle[] = packer.list.sort((a, b) => (a.radius > b.radius ? -1 : 1));
    
    sortedCircles.forEach((circle, index) => {
      const {id, selected, value } = bubbles[index];
      circle.id = id;
      circle.data = {
        value
      }
      const bubble = bubbles.find((bubble) => bubble.id === id);
      bubble.circleRef = circle;
      circle.selected = selected;
      this.drawCircle(circle, ctx, packer);
      this._circlels.push(circle);
    })

    // draw bounding circles
    for (var i = 0; i != packer.bounds.length; i++){
      this.drawCircle(packer.bounds[i], ctx, packer);
    }

    ctx.beginPath();
    ctx.rect(
      (-packer.width / 2 + packer.dx) * packer.zoom + packer.mx,
      (-packer.height / 2 + packer.dy) * packer.zoom + packer.my,
      packer.width * packer.zoom,
      packer.height * packer.zoom
    );
    ctx.closePath();
  }

  private getRadiuses(bubbles, minRadius, maxRadius) {
    const radiuses = [];
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    bubbles.forEach((bubble:NgxBubble) => {
      if (bubble.value > max) {
        max = bubble.value;
      }
      else if (bubble.value < min) {
        min = bubble.value;
      }
    })
    bubbles.forEach((bubble:NgxBubble) => {
      const { value } = bubble;
      const radius = (((value - min) / (max - min)) * (maxRadius - minRadius)) + minRadius;
      radiuses.push(radius);
    });
    return radiuses;
  }

  private isPointInCircle(circle: Circle, point: Point, packer: Packer) {
    const { radius } = circle;
    const cx = (circle.center.x + packer.dx) * packer.zoom + packer.mx;
    const cy = (circle.center.y + packer.dy) * packer.zoom + packer.my;
    return point.inCircle(cx, cy, radius * packer.zoom * this._margin)
  }

  private listenToClickEvents(canvas, packer: Packer) {
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    canvas.addEventListener("click", (event) => {
      let clikedPoint = new Point(event.offsetX, event.offsetY);
      this._circlels.forEach((circle) => {
        if (!this.isPointInCircle(circle, clikedPoint, packer)) return;
        this._bubbleSelectedSubject.next(circle.id);
        circle.selected = !circle.selected;
        this.drawCircle(circle, ctx, packer);
      });
    }, true);
  }
}
