this.WORLD = (function ()
{
	var	grid,

		width,

		height,


		createCell = function (alive)
		{
			return {
				alive: alive || false
			};
		},


		init = function (config)
		{
			var i, j;

			grid = [];
			width = config.grid.width;
			height = config.grid.height;

			for (i = 0; i < width; i++) {
				grid[i] = [];
				for (j = 0; j < height; j++) {
					grid[i][j] = createCell();
				}
			}
		},


		getCell = function (i, j, i_off, j_off)
		{
			var new_i = (i + (i_off || 0) + width) % width,
				new_j = (j + (j_off || 0) + height) % height;

			return grid[new_i][new_j];
		},


		setCell = function (i, j, alive)
		{
			grid[i][j].alive = alive;
		},


		setGrid = function (new_grid)
		{
			grid = new_grid;
		};


	// WORLD's public interface
	return {
		init: init,
		setGrid: setGrid,
		getCell: getCell,
		setCell: setCell,
		createCell: createCell,
		getWidth: function ()
		{
			return width;
		},
		getHeight: function ()
		{
			return height;
		}
	};
}());
