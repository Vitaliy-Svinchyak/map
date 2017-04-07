class Point {
  /**
   * @param {number} x
   * @param {number} y
   */
  public constructor(public x: number, public y: number) {
  }
}

class Line {
  public constructor(public start: Point, public end: Point) {
  }
}

class Area {
  public topPoint: Point;
  public leftPoint: Point;

  public constructor(public points: Point[], public backgroundImage: string) {
    this.findAndSetTopAndLeftPoints();
  }

  public get firstPoint(): Point {
    return this.points[0];
  }

  private findAndSetTopAndLeftPoints(): void {
  }
}

class Map {

  private context: CanvasRenderingContext2D;
  private renderedLines: Array<Line> = [];

  public constructor(private canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d');
  }

  public renderMapAreas(areas: Area[]): void {
    for (const area of areas) {
      this.renderMapArea(area);
    }
  }

  public renderMapArea(area: Area): void {
    let firstPoint: Point = area.firstPoint;
    let lastUsedPoint: Point;

    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.strokeStyle = 'black';

    for (const point of area.points) {
      if (point !== firstPoint && this.lineIsNotRendered(point, lastUsedPoint)) {
        this.context.lineTo(point.x, point.y);
      }

      this.context.moveTo(point.x, point.y);
      lastUsedPoint = point;
    }

    this.context.lineTo(firstPoint.x, firstPoint.y);
    this.context.stroke();
    this.context.closePath();
  }

  private addRenderedLine(start: Point, end: Point): void {
    this.renderedLines.push(new Line(start, end));
  }

  private lineIsNotRendered(start: Point, end: Point): boolean {
    const line: Line = new Line(start, end);
    return !this.renderedLines.includes(line);
  }

}

const canvas = document.getElementById('canvas');
const map: Map = new Map(<HTMLCanvasElement>canvas);
map.renderMapAreas(
  [
    new Area(
      [
        new Point(200, 436),
        new Point(224, 420),
        new Point(261, 441),
        new Point(269, 477),
        new Point(220, 464),
      ],
      ''
    ),
    new Area(
      [
        new Point(220, 464),
        new Point(269, 477),
        new Point(264, 523),
        new Point(245, 545),
        new Point(213, 521),
      ],
      ''
    ),
    new Area(
      [
        new Point(269, 477),
        new Point(316, 474),
        new Point(392, 491),
        new Point(325, 547),
        new Point(264, 523),
      ],
      ''
    )
  ]
);