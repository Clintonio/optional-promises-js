'use strict';

var q = require('q');

if(!q.makePromise.prototype.optional) {
  q.makePromise.prototype.optional = function() {
    var onExists = q();
    var onNothing = q();

    var next = this.then(function(val) {
      if(((val !== undefined) && (val !== null))) {
        return q(val).then(onExists);
      } else {
        return q().then(onNothing);
      }
    });

    next.exists = function(callback) {
      onExists = callback;
      return this;
    };

    next.nothing = function(callback) {
      onNothing = callback;
      return this;
    };

    return next;
  };
}

function newOptionalPromise(value) {
  return q(value)
    .optional();
}

module.exports = newOptionalPromise;