/*
 * SVGOverlay - SVG Overlay for the Google Maps JavaScript API v3
 * https://github.com/ubilabs/google-maps-api-svg-overlay
 *
 * Version: 0.1
 * Author: Martin Kleppe <kleppe@ubilabs.net>
 */

function SVGOverlay(options) {

  options = options || {};

  this.div_ = document.createElement('div');
  this.div_.style.position = 'absolute';

  this.center_ = new google.maps.LatLng(0, 0);

  if (options.map) {
    this.setMap(options.map);
  }

  if (options.content) {
    this.setContent(options.content);
  }
}

SVGOverlay.prototype = new google.maps.OverlayView();

// Internal method. Triggered when `setMap` was called with an argument.
SVGOverlay.prototype.onAdd = function() {
  this.getPanes().overlayLayer.appendChild(this.div_);
};

// Set the new SVG content to display on a map.
SVGOverlay.prototype.setContent = function(content) {
  this.div_.innerHTML = content;

  this.svg_ = this.div_.getElementsByTagName('svg')[0];

  this.content_ = content;

  this.draw();
};

// Return the assigned SVG string.
SVGOverlay.prototype.getContent = function() {
  return this.content_;
};

// Return the surrounding DOM container.
SVGOverlay.prototype.getContainer = function() {
  return this.div_;
};

// Return the SVG element.
SVGOverlay.prototype.getSVG = function() {
  return this.svg_;
};

// Internal method. Called when the layer needs an update.
SVGOverlay.prototype.draw = function() {
  var projection = this.getProjection(),
    style, center, width, offset, left, top, factor;

  if (!projection || !this.svg_) {
    return;
  }

  style = this.div_.style;

    // compute layer offset
  center = projection.fromLatLngToDivPixel(this.center_);
  width = Math.round(projection.getWorldWidth());
  offset = width / 2;

  left = Math.round(center.x) - offset;
  top = Math.round(center.y) - offset;

  // compute offset for small zoom levels
  factor = Math.max(1024 / width, 1) - 1;

  // scale svg to world bounds
  this.svg_.setAttribute('width', width);
  this.svg_.setAttribute('height', width);

  // apply offset
  style.left = left + 'px';
  style.top = top + 'px';
  style.marginLeft = (-factor * offset) + 'px';
};

// Internal method. Triggered when `setMap` was called with `null.
SVGOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
};
