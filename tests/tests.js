'use strict';

var fs = require('fs');
var q = require('q');
var optionalPromise = require('../optional-promise');

// temporary testing code
var promise = optionalPromise('hi');

promise
  .optional()
  .exists(function() {
    console.log('exists called');
    return 'Hello';
  })
  .nothing(function() {
    console.log('nothing called');
    return 'test';
  })
  .then(function(val) {
    console.log('Value: ' + val);
  });

function doSomething(hasResult) {
  return q()
    .then(function() {
      if(hasResult) {
        return "test";
      }
    });
}

var promiseActive = doSomething(true);
promiseActive
  .optional()
  .exists(function(data) {
    console.log(data);
  })
  .nothing(function(val) {
    console.log("Nothing exists");
  })
  .then(function() {
    console.log("After");
  });

doSomething(false)
  .optional()
  .exists(function(data) {
    console.log(data);
  })
  .nothing(function(val) {
    console.log("Nothing exists");
  })
  .then(function() {
    console.log("After");
  });

doSomething(false)
  .optional()
  .exists(function(data) {
    console.log(data);
  })
  .nothing(function(val) {
    throw new Error("TEST");
  })
  .then(function() {
    console.log("After");
  })
  .fail(function(err) {
    console.log(err);
  });

doSomething(true)
  .optional()
  .then(function(data) {
    console.log("Data exists: " + (data ? "true" : "false"));
  });