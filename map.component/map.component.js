var Map = (function () {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    function Map(canvas) {
        this.canvas = canvas;
        this.subTop = 0;
        this.subLeft = 0;
        this.offset = 50;
        this.renderedAreas = 0;
        this.context = canvas.getContext('2d');
        this.setWidthAndHeight();
        this.bindOnHover();
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
            area.subOffsetPoints(this.subLeft, this.subTop);
            area.render(this.context, this.onAreaRendered.bind(this));
        }
    };
    /**
     * Enables highlighting for areas (in future)
     */
    Map.prototype.onAreaRendered = function () {
        this.renderedAreas++;
    };
    /**
     * Calculates how far all points can be moved
     */
    Map.prototype.calculateOffset = function () {
        var minimalPoint = this.findMinimalPoint();
        this.subTop = minimalPoint.y - this.offset;
        this.subLeft = minimalPoint.x - this.offset;
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
        // this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.width = 600;
        this.canvas.height = 600;
    };
    Map.prototype.bindOnHover = function () {
        var that = this;
        this.canvas.addEventListener('mousemove', function (event) {
            var rect = this.getBoundingClientRect();
            that.onHover(event, rect);
        });
    };
    /**
     * @param {MouseEvent} event
     * @param {ClientRect} rect
     */
    Map.prototype.onHover = function (event, rect) {
        if (this.renderedAreas !== this.areas.length) {
            return;
        }
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var point = new Point(x, y);
        for (var _i = 0, _a = this.areas; _i < _a.length; _i++) {
            var area = _a[_i];
            var pointIsInArea = area.pointIsInArea(point);
            pointIsInArea ? area.highlightBorders(this.context) : area.deleteHighlighting(this.context);
        }
    };
    return Map;
}());
