class Map {

  private context: CanvasRenderingContext2D;
  private offsetTop: number = 0;
  private offsetLeft: number = 0;
  private renderedAreas: number = 0;
  private areas: Area[];

  /**
   * @param {HTMLCanvasElement} canvas
   */
  public constructor(private canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d');
    this.setWidthAndHeight();
  }

  /**
   * Renders all available areas with offset optimizzation
   *
   * @param {Area[]} areas
   */
  public renderMapAreas(areas: Area[]): void {
    this.areas = areas;
    this.calculateOffset();

    for (const area of areas) {
      area.subOffsetPoints(this.offsetLeft, this.offsetTop);
      area.render(this.context, this.onAreaRendered.bind(this));
    }
  }

  /**
   * Enables higlighting for areas (in future)
   */
  public onAreaRendered(): void {
    this.renderedAreas++;

    if (this.renderedAreas === this.areas.length) {
      this.areas[1].higlightBorders(this.context);
    }
  }

  /**
   * Calculates how far all points can be moved
   */
  private calculateOffset(): void {
    const minimalPoint: Point = this.findMinimalPoint();

    this.offsetTop = minimalPoint.y - 50;
    this.offsetLeft = minimalPoint.x - 50;
  }

  /**
   * Finds the most left x and the most top y coordinates and returns a Point with that coordinates
   *
   * @return {Point}
   */
  private findMinimalPoint(): Point {
    const areas: Area[] = this.areas;
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

  /**
   * Dynamically determines how large a canvas can be and sets it size
   */
  private setWidthAndHeight(): void {
    this.canvas.width = this.canvas.parentElement.offsetWidth;
    this.canvas.height = 600;
  }
}
