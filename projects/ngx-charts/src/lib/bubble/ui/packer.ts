import { Circle } from "./circle";
import { Point } from "./point";

export class Packer {
    radiuses: number[];
    ratio: number;
    list: Circle[];
    tmpBounds: Circle[];
    bounds: Circle[];
    width: number;
    height: number;
    dx: number;
    dy: number;
    mx: number;
    my: number;
    zoom: number;

    constructor(radiuses, ratio, circles?: Circle[]) {
        this.radiuses = radiuses;
        this.ratio = ratio || 1;
        this.list = circles || this.solve();
    }

    compute(surface) {
        const bounding_r = Math.sqrt(surface) * 100;
        const w = (this.width = Math.sqrt(surface * this.ratio));
        const h = (this.height = this.width / this.ratio);

        const in_rect = (radius, center) => {
            if (center.x - radius < -w / 2) return false;
            if (center.x + radius > w / 2) return false;
            if (center.y - radius < -h / 2) return false;
            if (center.y + radius > h / 2) return false;
            return true;
        };

        // approximate a segment with an "infinite" radius circle
        const bounding_circle = (x0, y0, x1, y1) => {
            const xm = Math.abs((x1 - x0) * w);
            const ym = Math.abs((y1 - y0) * h);
            const m = xm > ym ? xm : ym;
            const theta = Math.asin(m / 4 / bounding_r);
            const r = bounding_r * Math.cos(theta);
            return new Circle(
                bounding_r,
                new Point(
                    (r * (y0 - y1)) / 2 + ((x0 + x1) * w) / 4,
                    (r * (x1 - x0)) / 2 + ((y0 + y1) * h) / 4
                )
            );
        };

        // return the corner placements for two circles
        const corner = (radius, c1: Circle, c2: Circle) => {
            let u = c1.center.vect(c2.center); // c1 to c2 vector
            const A = u.norm();
            if (A == 0) return []; // same centers
            u = u.mult(1 / A); // c1 to c2 unary vector
            // compute c1 and c2 intersection coordinates in (u,v) base
            const B = c1.radius + radius;
            const C = c2.radius + radius;
            if (A > B + C) return []; // too far apart
            const x = (A + (B * B - C * C) / A) / 2;
            const y = Math.sqrt(B * B - x * x);
            const base = c1.center.add(u.mult(x));

            const res = [];
            const p1 = new Point(base.x - u.y * y, base.y + u.x * y);
            const p2 = new Point(base.x + u.y * y, base.y - u.x * y);
            if (in_rect(radius, p1)) res.push(new Circle(radius, p1));
            if (in_rect(radius, p2)) res.push(new Circle(radius, p2));
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
                            let l = 0
                            for (;l != placed.length; l++) {
                                // skip the two circles used for the placement
                                if (l == j || l == k) continue;

                                // compute distance from current circle
                                const d = placed[l].distance(corners[c]);
                                if (d < 0) break; // circles overlap
                                if (d < d_min) d_min = d;
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
            if (i_max == -1) break;

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
            } else {
                res = placement;
                this.bounds = this.tmpBounds;
                surface -= step;
            }
            step /= 2;
        }
        return res;
    }
}