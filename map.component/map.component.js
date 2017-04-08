var Map = (function () {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    function Map(canvas) {
        this.canvas = canvas;
        this.offsetTop = 0;
        this.offsetLeft = 0;
        this.context = canvas.getContext('2d');
        this.setWidthAndHeight();
    }
    /**
     * @param {Area[]} areas
     */
    Map.prototype.renderMapAreas = function (areas) {
        this.calculateOffset(areas);
        for (var _i = 0, areas_1 = areas; _i < areas_1.length; _i++) {
            var area = areas_1[_i];
            area.subOffsetPoints(this.offsetLeft, this.offsetTop);
            area.render(this.context);
        }
    };
    /**
     * @param {Area[]} areas
     */
    Map.prototype.calculateOffset = function (areas) {
        var minimalPoint = this.findMinimalPoint(areas);
        this.offsetTop = minimalPoint.y - 50;
        this.offsetLeft = minimalPoint.x - 50;
    };
    /**
     * @param {Area[]} areas
     *
     * @return {Point}
     */
    Map.prototype.findMinimalPoint = function (areas) {
        var theMostTopPoint = areas[0].topPoint;
        var theMostLeftPoint = areas[0].leftPoint;
        for (var _i = 0, areas_2 = areas; _i < areas_2.length; _i++) {
            var area = areas_2[_i];
            if (area.topPoint.y < theMostTopPoint.y) {
                theMostTopPoint = area.topPoint;
            }
            if (area.leftPoint.x < theMostLeftPoint.x) {
                theMostLeftPoint = area.leftPoint;
            }
        }
        return new Point(theMostTopPoint.x, theMostLeftPoint.y);
    };
    Map.prototype.setWidthAndHeight = function () {
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = 600;
    };
    return Map;
}());
