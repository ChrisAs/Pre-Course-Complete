'use strict';

// Allow tests to run on the server (leave at the top)
if (typeof window === 'undefined') {
  var should = require('chai').should();
  var _ = require('../index.js');
  var mocks = require('./mocks.js');
}

describe('Arrays', function () {

  describe('first', function () {

    it('should return an array with the first n elements of the array', function () {
      _.first(mocks.arr, 2).should.eql(mocks.arr.slice(0,2));
      _.first(mocks.arr, 3).should.eql(mocks.arr.slice(0,3));
    });

    it('should return an array with the first element if n is not a number, is zero, or negative', function () {
      _.first(mocks.arr).should.eql([mocks.arr[0]]);
      _.first(mocks.arr, 0).should.eql([mocks.arr[0]]);
      _.first(mocks.arr, -1).should.eql([mocks.arr[0]]);
    });

    it('should return the entire array if n is > length', function () {
      _.first(mocks.arr, mocks.arr.length + 1).should.eql(mocks.arr);
    });

    it('should work on an arguments object', function () {
      _.first(mocks.argumentsObj, 2).should.eql(mocks.arr.slice(0,2));
    });

    it('should return an empty array if array is not an array', function () {
      _.first().should.eql([]);
      _.first(null).should.eql([]);
      _.first(1).should.eql([]);
    });

  });

  describe('last', function () {

    it('should not modify the original array', function () {
      var original = Array.prototype.slice.call(mocks.arr);
      _.last(mocks.arr);
      mocks.arr.should.eql(original);
    });

    it('should return an array with the last n elements of the array', function () {
      _.last(mocks.arr, 2).should.eql(mocks.arr.slice(-2));
      _.last(mocks.arr, 3).should.eql(mocks.arr.slice(-3));
    });

    it('should return an array with the last element if n is not a number, is zero, or negative', function () {
      _.last(mocks.arr).should.eql([mocks.arr[mocks.arr.length-1]]);
      _.last(mocks.arr, 0).should.eql([mocks.arr[mocks.arr.length-1]]);
      _.last(mocks.arr, -1).should.eql([mocks.arr[mocks.arr.length-1]]);
    });

    it('should return the entire array if n is > length', function () {
      _.last(mocks.arr, mocks.arr.length + 1).should.eql(mocks.arr);
    });

    it('should work on an arguments object', function () {
      _.last(mocks.argumentsObj, 2).should.eql(mocks.arr.slice(-2));
    });

    it('should return an empty array if array is not an array', function () {
      _.last().should.eql([]);
      _.last(null).should.eql([]);
      _.last(1).should.eql([]);
    });

  });

  describe('uniq', function () {

    it('should return an array without duplicates', function () {
      _.uniq([1,2,1,3,4,3]).should.eql([1,2,3,4]);
    });

  });

});

describe('Objects', function () {

  var obj;

  afterEach(function () {
    delete mocks.obj.constructor.prototype.foo;
  });

  describe('extend', function () {

    beforeEach(function () {
      obj = {};
    });

    it('should copy properties from source to destination', function () {
      _.extend(obj, mocks.obj);
      obj.should.eql(mocks.obj);
    });

    it('should return the destination object', function () {
      _.extend(obj, mocks.obj).should.equal(obj);
    });

    it('should ignore the object prototype', function () {
      mocks.obj.constructor.prototype.foo = 'foo';
      _.extend(obj, mocks.obj);
      obj.hasOwnProperty('foo').should.be.false;
    });

  });

  describe('defaults', function () {

    beforeEach(function () {
      obj = {};
    });

    it('should copy source properties to undefined properties in the destination object', function () {
      var res = JSON.parse(JSON.stringify(mocks.obj));
      res[mocks.objKeysArr[0]] = 'existing';
      obj[mocks.objKeysArr[0]] = 'existing';
      _.defaults(obj, mocks.obj);
      obj.should.eql(res);
    });

    it('should return the destination object', function () {
      _.defaults(obj, mocks.obj).should.equal(obj);
    });

    it('should ignore the object prototype', function () {
      mocks.obj.constructor.prototype.foo = undefined; // needs to be undefined to test properly with _.defaults()
      _.defaults(obj, mocks.obj);
      obj.hasOwnProperty('foo').should.be.false;
    });

  });

});

describe('Collections', function () {

  var called = false;

  afterEach(function () {
    delete mocks.obj.constructor.prototype.foo;
  });

  describe('each', function () {

    afterEach(function () {
      called = false;
    });

    it('should iterate over an array', function () {
      _.each(mocks.arr, function (el, i, arr) {
        (typeof i).should.equal('number');
        arr[i].should.equal(el);
        called = true;
      });
      called.should.be.true;
    });

    it('should iterate over an object', function () {
      _.each(mocks.obj, function (val, key, obj) {
        obj[key].should.equal(val);
        called = true;
      });
      called.should.be.true;
    });

    it('should ignore the object prototype', function () {
      mocks.obj.constructor.prototype.foo = 'foo';
      _.each(mocks.obj, function (val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.each(mocks.arr, function (el, i, arr) {
        arr.should.equal(mocks.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.each(mocks.obj, function (val, key, obj) {
        obj.should.equal(mocks.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.each(mocks.arr, function () {
        this.should.equal(mocks.obj);
        called = true;
      }, mocks.obj);
      called.should.be.true;
      called = false;
      _.each(mocks.obj, function () {
        this.should.equal(mocks.arr);
        called = true;
      }, mocks.arr);
      called.should.be.true;
    });

    it('should return the collection', function () {
      _.each(mocks.arr, function () {}).should.equal(mocks.arr);
      _.each(mocks.obj, function () {}).should.equal(mocks.obj);
    });

  });

  describe('contains', function () {

    it('should return an array of indexes / keys where values are found', function () {
      _.contains(mocks.arr, mocks.arr[0]).should.eql([0]);
    });

    it('should return an empty array if value is not found', function () {
      _.contains(mocks.arr, []).should.eql([]);
    });

  });

  describe('map', function () {

    afterEach(function () {
      called = false;
    });

    it('should return an array with the results of applying iteratee to each element', function () {
      _.map(mocks.arr, function (el, i, arr) {
        arr[i].should.equal(el);
        return el;
      }).should.eql(mocks.arr);
      _.map(mocks.obj, function (val, key, obj) {
        obj[key].should.equal(val);
        return val;
      }).should.eql(mocks.objValuesArr);
    });

    it('should ignore the object prototype', function () {
      mocks.obj.constructor.prototype.foo = 'foo';
      _.map(mocks.obj, function (val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.map(mocks.arr, function (el, i, arr) {
        arr.should.equal(mocks.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.map(mocks.obj, function (val, key, obj) {
        obj.should.equal(mocks.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.map(mocks.arr, function () {
        this.should.equal(mocks.obj);
        called = true;
      }, mocks.obj);
      called.should.be.true;
      called = false;
      _.map(mocks.obj, function () {
        this.should.equal(mocks.arr);
        called = true;
      }, mocks.arr);
      called.should.be.true;
    });

  });

  describe('reduce', function () {

    afterEach(function () {
      called = false;
    });

    it('should be able to reduce a collection to a single value', function () {
      _.reduce(mocks.arr, function (accumulator, el, i, arr) {
        arr[i].should.equal(el);
        return accumulator.toString() + el.toString();
      }).should.equal(mocks.stringifiedArrElms);
      _.reduce(mocks.obj, function (accumulator, val, key, obj) {
        obj[key].should.equal(val);
        return accumulator.toString() + val.toString();
      }).should.equal(mocks.stringifiedObjValues);
      _.reduce(mocks.obj, function (accumulator, val, key, obj) {
        obj[key].should.equal(val);
        return accumulator + val;
      }).should.equal(mocks.sumObjValues);
    });

    it('should support initial state', function () {
      _.reduce(mocks.arr, function (accumulator, el) {
        return accumulator + el.toString();
      }, 'init').should.equal('init' + mocks.stringifiedArrElms);
      _.reduce(mocks.obj, function (accumulator, val) {
        return accumulator + val.toString();
      }, 'init').should.equal('init' + mocks.stringifiedObjValues);
    });

    it('should ignore the object prototype', function () {
      mocks.obj.constructor.prototype.foo = 'foo';
      _.reduce(mocks.obj, function (accumulator, val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
        return accumulator;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.reduce(mocks.arr, function (accumulator, el, i, arr) {
        arr.should.equal(mocks.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.reduce(mocks.obj, function (accumulator, val, key, obj) {
        obj.should.equal(mocks.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.reduce(mocks.arr, function () {
        this.should.equal(mocks.obj);
        called = true;
      }, null, mocks.obj);
      called.should.be.true;
      called = false;
      _.reduce(mocks.obj, function () {
        this.should.equal(mocks.arr);
        called = true;
      }, null, mocks.arr);
      called.should.be.true;
    });

  });

  describe('filter', function () {

    afterEach(function () {
      called = false;
    });

    it('should return an array of values that pass a truth test', function () {
      var res = [];
      mocks.halfTruthyArr.forEach(function (el) {
        el && res.push(el);
      });
      _.filter(mocks.halfTruthyArr, function (el, i, arr) {
        should.equal(arr[i], el);
        return el;
      }).should.eql(res);
      res = [];
      mocks.halfTruthyObjValuesArr.forEach(function (val) {
        val && res.push(val);
      });
      _.filter(mocks.halfTruthyObj, function (val, key, obj) {
        should.equal(obj[key], val);
        return val;
      }).should.eql(res);
    });

    it('should ignore the object prototype', function () {
      mocks.obj.constructor.prototype.foo = 'foo';
      _.filter(mocks.obj, function (val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.filter(mocks.arr, function (el, i, arr) {
        arr.should.equal(mocks.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.filter(mocks.obj, function (val, key, obj) {
        obj.should.equal(mocks.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.filter(mocks.arr, function () {
        this.should.equal(mocks.obj);
        called = true;
      }, mocks.obj);
      called.should.be.true;
      called = false;
      _.filter(mocks.obj, function () {
        this.should.equal(mocks.arr);
        called = true;
      }, mocks.arr);
      called.should.be.true;
    });

  });

  describe('reject', function () {

    afterEach(function () {
      called = false;
    });

    it('should return an array of values that do not pass a truth test', function () {
      var res = [];
      mocks.halfTruthyArr.forEach(function (el) {
        !el && res.push(el);
      });
      _.reject(mocks.halfTruthyArr, function (el, i, arr) {
        should.equal(arr[i], el);
        return el;
      }).should.eql(res);
      res = [];
      mocks.halfTruthyObjValuesArr.forEach(function (val) {
        !val && res.push(val);
      });
      _.reject(mocks.halfTruthyObj, function (val, key, obj) {
        should.equal(obj[key], val);
        return val;
      }).should.eql(res);
    });

    it('should ignore the object prototype', function () {
      mocks.obj.constructor.prototype.foo = 'foo';
      _.reject(mocks.obj, function (val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.reject(mocks.arr, function (el, i, arr) {
        arr.should.equal(mocks.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.reject(mocks.obj, function (val, key, obj) {
        obj.should.equal(mocks.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.reject(mocks.arr, function () {
        this.should.equal(mocks.obj);
        called = true;
      }, mocks.obj);
      called.should.be.true;
      called = false;
      _.reject(mocks.obj, function () {
        this.should.equal(mocks.arr);
        called = true;
      }, mocks.arr);
      called.should.be.true;
    });

  });

  describe('every', function () {

    afterEach(function () {
      called = false;
    });

    it('should return true if all values pass a truth test', function () {
      _.every(mocks.arr, function (el, i, arr) {
        arr[i].should.equal(el);
        return el;
      }).should.be.true;
      _.every(mocks.obj, function (val, key, obj) {
        obj[key].should.equal(val);
        return val;
      }).should.be.true;
      _.every(mocks.halfTruthyArr, function (el) {
        return el;
      }).should.be.false;
      _.every(mocks.halfTruthyObj, function (val) {
        return val;
      }).should.be.false;
    });

    it('should ignore the object prototype', function () {
      mocks.obj.constructor.prototype.foo = 'foo';
      _.every(mocks.obj, function (val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.every(mocks.arr, function (el, i, arr) {
        arr.should.equal(mocks.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.every(mocks.obj, function (val, key, obj) {
        obj.should.equal(mocks.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.every(mocks.arr, function () {
        this.should.equal(mocks.obj);
        called = true;
      }, mocks.obj);
      called.should.be.true;
      called = false;
      _.every(mocks.obj, function () {
        this.should.equal(mocks.arr);
        called = true;
      }, mocks.arr);
      called.should.be.true;
    });

  });

  describe('some', function () {

    afterEach(function () {
      called = false;
    });

    it('should return true if any value passes a truth test', function () {
      _.some(mocks.arr, function (el, i, arr) {
        arr[i].should.equal(el);
        return !el;
      }).should.be.false;
      _.some(mocks.obj, function (val, key, obj) {
        obj[key].should.equal(val);
        return !val;
      }).should.be.false;
      _.some(mocks.halfTruthyArr, function (el) {
        return el;
      }).should.be.true;
      _.some(mocks.halfTruthyObj, function (val) {
        return val;
      }).should.be.true;
    });

    it('should ignore the object prototype', function () {
      mocks.obj.constructor.prototype.foo = 'foo';
      _.some(mocks.obj, function (val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.some(mocks.arr, function (el, i, arr) {
        arr.should.equal(mocks.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.some(mocks.obj, function (val, key, obj) {
        obj.should.equal(mocks.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.some(mocks.arr, function () {
        this.should.equal(mocks.obj);
        called = true;
        return true;
      }, mocks.obj);
      called.should.be.true;
      called = false;
      _.some(mocks.obj, function () {
        this.should.equal(mocks.arr);
        called = true;
        return true;
      }, mocks.arr);
      called.should.be.true;
    });

  });

  describe('invoke', function () {

    var argsArr;

    before(function () {
      Object.prototype.testCall = function () {
        return this;
      };
      Object.prototype.testArgs = function () {
        arguments[0].should.equal(argsArr[0]);
        arguments[1].should.equal(argsArr[1]);
        called = true;
      };
    });

    after(function () {
      delete Object.prototype.testCall;
      delete Object.prototype.testArgs;
    });

    it('should return an array with the results of calling the indicated method on each element', function () {
      _.invoke(mocks.arr, 'testCall').should.eql(mocks.arr);
      _.invoke(mocks.obj, 'testCall').should.eql(mocks.objValuesArr);
    });

    it('should correctly pass the arguments', function () {
      argsArr = [mocks.arr, mocks.obj];
      _.invoke(mocks.arr, 'testArgs', mocks.arr, mocks.obj);
      called.should.be.true;
      called = false;
      argsArr = [mocks.obj, mocks.arr];
      _.invoke(mocks.obj, 'testArgs', mocks.obj, mocks.arr);
      called.should.be.true;
    });

  });

  describe('pluck', function () {

    var collection = [{color: 'red'}, {color: 'green'}, {color: 'blue'}];

    it('should return an array of values corresponding to the indicated property for each object in the collection', function () {
      _.pluck(collection, 'color').should.eql(['red', 'green', 'blue']);
    });

    it('missing properties are returned as undefined', function () {
      _.pluck(collection, 'foo').should.eql([undefined, undefined, undefined]);
    });

  });

});

describe('Functions', function () {

  describe('once', function () {

    it('should call the function only once, and return the same result in following calls', function () {
      var called = 0;
      var onced = _.once(function (string) {
        called ++;
        return mocks.reverseString(string);
      });
      onced(mocks.string).should.equal(mocks.reversedString);
      onced(mocks.reversedString).should.equal(mocks.reversedString);
      called.should.equal(1);
    });

  });

  describe('memoize', function () {

    it('should cache already computed results', function () {
      var called = 0;
      var memoized = _.memoize(function (string) {
        called ++;
        return mocks.reverseString(string);
      });
      memoized(mocks.string).should.equal(mocks.reversedString);
      memoized(mocks.string).should.equal(mocks.reversedString);
      called.should.equal(1);
    });

    it('should recompute when called with different arguments', function () {
      var called = 0;
      var memoized = _.memoize(function (string) {
        called ++;
        return mocks.reverseString(string);
      });
      memoized(mocks.string).should.equal(mocks.reversedString);
      memoized(mocks.reversedString).should.equal(mocks.string);
      called.should.equal(2);
    });

  });

  describe('delay', function () {

    it('should delay the execution of a function, and pass arguments when provided', function (done) {
      var called = 0;
      var string = mocks.string;
      _.delay(function (str) {
        called ++;
        string = mocks.reverseString(str);
      }, 50, mocks.string);
      called.should.equal(0);
      string.should.equal(mocks.string);
      setTimeout(function () {
        var err;
        try {
          called.should.equal(1);
          string.should.equal(mocks.reversedString);
        } catch (e) {err = e;}
        done(err);
      }, 60);
    });

  });

  describe('throttle', function () {

    it('should compute and return the function result when first called', function () {
      var called = 0;
      var throttled = _.throttle(function (string) {
        called ++;
        return mocks.reverseString(string);
      }, 1);
      throttled(mocks.string).should.equal(mocks.reversedString);
      called.should.equal(1);
    });

    it('should return the last computed result when throttled', function () {
      var throttled = _.throttle(function (string) {
        return mocks.reverseString(string);
      }, 300);
      throttled(mocks.string).should.equal(mocks.reversedString);
      throttled().should.equal(mocks.reversedString);
    });

    it('should call the function at most once every indicated milliseconds', function (done) {
      var called = 0;
      var throttled = _.throttle(function () {
        called ++;
      }, 50);
      throttled();
      throttled();
      called.should.equal(1);
      setTimeout(function () {
        throttled();
        var err;
        try {called.should.equal(2);}
        catch (e) {err = e;}
        done(err);
      }, 60);
    });

  });

});
