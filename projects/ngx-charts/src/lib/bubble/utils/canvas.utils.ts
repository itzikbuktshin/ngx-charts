import { Circle } from "../ui/circle";

export function getFont(fontSize: string = '12px', fontName = 'Helvetica') {
    return `${fontSize} ${fontName}`;
}

export function wrapTextInCircle(ctx, text: string, circle: Circle, textHeight: number, fontName: string, fontSize: number, textColor: string, paddingX: number = 20) {
    if (!text) return;
    let index = 0;
    let textRows: any[] = []
    const words = text.split(" ");
    const font = `500 ${fontSize}px ${fontName}`
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
    }

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
        }
    }

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
        }
        textRows.push(textLineData);
    };

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

export function drawImage(ctx, src: string, imageWidth: number, imageHeight: number, dx: number, dy: number, text?: string, textColor: string = '') {
    let image: HTMLImageElement = null;
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
    }
}

export function fillText(ctx, text: any, textColor: string, dx: number, dy: number, maxWidth?: number, fontSize: string = '12px', fontName: string = 'Helvetica') {
    const txtSize = ctx.measureText(text);
    ctx.fillStyle = textColor;
    ctx.font = this.getFont(fontSize, fontName);
    ctx.fillText(text, dx, dy, maxWidth || txtSize.width);
    return txtSize.width;
}