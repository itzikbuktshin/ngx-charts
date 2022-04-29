import { Circle } from "./circle";

export interface NgxBubble {
    id: number;
    value: number;
    selected?: boolean;
    circleRef?: Circle;
}