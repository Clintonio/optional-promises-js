# Optional Promises

This module uses [q](https://www.npmjs.com/package/q) promises internally and hasn't been tested with other types of promises.

## Prerequisites

A full understanding of promises, please read the tutorial at [https://www.npmjs.com/package/q](https://www.npmjs.com/package/q)

## Installation

npm install optional-promise

## Usage

### Creating a promise:

    var optionalPromises = require('optional-promise');
    var promise = new optionalPromise(<optional value>);

#### Alternatively using q:

    require('optional-promise');
    var promise = q();

### Using the promise;

    var newPromise = promise
      .optional()
      .exists(function(value) {
        ...
      })
      .nothing(function() {
        ...
      });

.optional will return a new promise which has the exists and nothing functions which themselves return the containing object,
meaning this can be a part of a promise chain.

      newPromise
        .then(function() {
          console.log('This works!');
        })
        .fail(function() {
          console.log('So does this!');
        });

## Examples

Database access;

     var usersCollection = db.collection('users');
     q.ninvoke(usersCollection, 'findOne', {userId: ...})
       .optional()
       .exists(function(user) {
         return handleLogin();
       })
       .nothing(function() {
         return handleInvalidLogin();
       })
       .then(function(responseData) {
         res.send(responseData);
       });

Contrived full example;

     var q = require('q');
     require('optional-promises');

     q('test')
       .then(function(val) {
         return ('This is a ' + val);
       })
       .exists(function(val) {
         console.log(val);
       })
       .nothing(function() {
         // Doesn't get called
       })
       .then(function() {
         console.log('Test done');
       })
       .fail(function() {
         // Also doesn't get called
       });
