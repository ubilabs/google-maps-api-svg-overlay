/**
 * SVG Overlay constructor
 * @param {Object} options May contain the map and the content of the overlay
 */
function SvgOverlay(options) {
  this.options_ = options || {};

  this.container_ = document.createElement('div');
  this.container_.style.position = 'absolute';

  this.center_ = new google.maps.LatLng(0, 0);

  if (this.options_.layer !== 'overlayMouseTarget') {
    this.options_.layer = 'overlayLayer';
  }

  if (this.options_.map) {
    this.setMap(this.options_.map);
  }

  if (this.options_.content) {
    this.setContent(this.options_.content);
  }
}
SvgOverlay.prototype = new google.maps.OverlayView();

/**
 * Internal method. Triggered when `setMap` was called with an argument.
 */
SvgOverlay.prototype.onAdd = function() {
  this.getPanes()[this.options_.layer].appendChild(this.container_);
};

/**
 * Set the new SVG content to display on a map.
 * @param {String} content The content to display (SVG)
 */
SvgOverlay.prototype.setContent = function(content) {
  this.container_.innerHTML = content;
  this.content_ = content;
  this.svg_ = this.container_.getElementsByTagName('svg')[0];

  this.draw();
};

/**
 * Get the assigned SVG string.
 * @return {String} The content passed in
 */
SvgOverlay.prototype.getContent = function() {
  return this.content_;
};

/**
 * Get the surrounding DOM container.
 * @return {Element} The container element
 */
SvgOverlay.prototype.getContainer = function() {
  return this.container_;
};

/**
 * Get the SVG element.
 * @return {Element} The SVG element
 */
SvgOverlay.prototype.getSvg = function() {
  return this.svg_;
};

/**
 * Internal method. Called when the layer needs an update.
 */
SvgOverlay.prototype.draw = function() {
  var projection = this.getProjection(),
    style, center, width, offset, left, top, factor;

  if (!projection || !this.svg_) {
    return;
  }

  style = this.container_.style;

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

/**
 * Internal method. Triggered when `setMap` was called with `null.
 */
SvgOverlay.prototype.onRemove = function() {
  this.container_.parentNode.removeChild(this.container_);
};
