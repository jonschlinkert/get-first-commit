'use strict';

require('mocha');
var assert = require('assert');
var firstCommit = require('./');

describe('get-first-commit', function() {
  it('should return a function', function() {
    assert.equal(typeof firstCommit, 'function');
  });

  it('should return an object: async', function(cb) {
    firstCommit(function(err, commit) {
      if (err) return cb(err);
      assert(commit);
      assert.equal(typeof commit, 'object');
      cb();
    });
  });

  it('should return an object: sync', function() {
    var commit = firstCommit.sync();
    assert(commit);
    assert.equal(typeof commit, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      firstCommit();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });
});
