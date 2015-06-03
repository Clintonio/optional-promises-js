'use strict';

var q = require('q');

function Optional(value) {
  this.exists = function() {
    return ((value !== undefined) && (value !== null));
  };

  this.get = function() {
    return value;
  };
} 

function OptionalPromise(promise) {
  var onExists = q();
  var onNothing = q();

  var onDone = promise.then(function(val) {
    if((new Optional(val)).exists()) {
      return q(val).then(onExists);
    } else {
      return q().then(onNothing);
    }
  });

  this.exists = function(callback) {
    onExists = callback;
    return this;
  };

  this.nothing = function(callback) {
    onNothing = callback;
    return this;
  };

  this.promise = function() {
    return onDone;
  };
}

if(!q.makePromise.prototype.optional) {
  q.makePromise.prototype.optional = function() {
    var onExists = q();
    var onNothing = q();

    var next = this.then(function(val) {
      if((new Optional(val)).exists()) {
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

module.exports = OptionalPromise;