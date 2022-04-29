import { Point } from "./point";

export class Circle {
    id: number;
    radius: number;
    center: Point;
    selected: boolean = false;
    data?: { [k: string]: any }

    get geo(){
        return {
            cx:this.center.x,
            cy:this.center.y,
            r: this.radius
        }
    }
    constructor(radius:number, center:Point, selected?: boolean) {
        this.radius = radius;
        this.center = center;
        this.selected = selected;
    }

    surface() {
        return Math.PI * this.radius * this.radius;
    }
    distance(circle: Circle) {
        return this.center.dist(circle.center) - this.radius - circle.radius;
    }
}