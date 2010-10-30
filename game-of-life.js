this.GOL = (function (graphics, grid, jsmeasure)
{
	var my = {},
		_interval = {
			redraw: null,
			fps: null
		},
		_profiling,
		_nr_steps,

		_measures = {
			fps_wmean: null,
			stopwatch: null
		},

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
			_measures.fps_wmean.add(_measures.stopwatch.read());
			_measures.stopwatch.reset();
		};


	my.init = function (grid_width, grid_height, cell_width, cell_height)
	{
		var i;

		_nr_steps = 0;
		_interval.redraw = null;
		_interval.fps = null;
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

		grid.init(grid_width, grid_height);
		for (i = 0; i < grid_width * grid_height; i++) {
			grid.set(i, Math.random() > 0.5);
		}
		graphics.update(grid.getCells());

		_measures.stopwatch = jsmeasure.create_stopwatch();
		_measures.fps_wmean = jsmeasure.create_weighted_mean(0.8, 0.2);
	};


	my.start = function ()
	{
		if (console.profile && location.hash === "#profile") {
			_profiling = true;
			console.profile();
		}

		_measures.stopwatch.reset();

		_interval.redraw = setInterval(_loop, 0);
		_interval.fps = setInterval(function ()
		{
			document.title = "FPS: " + (1000 / _measures.fps_wmean.read());
		}, 1000);
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
}(GRAPHICS, GRID, JSMEASURE));
