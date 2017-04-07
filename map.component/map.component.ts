class Point {
  /**
   * @param {number} x
   * @param {number} y
   */
  public constructor(public x: number, public y: number) {
  }
}

class Line {
  /**
   * @param {Point} start
   * @param {Point}  end
   */
  public constructor(public start: Point, public end: Point) {
  }
}

class Area {
  public topPoint: Point;
  public leftPoint: Point;

  private firstPoint: Point;

  public constructor(public points: Point[], public backgroundImage: string) {
    this.setFirstPoint();
    this.findAndSetMinimalPoint();
  }

  public fixPoints(offsetLeft: number, offsetTop: number) {
    for (let point of this.points) {
      point.x = point.x - offsetLeft;
      point.y = point.y - offsetTop;
    }

    this.leftPoint.x = this.leftPoint.x - offsetLeft;
    this.topPoint.y = this.topPoint.y - offsetTop;
    this.firstPoint.y = this.firstPoint.y - offsetTop;
    this.firstPoint.x = this.firstPoint.x - offsetLeft;
  }

  public getFirstPoint(): Point {
    return this.firstPoint;
  }

  private findAndSetMinimalPoint(): void {
    this.topPoint = new Point(this.firstPoint.x, this.firstPoint.y);
    this.leftPoint = new Point(this.firstPoint.x, this.firstPoint.y);

    for (const point of this.points) {
      if (point.x < this.leftPoint.x) {
        this.leftPoint = new Point(point.x, point.y);
      }

      if (point.y < this.topPoint.y) {
        this.topPoint = new Point(point.x, point.y);
      }
    }
  }

  private setFirstPoint(): void {
    let firstPoint = this.points[0];
    this.firstPoint = new Point(firstPoint.x, firstPoint.y);
  }
}

class Map {

  private context: CanvasRenderingContext2D;
  private renderedLines: Array<Line> = [];
  private offsetTop: number = 0;
  private offsetLeft: number = 0;

  public constructor(private canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d');
    this.setWidthAndHeight();
  }

  public renderMapAreas(areas: Area[]): void {
    const minimalPoint = this.findMinimalPoint(areas);

    this.offsetTop = minimalPoint.y - 50;
    this.offsetLeft = minimalPoint.x - 50;

    for (const area of areas) {
      this.renderMapArea(area);
    }
  }

  public renderMapArea(area: Area): void {
    let imageObj = new Image();

    imageObj.onload = () => {
      area.fixPoints(this.offsetLeft, this.offsetTop);
      let firstPoint: Point = area.getFirstPoint();
      let lastUsedPoint: Point;

      this.context.save();
      this.context.beginPath();
      this.context.moveTo(firstPoint.x, firstPoint.y);

      for (const point of area.points) {
        this.context.lineTo(point.x, point.y);

        lastUsedPoint = point;
      }

      this.context.closePath();
      this.context.stroke();
      this.context.clip();
      this.context.drawImage(
        imageObj,
        area.leftPoint.x,
        area.topPoint.y,
        100,
        100
      );
    };

    imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
  }

  private findMinimalPoint(areas: Area[]): Point {
    let theMostTopPoint: Point = areas[0].topPoint;
    let theMostLeftPoint: Point = areas[0].leftPoint;

    for (const area of areas) {
      if (area.topPoint.y < theMostTopPoint.y) {
        theMostTopPoint = area.topPoint;
      }

      if (area.leftPoint.x < theMostLeftPoint.x) {
        theMostLeftPoint = area.leftPoint;
      }
    }

    return new Point(theMostTopPoint.x, theMostLeftPoint.y);
  }

  private addRenderedLine(start: Point, end: Point): void {
    this.renderedLines.push(new Line(start, end));
  }

  private lineIsNotRendered(start: Point, end: Point): boolean {
    const line: Line = new Line(start, end);
    return !this.renderedLines.includes(line);
  }

  private setWidthAndHeight() {
    this.canvas.width = this.canvas.parentElement.offsetWidth;
    this.canvas.height = 600;
  }

}