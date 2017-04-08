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
      'images/dirt.png'
    ),
    new Area(
      [
        new Point(220, 464),
        new Point(269, 477),
        new Point(264, 523),
        new Point(245, 545),
        new Point(213, 521),
      ],
      'images/house.png'
    ),
    new Area(
      [
        new Point(269, 477),
        new Point(316, 474),
        new Point(392, 491),
        new Point(325, 547),
        new Point(264, 523),
      ],
      'images/rock.jpg'
    )
  ]
);
