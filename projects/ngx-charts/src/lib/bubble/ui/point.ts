export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
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
    inCircle(cx: number, cy: number, radius: number) {
        const dx = cx - this.x;
        const dy = cy - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < radius;
    }
}