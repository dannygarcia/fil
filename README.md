# FIL – Front-end Interactive Libraries

FIL, *pronounced "Phill"*, is a collection of libraries built for the purpose of facilitating the development of interactive client-side components. Each module is loosely coupled and has no external dependencies.

[Check out a quick example](http://dannygarcia.github.com/fil/)!

## Quick Start
Be sure to include the minified source or just the specific components you need.

````html
<script src="https://raw.github.com/dannygarcia/fil/master/fil.min.js"></script>
<div id="canvas"></div>
````

````javascript
// On document ready...
// Create a new instance of each module (as needed).
var cvs = new fil.Canvas(),
	input = new fil.Input(),
	pen = new fil.Pen(),
	frame = new fil.Frame(),
	tr = new fil.Transformer(),
	el = document.getElementById('canvas'); // The <canvas> element container.

// Canvas requires initialization, but all settings are optional.
cvs.init({
  container : el,
  ratio : false
});

// Set some constant values.
var ctx = cvs.context(),
	WIDTH = cvs.width,
	HEIGHT = cvs.height;

// Pen does not require initialization, but it does require a canvas context.
pen.context(ctx);

// Grab input on the canvas container.
// Input automatically supports mobile touch events as well.
input.init({
  element : el
});

input.ontapmove = function (average) {
  // Do some things when the input moves.
};

// Start requestAnimationFrame
frame.start();
frame.step = function (f) {
	// Do more awesome things!
};

````

## Components

* [Canvas.js](https://github.com/dannygarcia/fil/blob/master/src/Canvas.js) is a clean and easy `<canvas>` helper. [View Documentation](https://github.com/dannygarcia/fil/wiki/Canvas.js)
* [Input.js](https://github.com/dannygarcia/fil/blob/master/src/Input.js) captures and normalizes mouse & touch inputs. [View Documentation](https://github.com/dannygarcia/fil/wiki/Input.js)
* [Pen.js](https://github.com/dannygarcia/fil/blob/master/src/Pen.js) helps with drawing lines, cirlces and other shapes in canvas. [View Documentation](https://github.com/dannygarcia/fil/wiki/Pen.js)
* [Frame.js](https://github.com/dannygarcia/fil/blob/master/src/Frame.js) is a simple polyfill for `window.requestAnimationFrame`. [View Documentation](https://github.com/dannygarcia/fil/wiki/Frame.js)
* [Transformer.js](https://github.com/dannygarcia/fil/blob/master/src/Transformer.js) simplifies CSS transformations. [View Documentation](https://github.com/dannygarcia/fil/wiki/Transformer.js)

## Testing

Latest test results can be found via the example on http://dannygarcia.github.com/fil/test/.

Browser-based [nodeunit](https://github.com/caolan/nodeunit) testing is preferred because these are front-end libraries and therefore require the `window` global, `<canvas>` support and, of course, the DOM.

## To-do

 * Resolve [self-created issues](https://github.com/dannygarcia/fil/issues?state=open).
 * Add more drawing features to Pen.js

## MIT License

FIL, and its associated libraries are freely distributable under the terms of the MIT license.

Copyright (c) 2012, Danny Garcia. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.