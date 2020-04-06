
// Returns a stringified version of input,
// behaving in exactly the same way as JSON.stringify()
function stringifier (input) {
  return stringifyObject(input);
}
function stringifyObject (input) {
  switch (typeof input) {
  case 'number':
    return input.toString();
  case 'string':
    return '"' + input + '"';
  case 'function':
    return;
  case 'undefined':
    return;
  case 'object':
    if (Array.isArray(input)) {
      return stringifyArray(input);
    } else if (input) {
      return stringifyProperties(input);
    } else {
      return 'null';
    }
  }	
}

function stringifyArray (input) {
  var arrayElements = [];
	
  for (var i = 0; i < input.length; i++) {
    var arrayElement = stringifyObject(input[i]);
    arrayElements.push(arrayElement ? arrayElement : 'null');
  }
	
  return '[' + arrayElements.join() + ']';
}

function stringifyProperties (input) {
  var properties = [];
	
  for (var key in input) {
    var stringifiedObject = stringifyObject(input[key]);
    if (input.hasOwnProperty(key) && stringifiedObject) {
      var property = '"' + key + '":' + stringifiedObject;
      properties.push(property);
    }
  }
	
  return '{' + properties.join() + '}';
}
// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = stringifier;
}
