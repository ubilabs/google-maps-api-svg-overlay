/* global chai, beforeEach, describe, it, SvgOverlay */

var expect = chai.expect;

describe('SVGOverlay', function() {
  var svgOverlay;

  beforeEach(function() {
    svgOverlay = new SvgOverlay();
  });

  describe('constructor', function() {
    it('creates a new SvgOverlay', function() {
      expect(svgOverlay).to.be.an.instanceof(SvgOverlay);
    });

    it('inherits from google.maps.OverlayView', function() {

    });
  });
});
