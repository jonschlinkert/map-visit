'use strict';

require('mocha');
var clone = require('clone-deep');
var assert = require('assert');
var extend = require('extend-shallow');
var visit = require('object-visit');
var mapVisit = require('./');
var ctx;

var fixture = {
  data: {},
  options: {},
  set: function(key, value) {
    if (typeof key !== 'string') {
      if (value) extend(this.options, value);
      mapVisit(this, 'set', key, value);
    } else {
      this.data[key] = value;
    }
  }
};

describe('visit', function() {
  beforeEach(function() {
    ctx = clone(fixture);
  });

  it('should throw an error when value is not an array', function() {
    assert.throws(function() {
      mapVisit({}, 'foo', 'bar');
    });
  });

  it('should call visit on every value in the given object', function() {
    ctx.set('a', 'a');
    ctx.set([{b: 'b'}, {c: 'c'}]);
    ctx.set({d: {e: 'f'}});
    assert.deepEqual(ctx.data, {
      a: 'a',
      b: 'b',
      c: 'c',
      d: { e: 'f' }
    });
  });

  it('should call visit on every element of any array', function() {
    ctx.set('a', 'a');
    ctx.set(['x', 'y']);
    ctx.set([{b: 'b'}, {c: 'c'}]);
    ctx.set({d: {e: 'f'}});

    assert.deepEqual(ctx.data, {
      a: 'a',
      b: 'b',
      c: 'c',
      d: { e: 'f' },
      x: undefined,
      y: undefined
    });
  });

  it('should set the second arg on every element', function() {
    ctx.set(['foo', 'bar'], function() {});

    assert.equal(typeof ctx.data.foo, 'function');
    assert.equal(typeof ctx.data.bar, 'function');
  });

  it('should set the second arg on every object', function() {
    ctx.set({a: 'aaa', b: 'bbb'}, {cwd: process.cwd()});

    assert.equal(ctx.options.cwd, process.cwd());
    assert.equal(ctx.options.cwd, process.cwd());
  });
});
