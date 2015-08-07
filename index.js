'use strict';

var visit = require('object-visit');

/**
 * Map `visit` over an array of objects.
 *
 * @param  {Object} `collection` The context in which to invoke `method`
 * @param  {String} `method` Name of the method to call on `collection`
 * @param  {Object} `arr` Array of objects.
 */

module.exports = function mapVisit(collection, method, arr) {
  arr.forEach(function (val) {
    if (typeof val === 'string') {
      collection[method](val);
    } else {
      visit(collection, method, val);
    }
  });
};
