'use strict';

// Allow tests to run on the server (leave at the top)
if (typeof window === 'undefined') {
  var should = require('chai').should();
  var stringifier = require('../index.js');
  var mocks = require('./mocks.js');
}

describe('Stringifier', function () {

  describe('Basic types', function () {

    it('should properly convert numbers', function () {
      stringifier(mocks.num).should.equal(JSON.stringify(mocks.num));
    });

    it('should properly convert strings', function () {
      stringifier(mocks.string).should.equal(JSON.stringify(mocks.string));
    });

    it('should properly convert functions', function () {
      should.equal(stringifier(mocks.func), JSON.stringify(mocks.func));
    });

    it('should properly convert empty strings', function () {
      stringifier('').should.equal(JSON.stringify(''));
    });

    it('should properly convert null', function () {
      stringifier(null).should.equal(JSON.stringify(null));
    });

    it('should properly convert undefined', function () {
      should.equal(stringifier(undefined), JSON.stringify(undefined));
    });

  });

  describe('Plain collections', function () {

    it('should properly convert arrays', function () {
      stringifier(mocks.arr).should.equal(JSON.stringify(mocks.arr));
    });

    it('should properly convert objects', function () {
      stringifier(mocks.obj).should.equal(JSON.stringify(mocks.obj));
    });

    it('should ignore the object prototype', function () {
      mocks.obj.constructor.prototype.foo = 'foo';
      var res = stringifier(mocks.obj);
      delete mocks.obj.constructor.prototype.foo;
      res.should.equal(JSON.stringify(mocks.obj));
    });

  });

  describe('Nested collections', function () {

    it('should properly convert nested arrays', function () {
      stringifier(mocks.nestedArr).should.equal(JSON.stringify(mocks.nestedArr));
    });

    it('should properly convert nested objects', function () {
      stringifier(mocks.nestedObj).should.equal(JSON.stringify(mocks.nestedObj));
    });

  });

});
