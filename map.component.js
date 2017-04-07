var Point = (function () {
    /**
     * @param {number} x
     * @param {number} y
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Line = (function () {
    function Line(start, end) {
        this.start = start;
        this.end = end;
    }
    return Line;
}());
var Area = (function () {
    function Area(points, backgroundImage) {
        this.points = points;
        this.backgroundImage = backgroundImage;
        this.findAndSetTopAndLeftPoints();
    }
    Object.defineProperty(Area.prototype, "firstPoint", {
        get: function () {
            return this.points[0];
        },
        enumerable: true,
        configurable: true
    });
    Area.prototype.findAndSetTopAndLeftPoints = function () {
    };
    return Area;
}());
var Map = (function () {
    function Map(canvas) {
        this.canvas = canvas;
        this.renderedLines = [];
        this.context = canvas.getContext('2d');
    }
    Map.prototype.renderMapAreas = function (areas) {
        for (var _i = 0, areas_1 = areas; _i < areas_1.length; _i++) {
            var area = areas_1[_i];
            this.renderMapArea(area);
        }
    };
    Map.prototype.renderMapArea = function (area) {
        var firstPoint = area.firstPoint;
        var lastUsedPoint;
        this.context.beginPath();
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'black';
        for (var _i = 0, _a = area.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point !== firstPoint && this.lineIsNotRendered(point, lastUsedPoint)) {
                this.context.lineTo(point.x, point.y);
            }
            this.context.moveTo(point.x, point.y);
            lastUsedPoint = point;
        }
        this.context.lineTo(firstPoint.x, firstPoint.y);
        this.context.stroke();
        this.context.closePath();
    };
    Map.prototype.addRenderedLine = function (start, end) {
        this.renderedLines.push(new Line(start, end));
    };
    Map.prototype.lineIsNotRendered = function (start, end) {
        var line = new Line(start, end);
        return !this.renderedLines.includes(line);
    };
    return Map;
}());
var canvas = document.getElementById('canvas');
var map = new Map(canvas);
map.renderMapAreas([
    new Area([
        new Point(200, 436),
        new Point(224, 420),
        new Point(261, 441),
        new Point(269, 477),
        new Point(220, 464),
    ], ''),
    new Area([
        new Point(220, 464),
        new Point(269, 477),
        new Point(264, 523),
        new Point(245, 545),
        new Point(213, 521),
    ], ''),
    new Area([
        new Point(269, 477),
        new Point(316, 474),
        new Point(392, 491),
        new Point(325, 547),
        new Point(264, 523),
    ], '')
]);
