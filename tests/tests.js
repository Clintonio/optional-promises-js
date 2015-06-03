'use strict';

var fs = require('fs');
var q = require('q');
var OptionalPromise = require('../optional-promise');

var promise = q();

// temporary testing code
(new OptionalPromise(promise))
  .exists(function() {
    console.log('exists called');
    return 'Hello';
  })
  .nothing(function() {
    console.log('nothing called');
    return 'test';
  })
  .promise()
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
  });

doSomething(false)
  .optional()
  .exists(function(data) {
    console.log(data);
  })
  .nothing(function(val) {
    console.log("Nothing exists");
  });