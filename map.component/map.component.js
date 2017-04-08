var Map = (function () {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    function Map(canvas) {
        this.canvas = canvas;
        this.offsetTop = 0;
        this.offsetLeft = 0;
        this.renderedAreas = 0;
        this.context = canvas.getContext('2d');
        this.setWidthAndHeight();
    }
    /**
     * Renders all available areas with offset optimizzation
     *
     * @param {Area[]} areas
     */
    Map.prototype.renderMapAreas = function (areas) {
        this.areas = areas;
        this.calculateOffset();
        for (var _i = 0, areas_1 = areas; _i < areas_1.length; _i++) {
            var area = areas_1[_i];
            area.subOffsetPoints(this.offsetLeft, this.offsetTop);
            area.render(this.context, this.onAreaRendered.bind(this));
        }
    };
    /**
     * Enables higlighting for areas (in future)
     */
    Map.prototype.onAreaRendered = function () {
        this.renderedAreas++;
        if (this.renderedAreas === this.areas.length) {
            this.areas[1].higlightBorders(this.context);
        }
    };
    /**
     * Calculates how far all points can be moved
     */
    Map.prototype.calculateOffset = function () {
        var minimalPoint = this.findMinimalPoint();
        this.offsetTop = minimalPoint.y - 50;
        this.offsetLeft = minimalPoint.x - 50;
    };
    /**
     * Finds the most left x and the most top y coordinates and returns a Point with that coordinates
     *
     * @return {Point}
     */
    Map.prototype.findMinimalPoint = function () {
        var areas = this.areas;
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
    /**
     * Dynamically determines how large a canvas can be and sets it size
     */
    Map.prototype.setWidthAndHeight = function () {
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = 600;
    };
    return Map;
}());
