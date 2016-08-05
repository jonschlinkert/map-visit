/**
 * Example using Lo-Dash's extend (without visit)
 */

var _ = require('lodash');

var obj = {
  data: {},
  set: function(key, value) {
    if (Array.isArray(key)) {
      _.extend.apply(_, [obj.data].concat(key));
    } else if (typeof key === 'object') {
      _.extend(obj.data, key);
    } else {
      obj.data[key] = value;
    }
  }
};

obj.set('a', 'a');
obj.set([{b: 'b'}, {c: 'c'}]);
obj.set({d: {e: 'f'}});

console.log(obj.data);
//=> {a: 'a', b: 'b', c: 'c', d: { e: 'f' }}

/**
 * Example using `mapVisit`
 */

var mapVisit = require('./');
var visit = require('object-visit');

obj = {
  data: {},
  set: function(key, value) {
    if (Array.isArray(key)) {
      mapVisit(obj, 'set', key);
    } else if (typeof key === 'object') {
      visit(obj, 'set', key);
    } else {
      // some event-emitter
      console.log('emit', key, value);
      obj.data[key] = value;
    }
  }
};

obj.set('a', 'a');
obj.set([{b: 'b'}, {c: 'c'}]);
obj.set({d: {e: 'f'}});
obj.set({g: 'h', i: 'j', k: 'l'});

console.log(obj.data);
//=> { a: 'a', b: 'b', c: 'c', d: { e: 'f' }, g: 'h', i: 'j', k: 'l' }
