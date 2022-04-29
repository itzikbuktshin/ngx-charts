import { NgxBubble } from "../ui/bubble";

export interface NgxBubbleChartOptions {
    width: number;
    height: number;
}

export interface NgxBubbleChart {
    bubbles: NgxBubble[];
    selectedBubbles?: number[];
    options: NgxBubbleChartOptions;
}