this.GOL = (function (graphics, grid)
{
	var my = {},
		_interval = {
			redraw: null
		},

		_loop = function ()
		{
			graphics.update(grid.next());
		};


	my.init = function (grid_width, grid_height, cell_width, cell_height, alive_cells)
	{
		var i;

		_interval.redraw = null;

		// init graphics module
		graphics.init({
			canvas: {
				element: document.getElementById("canvas"),
				width: grid_width * cell_width,
				height: grid_height * cell_height
			},
			cell: {
				width: cell_width,
				height: cell_height
			}
		});

		// init grid module
		grid.init(grid_width, grid_height);
		if (alive_cells) {
			// first generation choosen by user
			for (i = 0; i < alive_cells.length; i++) {
				grid.set(alive_cells[i], true);
			}
		} else {
			// first generation randomly generated
			for (i = 0; i < grid_width * grid_height; i++) {
				grid.set(i, Math.random() > 0.5);
			}
		}
		graphics.draw(grid.getCells());
	};


	my.start = function ()
	{
		if (console.profile && location.hash === "#profile") {
			console.profile();
		}

		_interval.redraw = setInterval(_loop, 0);
	};


	my.step = function ()
	{
		if (_interval.redraw !== null) {
			clearInterval(_interval.redraw);
			_interval.redraw = null;
		}
		setTimeout(_loop, 0);
	};


	my.stop = function ()
	{
		if (_interval.redraw !== null) {
			clearInterval(_interval.redraw);
			_interval.redraw = null;
		}
	};

	return my;
}(GRAPHICS, GRID));
