this.GRID = (function ()
{
	var cells,
		cells_tmp,
		width, height,
		nr_cells,

		encode_cell_status = function (alive, nr_alive_neighbours)
		{
			return alive ? nr_alive_neighbours : nr_alive_neighbours + 9;
		},

		is_cell_alive = function (encoded_status)
		{
			return encoded_status < 9;
		},

		cell_nr_neighbours = function (encoded_status)
		{
			return encoded_status < 9 ? encoded_status : encoded_status - 9;
		},

		toggle_status = function (encoded_status)
		{
			return encoded_status < 9 ? encoded_status + 9 : encoded_status - 9;
		},

		notify_neighbours = function (cells, i, alive)
		{
			var inc = -1,
				top_left = (i - 1 - width + nr_cells) % nr_cells,
				top = (i - width + nr_cells) % nr_cells,
				top_right = (i + 1 - width + nr_cells) % nr_cells,
				left = (i - 1 + nr_cells) % nr_cells,
				right = (i + 1) % nr_cells,
				bottom_left = (i - 1 + width) % nr_cells,
				bottom = (i + width) % nr_cells,
				bottom_right = (i + 1 + width) % nr_cells;


			if (alive) {
				inc = 1;
			}

			cells[top_left] += inc;
			cells[top] += inc;
			cells[top_right] += inc;

			cells[left] += inc;
			cells[right] += inc;

			cells[bottom_left] += inc;
			cells[bottom] += inc;
			cells[bottom_right] += inc;
		},

		my = {};


	my.init = function (grid_width, grid_height)
	{
		var i;

		// Module vars initialization
		width = grid_width;
		height = grid_height;
		nr_cells = width * height;
		cells = [];
		cells_tmp = [];

		// Initialize cells: all dead (thus zero alive neighbours).
		for (i = 0; i < nr_cells; i++) {
			cells[i] = encode_cell_status(false, 0);
			// ASSUMPTION: pre-allocating the temp array here will save some
			// time on the computation of the first generation
			// TODO: verify
			cells_tmp[i] = false;
		}
	};


	my.next = function ()
	{
		var i, nr_neighbours, cells_swap;

		for (i = 0; i < nr_cells; i++) {
			cells_tmp[i] = cells[i];
		}

		for (i = 0; i < nr_cells; i++) {
			nr_neighbours = cell_nr_neighbours(cells[i]);
			if (is_cell_alive(cells[i])) {
				if (nr_neighbours < 2 || nr_neighbours > 3) {
					cells_tmp[i] = toggle_status(cells_tmp[i]);
					notify_neighbours(cells_tmp, i, false);
				}
			} else if (nr_neighbours === 3) {
				cells_tmp[i] = toggle_status(cells_tmp[i]);
				notify_neighbours(cells_tmp, i, true);
			}
		}
		cells_swap = cells;
		cells = cells_tmp;
		cells_tmp = cells_swap;

		return cells;
	};


	my.cell = function (i, j)
	{
		return cells[i + (width * j)];
	};


	my.getCells = function ()
	{
		return cells;
	};


	my.getWidth = function ()
	{
		return width;
	};


	my.getHeight = function ()
	{
		return height;
	};


	my.set = function (i, alive)
	{
		var alive_now = is_cell_alive(cells[i]);

		if (alive && !alive_now || !alive && alive_now) {
			cells[i] = toggle_status(cells[i]);
			notify_neighbours(cells, i, alive);
		}
	};


	return my;
}());
