this.GAMEOFLIFE = (function ()
{
	var grid_width = 50,
		grid_heigth = 50,

		canvas = document.getElementById("canvas"),

		patterns = {
			slider: [[1, 0], [2, 1], [2, 2], [1, 2], [0, 2]]
		},

		init = function ()
		{
			var i, j;

			WORLD.init({ grid: { width: grid_heigth, height: grid_width }});

			// Randomly spawn living cells
			for (i = 0; i < grid_width; i++) {
				for (j = 0; j < grid_heigth; j++) {
					WORLD.setCell(i, j, Math.random() >= 0.5 ? true : false);
				}
			}

			GRAPHICS.init({ canvas: canvas, cell: {width: 10, height: 10 }});
			GRAPHICS.update(WORLD.getDescription());
		},

		start = function ()
		{
			setInterval(function ()
			{
				WORLD.update();
				GRAPHICS.update(WORLD.getDescription());
			}, 1000 / 10);
		};

	// GAMEOFLIFE's public interface
	return {
		init: init,
		start: start
	};
}());

GAMEOFLIFE.init();
GAMEOFLIFE.start();
