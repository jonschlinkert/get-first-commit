/*!
 * first-commit-date <https://github.com/jonschlinkert/first-commit-date>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var lazy = require('lazy-cache')(require);
lazy('gitty', 'git');

function firstCommit(dir, cb) {
  if (typeof dir === 'function') {
    return firstCommit(process.cwd(), dir);
  }
  if (typeof cb !== 'function') {
    throw new TypeError('expected callback to be a function');
  }

  lazy.git(dir).log(function(err, history) {
    if (err) return cb(err);

    history.sort(function(a, b) {
      return b.date.localeCompare(a.date);
    });

    cb(null, history[history.length - 1]);
  });
}

/**
 * Expose `firstCommit`
 */

module.exports = firstCommit;
