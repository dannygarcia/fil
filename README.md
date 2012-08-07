# FIL – Front-end Interactive Libraries

FIL, *pronounced "Phill"*, is a collection of libraries built for the purpose of facilitating the development of interactive client-side components. Each module is loosely coupled, built with [RequireJS](http://requirejs.org/docs/whyamd.html) on the AMD API and has no dependencies (other than require.js).

## Canvas.js

The purpose of Canvas.js is as follows:

  1. Quick and flexible method for embedding a `<canvas>` node.
  2. Easy access to getting / setting the canvas context.
  3. Help with small things like window resizing and pixel ratios.

### Quick Start

#### HTML
	<div id="canvas"></div>

#### JavaScript
	<script data-main="src/" src="libs/require.js"></script>
	<script>
		require(["Canvas"], function (canvas) {

			canvas.init({
				container : document.getElementById('canvas')
			});

			var ctx = canvas.context();
			// Do cool things with canvas here.

		});
	</script>

### Options

	* context	[str]		-	Context type.
	* container	[dom]		-	<canvas> container.
	* width		[num/str]	-	Canvas width. "auto" fits to container.
	* height	[num/str]	-	Canvas height. "auto" fits to container.
	* resize	[bool]		-	Should the canvas width/height be reset when the window is resized?

## To-do

These modules are still left:

 * Touch / Mouse Input
 * requestAnimationFrame
 * Canvas Drawing
 * DOM Style Transformer

##License

FIL, and its associated libraries are freely distributable under the terms of the MIT license.

Copyright (c) 2012, Danny Garcia. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.