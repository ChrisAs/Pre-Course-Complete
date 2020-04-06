# Stringifier

For this exercise you’ll be reimplementing [`JSON.stringify()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

[JSON](https://en.wikipedia.org/wiki/JSON) is a data format that is used to “serialize” data (i.e. translate a data structure into a string) to transfer information between different entities (e.g. a client and a server, or two separate pieces of software).

JSON syntax is very close to JavaScript objects, so it will look completely familiar to you.

Most modern programming languages can translate data to JSON, and parse it back. This also allows to pass information between different programming languages.

We’ve written a list of unit tests that your implementation needs to pass. In the initial state of the repository most of these tests are failing. You need to open `index.js` and add the missing code in there to make all tests pass (obviously without using `JSON.stringify()`).

## Getting started

To install the required dependencies, run `npm install` from the project folder.

To run the tests simply open `index.html` in your browser. After you add or modify some code in `index.js` save it and refresh the page in your browser to run the tests again.

## Tips

- To complete this assignment you need to use recursion (as shown in [chapter 3](http://eloquentjavascript.net/03_functions.html) of “Eloquent JavaScript”).
- Following the tests, try to figure out what result should produce each type of input, and then how to combine them together. To do this, feel free to test some input values in `JSON.stringify()` and see what the output is. Your implementation should produce the same exact result.

```js
console.log(JSON.stringify('hello')) // -> "hello"
console.log(JSON.stringify(['hello', 3])) // -> ["hello",3]
console.log(typeof JSON.stringify(['hello', 3])) // -> string
```

## Extra credit

- Implement [`JSON.parse()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), and try to write a good unit tests suite for it. Keep in mind that this requires way more work than the first part.
