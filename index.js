/*!
 * first-commit-date <https://github.com/jonschlinkert/first-commit-date>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var lazy = require('lazy-cache')(require);
lazy('gitty', 'git');

/**
 * Asynchronously get the first commit from a git repository.
 *
 * ```js
 * firstCommit('foo/.git', function(err, commit) {
 *   if (err) return console.log(err);
 *   // do stuff with commit
 * });
 * ```
 * @param {String} `cwd` current working directory
 * @param {Function} `callback`
 * @return {Object}
 * @api public
 */

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
 * Synchronously get the first commit from a git repository.
 *
 * ```js
 * var commit = firstCommit.sync('foo/.git');
 * ```
 * @param {String} `cwd` current working directory
 * @return {Object}
 * @api public
 */

firstCommit.sync = function(cwd) {
  var Repository = lazy.git.Repository;
  var repo = new Repository(cwd || process.cwd());
  var history = repo.logSync();

  history.sort(function(a, b) {
    return b.date.localeCompare(a.date);
  });

  return history[history.length - 1];
};

/**
 * Expose `firstCommit`
 */

module.exports = firstCommit;
