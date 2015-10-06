'use strict';

var utils = require('lazy-cache')(require);
require = utils; // fool browserify
require('object-visit', 'visit');

/**
 * Expose utils
 */

module.exports = utils;
