/*
 * Task: monitoring FPS
 *
 * tstamp_before_frame = Date()
 * _loop
 * tstamp_after_frame = Date()
 * frameDrawingTime = tstamp_after_frame - tstamp_before_frame
 * average = frameDrawingTime * 0.8 + previousFrameDrawingTime * 0.2
 */

this.WAVERAGE = (function ()
{
	var _tstamp = {
			before: null,
			now: null
		},
		_average,
		my = {};


	my.start = function ()
	{
		_tstamp.before = new Date();
		_average = null;
	};


	my.take = function ()
	{
		var time_taken;

		_tstamp.now = new Date();
		time_taken = _tstamp.now - _tstamp.before;
		if (typeof _average !== "number") {
			_average = time_taken;
		} else {
			_average = time_taken * 0.8 + _average * 0.2;
		}
		_tstamp.before = _tstamp.now;

		return _average;
	};


	my.getAverage = function ()
	{
		return _average;
	};

	return my;
}());


this.GOL = (function (graphics, physics, waverage)
{
	var my = {},
		_interval = {
			redraw: null,
			fps: null
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

		_createGrid = function (width, height)
		{
			var i, j, grid = [];
			for (i = 0; i < width; i++) {
				grid[i] = [];
				for (j = 0; j < height; j++) {
					grid[i][j] = Math.random() >= 0.5 ? true : false;
				}
			}
			return grid;
		},

		_loop = function ()
		{
			var result = physics.next();
			graphics.update(result.content.grid);
			waverage.take();
		};


	my.init = function (grid_width, grid_height, cell_width, cell_height)
	{
		var grid = _createGrid(grid_width, grid_height);
		_nr_steps = 0;
		_interval.redraw = null;
		_interval.fps = null;
		_ui.nr_steps.textContent = _nr_steps;

		// init physics worker
		physics.init(grid_width, grid_height, grid);

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

		graphics.update(grid);
	};


	my.start = function ()
	{
		if (console.profile && location.hash === "#profile") {
			_profiling = true;
			console.profile();
		}

		waverage.start();
		_interval.redraw = setInterval(_loop, 0);
		_interval.fps = setInterval(function ()
		{
			document.title = "FPS: " + (1000 / waverage.getAverage());
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
}(GRAPHICS, PHYSICS, WAVERAGE));
