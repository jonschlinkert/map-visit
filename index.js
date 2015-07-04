'use strict';

var visit = require('object-visit');

/**
 * Map `visit` over an array of objects.
 *
 * @param  {Object} `thisArg` The context in which to invoke `method`
 * @param  {String} `method` Name of the method to call on `thisArg`
 * @param  {Object} `arr` Array of objects.
 */

module.exports = function mapVisit(thisArg, method, arr) {
  arr.forEach(function (obj) {
    visit(thisArg, method, obj);
  });
};
