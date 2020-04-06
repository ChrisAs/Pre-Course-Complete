'use strict';

// Utilities
function returnArgs () {
  return arguments;
}

// Mocks
var mocks = {
  arr: ['a','b','c','d'], // >= 4 elements, all should be truthy
  obj: {a:1,b:2,c:3,d:4}, // >= 4 values, all should be truthy
  halfTruthyArr: [null,'b',null,'d'], // >= 4 elements, half should be falsy
  halfTruthyObj: {a:1,b:null,c:3,d:null}, // >= 4 values, half should be falsy
  string: 'This is a string.',
  reverseString: function (string) {
    if (typeof string === 'string') return string.split('').reverse().join('');
  }
};

mocks.argumentsObj = returnArgs.apply(null, mocks.arr);
mocks.stringifiedArrElms = mocks.arr.join('');
mocks.objKeysArr = Object.keys(mocks.obj);
mocks.objValuesArr = mocks.objKeysArr.map(function (key) {
  return mocks.obj[key];
});
mocks.stringifiedObjKeys = mocks.objKeysArr.join('');
mocks.stringifiedObjValues = mocks.objValuesArr.join('');
mocks.sumObjValues = Object.keys(mocks.obj).reduce((acc, el) =>
  acc += mocks.obj[el],0);
mocks.halfTruthyObjKeysArr = Object.keys(mocks.halfTruthyObj);
mocks.halfTruthyObjValuesArr = mocks.halfTruthyObjKeysArr.map(function (key) {
  return mocks.halfTruthyObj[key];
});
mocks.reversedString = mocks.reverseString(mocks.string);

// Allow mocks to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = mocks;
}
