'use strict';

var fs = require('fs');
var q = require('q');
var optionalPromise = require('../optional-promise');
var chai = require('chai');

var expect = chai.expect;

describe('Optional promises', function() {
  describe('#optional', function() {
    it('should be available', function() {
      var promise = q();
      expect(promise.optional).to.exist;
    });

    it('should return a new promise when .optional is called', function() {
      var promise = q();
      var optionalPromise = promise.optional();

      expect(optionalPromise).to.include.keys(['exists', 'nothing']);
      expect(optionalPromise).to.not.equal(promise);
    });

    it('should resolve normally without exists/nothing', function(done) {
      var promise = q('test').optional();

      promise.then(function(val) {
        expect(val).to.be.equal('test');
        done();
      });
    });
  });

  describe('#exists', function() {
    it('should only be called if a value is passed', function(done) {
      var promise = q('test').optional();

      promise.exists(function(val) {
        expect(val).to.be.equal('test');
        done();
      });
    });

    it('should not be called when no value is passed', function(done) {
      var promise = q().optional();

      promise
        .exists(function(val) {
          done(new Error('exists called'));
        })
        .nothing(done);
    });

    it('should be able to return a value to the next promise', function(done) {
      var promise = q('test').optional();

      promise
        .exists(function(val) {
          return 'test2';
        })
        .then(function(val) {
          expect(val).to.be.equal('test2');
          done();
        });
    });
  });

  describe('#nothing', function() {
    it('should only be called if no value is passed', function(done) {
      var promise = q().optional();

      promise.nothing(function() {
        done();
      });
    });

    it('should not be called when a value is passed', function(done) {
      var promise = q('test').optional();

      promise
        .exists(function() {
          done();
        })
        .nothing(function() {
          done(new Error('nothing called'));
        });
    });

    it('should be able to return a value to the next promise', function(done) {
      var promise = q().optional();

      promise
        .nothing(function() {
          return 'test2';
        })
        .then(function(val) {
          expect(val).to.be.equal('test2');
          done();
        });
    });
  });
});