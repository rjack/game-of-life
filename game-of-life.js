this.GAMEOFLIFE = (function ()
{
	var canvas = document.getElementById("canvas"),
		patterns = {
			slider: [[1, 0], [2, 1], [2, 2], [1, 2], [0, 2]]
		};

	WORLD.init({ grid: { width: 100, height: 100 }});
	for (i_coord = 0; i_coord < patterns.slider.length; i_coord++) {
		WORLD.setCell(patterns.slider[i_coord][0], patterns.slider[i_coord][1], true);
	}

	GRAPHICS.init({ canvas: canvas, cell: {width: 10, height: 10 }});
	GRAPHICS.update(WORLD.getDescription());

	setInterval(function ()
	{
		WORLD.update();
		GRAPHICS.update(WORLD.getDescription());
	}, 1000/4);
}());
