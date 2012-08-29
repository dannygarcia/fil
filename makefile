main = src/_main.js
_CANVAS = src/Canvas.js
_FRAME = src/Frame.js
_INPUT = src/Input.js
_PEN = src/Pen.js
_TRANSFORMER = src/Transformer.js

all: uglify-each uglify

uglify-each:
	uglifyjs -o src/Canvas.min.js $(_CANVAS)
	uglifyjs -o src/Frame.min.js $(_FRAME)
	uglifyjs -o src/Input.min.js $(_INPUT)
	uglifyjs -o src/Pen.min.js $(_PEN)
	uglifyjs -o src/Transformer.min.js $(_TRANSFORMER)

uglify:
	cat $(main) $(_CANVAS) $(_FRAME) $(_INPUT) $(_PEN) $(_TRANSFORMER) | uglifyjs -o fil.min.js