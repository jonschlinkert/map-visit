'use strict';

require('mocha');
require('should');
var assert = require('assert');
var visit = require('object-visit');
var mapVisit = require('./');

var ctx = {
  data: {},
  set: function(key, value) {
    if (Array.isArray(key)) {
      mapVisit(ctx, 'set', key);
    } else if (typeof key === 'object') {
      visit(ctx, 'set', key);
    } else {
      ctx.data[key] = value;
    }
  }
};

describe('visit', function() {
  it('should throw an error when value is not an array.', function(done) {
    try {
      mapVisit({}, 'foo', 'bar');
      done(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert(err.message);
      assert(err.message === 'expected an array');
      done();
    }
  });

  it('should call visit on every value in the given object:', function() {
    ctx.set('a', 'a');
    ctx.set([{b: 'b'}, {c: 'c'}]);
    ctx.set({d: {e: 'f'}});
    ctx.data.should.eql({
      a: 'a',
      b: 'b',
      c: 'c',
      d: { e: 'f' }
    });
  });

  it('should call visit on every value in the given object:', function() {
    ctx.set('a', 'a');
    ctx.set(['x', 'y']);
    ctx.set([{b: 'b'}, {c: 'c'}]);
    ctx.set({d: {e: 'f'}});

    ctx.data.should.eql({
      a: 'a',
      b: 'b',
      c: 'c',
      d: { e: 'f' },
      x: undefined,
      y: undefined
    });
  });
});
