Game of Life
============

This is a Javascript implementation of Conway's Game of Life that displays the
grid of cells using the `canvas` HTML5 element.


Requirements
------------

Development happens on Google Chrom(e|ium), so expect problems in other
browsers (cross browser compatibility is not my primary goal for now).


Download
--------

	git clone git://github.com/rjack/game-of-life.git
	cd game-of-life/
	git submodule init
	git submodule update

Run
---

Point your browser to

	/path/to/game-of-life/index.html

Since there is no working UI at this development stage, you need to open the
javascript developer console (`Ctrl+Shift+J` in Chrome) and control the game
with the following API:

	GOL.init(width, height, 1, 1, [first_generation]);

	// examples:
	// GOL.init(800, 600, 1, 1);    // random cells
	// GOL.init(800, 600, 1, 1, [1, 802, 1600, 1601, 1602]);    // glider

	GOL.start();

	GOL.stop();

	GOL.step();

