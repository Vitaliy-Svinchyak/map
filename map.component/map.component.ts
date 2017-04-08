class Map {

  private context: CanvasRenderingContext2D;
  private offsetTop: number = 0;
  private offsetLeft: number = 0;

  /**
   * @param {HTMLCanvasElement} canvas
   */
  public constructor(private canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d');
    this.setWidthAndHeight();
  }

  /**
   * @param {Area[]} areas
   */
  public renderMapAreas(areas: Area[]): void {
    this.calculateOffset(areas);

    for (const area of areas) {
      area.subOffsetPoints(this.offsetLeft, this.offsetTop);
      area.render(this.context);
    }
  }

  /**
   * @param {Area[]} areas
   */
  private calculateOffset(areas: Area[]): void {
    const minimalPoint = this.findMinimalPoint(areas);

    this.offsetTop = minimalPoint.y - 50;
    this.offsetLeft = minimalPoint.x - 50;
  }

  /**
   * @param {Area[]} areas
   *
   * @return {Point}
   */
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

  private setWidthAndHeight(): void {
    this.canvas.width = this.canvas.parentElement.offsetWidth;
    this.canvas.height = 600;
  }

}