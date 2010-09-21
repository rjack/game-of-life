this.WORLD = (function ()
{
	var	grids,

		width,

		height,

		i_step,


		createCell = function (alive)
		{
			return {
				alive: alive || false
			};
		},


		init = function (config)
		{
			var i, j;

			grids = [null, null];
			width = config.grid.width;
			height = config.grid.height;

			for (i_step = 0; i_step < grids.length; i_step++) {
				grids[i_step] = [];
				for (i = 0; i < width; i++) {
					grids[i_step][i] = [];
					for (j = 0; j < height; j++) {
						grids[i_step][i][j] = createCell();
					}
				}
			}
			i_step = 0;
		},


		cell = function (grid, i, j, i_off, j_off, width, height)
		{
			var new_i = (i + i_off + width) % width,
				new_j = (j + j_off + height) % height;

			return grid[new_i][new_j];
		},


		update = function ()
		{
			var i, j, i_off,
				next_step = (i_step + 1) % grids.length,
				current_cell, future_cell, neighb_cell,
				nr_neighbs,
				neighbs_offsets = [
					[-1, -1], [+0, -1], [+1, -1],
					[-1, +0],           [+1, +0],
					[-1, +1], [+0, +1], [+1, +1]
				];

			for (i = 0; i < width; i++) {
				for (j = 0; j < height; j++) {
					nr_neighbs = 0;
					current_cell = grids[i_step][i][j];
					future_cell = grids[next_step][i][j];
					for (i_off = 0; i_off < neighbs_offsets.length; i_off++) {
						neighb_cell = cell(grids[i_step], i, j, neighbs_offsets[i_off][0], neighbs_offsets[i_off][1], width, height);
						nr_neighbs += Number(neighb_cell.alive);
					}
					if (current_cell.alive) {
						if (nr_neighbs < 2 || nr_neighbs > 3) {
							future_cell.alive = false;
						} else {
							future_cell.alive = true;
						}
					} else {
						if (nr_neighbs === 3) {
							future_cell.alive = true;
						} else {
							future_cell.alive = false;
						}
					}
				}
			}

			i_step = next_step;
		},


		getDescription = function ()
		{
			return JSON.stringify(grids[i_step].map(function (array)
			{
				return array.map(function (cell)
				{
					return cell.alive;
				});
			}));
		},


		setCell = function (i, j, alive)
		{
			grids[i_step][i][j].alive = alive;
		};


	// WORLD's public interface
	return {
		init: init,
		update: update,
		getDescription: getDescription,
		setCell: setCell

	};
}());
