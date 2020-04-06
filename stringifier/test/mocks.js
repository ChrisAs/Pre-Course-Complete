'use strict';

// Mocks
var mocks = {
  num: 0,
  string: 'This is a string',
  func: function () {}
};

mocks.arr = [mocks.num, mocks.string, mocks.func, '', null, undefined];
mocks.obj = {
  num: mocks.num,
  string: mocks.string,
  func: mocks.func,
  emptyString: '',
  null: null,
  undefined: undefined
};
mocks.nestedArr = [mocks.arr, mocks.obj];
mocks.nestedObj = {arr: mocks.arr, obj: mocks.obj};

// Allow mocks to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = mocks;
}
