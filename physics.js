this.PHYSICS = (function ()
{
	var grid,


		init = function (world, config)
		{
			var i, j;

			// Randomly spawn living cells
			// FIXME: does not belongs here!
			for (i = 0; i < world.getWidth(); i++) {
				for (j = 0; j < world.getHeight(); j++) {
					world.setCell(i, j, Math.random() >= 0.5 ? true : false);
				}
			}
		},


		next = function (world)
		{
			var i, j, i_off,
				current_cell, future_cell, neighb_cell,
				nr_neighbs,
				neighbs_offsets = [
					[-1, -1], [+0, -1], [+1, -1],
					[-1, +0],           [+1, +0],
					[-1, +1], [+0, +1], [+1, +1]
				];

			grid = [];
			for (i = 0; i < world.getWidth(); i++) {
				grid[i] = [];
				for (j = 0; j < world.getHeight(); j++) {
					nr_neighbs = 0;
					current_cell = world.getCell(i, j);
					for (i_off = 0; i_off < neighbs_offsets.length; i_off++) {
						neighb_cell = world.getCell(i, j, neighbs_offsets[i_off][0], neighbs_offsets[i_off][1]);
						nr_neighbs += Number(neighb_cell.alive);
					}
					if (current_cell.alive) {
						if (nr_neighbs < 2 || nr_neighbs > 3) {
							grid[i][j] = world.createCell(false);
						} else {
							grid[i][j] = world.createCell(true);
						}
					} else {
						if (nr_neighbs === 3) {
							grid[i][j] = world.createCell(true);
						} else {
							grid[i][j] = world.createCell(false);
						}
					}
				}
			}
			return grid;
		};


	// PHYSICS' public interface.
	return {
		init: init,
		next: next
	};
}());
