this.GOL = (function (graphics, grid)
{
	var my = {},
		_interval = {
			redraw: null,
		},
		_profiling,
		_nr_steps,

		_ui = (function (elems)
		{
			var i, ui = {};
			for (i = 0; i < elems.length; i++) {
				ui[elems[i]] = document.getElementById(elems[i]);
			}
			return ui;
		}(["nr_steps"])),

		_loop = function ()
		{
			graphics.update(grid.next());
			//grid.next();
			//graphics.draw(grid.getCells());
		};


	my.init = function (grid_width, grid_height, cell_width, cell_height, alive_cells)
	{
		var i;

		_nr_steps = 0;
		_interval.redraw = null;
		_ui.nr_steps.textContent = _nr_steps;

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
			_profiling = true;
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
		if (_profiling) {
			console.profileEnd();
		}
	};

	return my;
}(GRAPHICS, GRID));
