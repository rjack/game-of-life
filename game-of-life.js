this.GOL = (function (graphics, physics)
{
	var iface = {},
		_running,
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
		};


	iface.init = function (grid_width, grid_height, cell_width, cell_height)
	{
		var grid = _createGrid(grid_width, grid_height);
		_nr_steps = 0;
		_running = null;
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


	iface.start = function ()
	{
		if (console.profile) {
			console.profile();
		}

		_running = setInterval(_loop, 0);
	};


	iface.step = function ()
	{
		if (_running !== null) {
			clearInterval(_running);
			_running = null;
		}
		setTimeout(_loop, 0);
	};


	iface.stop = function ()
	{
		if (_running !== null) {
			clearInterval(_running);
			_running = null;
		}
		if (console.profileEnd) {
			console.profileEnd();
		}
	};

	return iface;
}(GRAPHICS, PHYSICS));
