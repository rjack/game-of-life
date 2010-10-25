this.PHYSICS = (function (grid)
{
	var my = {},

		_evolve = function (cell, nr_neighbours)
		{
			if (cell) {
				if (nr_neighbours < 2 || nr_neighbours > 3) {
					return false;
				} else {
					return true;
				}
			} else {
				if (nr_neighbours === 3) {
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
				grid.setGrid(i, j, _evolve(grid.cell(i, j, 0, 0), grid.nr_neighbours(i, j)), true);
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
