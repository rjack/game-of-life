this.PHYSICS = (function (grid)
{
	var my = {},

		_evolve = function (cell, neighbours)
		{
			var i, nr_alive = 0;

			for (i = 0; i < neighbours.length; i++) {
				nr_alive += neighbours[i];
			}
			if (cell) {
				if (nr_alive < 2 || nr_alive > 3) {
					return false;
				} else {
					return true;
				}
			} else {
				if (nr_alive === 3) {
					return true;
				} else {
					return false;
				}
			}
		};


	my.init = function (width, height, matrix)
	{
		grid.init(width, height, matrix);
		return {
			title: "ready",
			content: {
				grid: grid.getGrid()
			}
		};
	};


	/*
	 * compute the next grid configuration
	 */
	my.next = function ()
	{
		var i, j;

		for (i = 0; i < grid.getWidth(); i++) {
			for (j = 0; j < grid.getHeight(); j++) {
				grid.setGrid(i, j, _evolve(grid.cell(i, j, 0, 0), grid.neighbours(i, j)), true);
			}
		}

		grid.swap();

		return {
			title: "stepped",
			content: {
				grid: grid.getGrid()
			}
		};
	};

	return my;
}(GRID));
