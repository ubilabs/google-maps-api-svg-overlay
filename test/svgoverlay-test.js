/* global chai, beforeEach, describe, it, SvgOverlay */

var expect = chai.expect;

describe('SVGOverlay', function() {
  var svgOverlay,
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644)
    }),
    content = '<svg></svg>';

  beforeEach(function() {
    svgOverlay = new SvgOverlay({
      map: map,
      content: content
    });
  });

  describe('constructor', function() {
    it('creates a new SvgOverlay', function() {
      expect(svgOverlay).to.be.an.instanceof(SvgOverlay);
    });

    it('inherits from google.maps.OverlayView', function() {
      expect(svgOverlay).to.be.an.instanceof(google.maps.OverlayView);
    });

    it('creates a div container', function() {
      expect(svgOverlay.getContainer()).to.be.ok;
    });

    it('sets the map if passed in', function() {
      expect(svgOverlay.getMap()).to.be.an.instanceof(google.maps.Map);
    });

    it('sets the content if passed in', function() {
      expect(svgOverlay.getContent()).to.equal(content);
    });

    it('adds the overlay to the overlayLayer per default', function() {
      expect(true).to.be.false;
    });

    it('adds the overlay to the overlayMouseTarget if passed in', function() {
      expect(true).to.be.false;
    });
  });

  describe('#onAdd', function() {
    it('exists', function() {
      expect(svgOverlay.onAdd).to.exist;
    });
  });

  describe('#onRemove', function() {
    it('exists', function() {
      expect(svgOverlay.onRemove).to.exist;
    });
  });

  describe('#setContent', function() {
    it('adds the content to the container', function() {
      expect(svgOverlay.getContainer().innerHTML).to.equal(content);
    });

    it('appends an SVG element', function() {
      expect(svgOverlay.getSvg()).to.be.ok;
    });

    it('draws the overlay', function() {
      expect(true).to.be.false;
    });

    it('throws an error when the content is no svg', function() {
      expect(svgOverlay.setContent('')).to.throw(Error);
    });
  });

  describe('#getContent', function() {
    it('returns the content of the container', function() {
      expect(svgOverlay.getContent()).to.equal(content);
    });
  });

  describe('#getContainer', function() {
    it('returns the container', function() {
      expect(svgOverlay.getContainer()).to.be.an('object');
    });
  });

  describe('#getSvg', function() {
    it('returns the svg element', function() {
      expect(svgOverlay.getSvg()).to.be.an('object');
    });
  });

  describe('#draw', function() {
    it('exists', function() {
      expect(svgOverlay.draw).to.exist;
    });

    it('sets the width of the svg', function() {
      expect(true).to.be.false;
    });

    it('sets the height of the svg', function() {
      expect(true).to.be.false;
    });

    it('sets the top position of the container', function() {
      expect(true).to.be.false;
    });

    it('sets the left position of the container', function() {
      expect(true).to.be.false;
    });

    it('sets a left margin to the container', function() {
      expect(true).to.be.false;
    });
  });

  describe('#setMap', function() {
    it('sets the passed map', function() {
      svgOverlay.setMap(null);
      svgOverlay.setMap(map);

      expect(svgOverlay.getMap()).to.be.an.instanceof(google.maps.Map);
    });

    it('removes the map when null is passed in', function() {
      svgOverlay.setMap(null);

      expect(svgOverlay.getMap()).to.be.null;
    });

    it('removes the container when null is passed in', function() {
      expect(true).to.be.false;
    });
  });
});
