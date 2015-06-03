'use strict';

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