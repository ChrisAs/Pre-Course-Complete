# Underline

For this exercise you’ll be reimplementing some methods inspired by [Underscore](http://underscorejs.org/), a very popular JavaScript library. We’ve written a list of unit tests that your implementation needs to pass.

In the initial state of the repository most of these tests are failing. You need to open `index.js` and add the missing code in there to make all tests pass.

Modern browsers provide built-in functions that replicate some of the functions you need to implement (e.g. `forEach()` , `map()` , `reduce()` and `filter()`). Obviously don’t use them to implement your functions.

## Getting started

To install the required dependencies, run `npm install` from the project folder.

To run the tests simply open `index.html` in your browser. After you add or modify some code in `index.js` save it and refresh the page in your browser to run the tests again.

## Notes

If you’re having difficulties understanding what some methods do, or how they’re used, consider taking a look at the original Underscore documentation. If you’re not sure why a certain test is not passing, it might be helpful to read the test code in `/test/test.js`.

To debug your problems use the Chrome developer tools, or log values at different points in `index.js` or `/test/test.js`. Just make sure to remove all `debugger` and `console.log` statements before you commit your code (you should notice if there are any left when you run `git diff`).

If you’re stuck on a specific test not passing, and can’t fix it, try to continue with the rest of the tests and come back to it later, or take a note and review it during the support session with instructors.

## Tips

- To test if something is an array, you can use the [`Array.isArray()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) method.
- Inside every function you can access an [arguments object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/arguments) (through the variable `arguments`), that is very similar to an array containing all arguments passed to the function at call time. The arguments object, differently from regular objects, exposes a `length` property like arrays and strings do.
- Check out what  [`call()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/call) and [`apply()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) do, and why they’re used. In particular, what is the purpose of the `thisArg` (the context). For example, if you want to call [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) on an arguments object you will need to use `Array.prototype.slice.call(arguments, begin, end)`.
- Learn about JavaScript [prototypal inheritance](https://developer.mozilla.org/en/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).
- Notice the difference between the Boolean `true` and “[truthy](https://developer.mozilla.org/en/docs/Glossary/Truthy)” values.
- Finally, become familiar with [`setTimeout()`](https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setTimeout) as you’ll need it to implement `delay()`, and it’s one of the two options that you have for `throttle()`. If you end up using it in these exercises, don’t prefix it with `window`, as it would make tests fail in the server since `window` is undefined in Node.

## Extra credits

- Implement [`_.shuffle()`](http://underscorejs.org/#shuffle), and try to write a good unit tests [suite](https://en.wikipedia.org/wiki/Test_suite) for it.
- Clone the real underscore.js repository, look at the code and try to understand how it works. A great way to help with this is checking the tests.
- Compare your implementations to the ones in the real library. Notice that this assignment has stripped out some complexity. Try to figure out where these changes have been made, and what edge cases the original library is handling that your functions aren’t.
