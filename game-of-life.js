this.GOL = (function (graphics)
{
	var iface = {},
		_running,
		_nr_steps,
		_phy = new Worker("physics.js"),

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
		};


	iface.init = function (grid_width, grid_height, cell_width, cell_height)
	{
		_nr_steps = 0;
		_running = false;
		_ui.nr_steps.textContent = _nr_steps;

		// init physics worker
		_phy.postMessage(JSON.stringify(["init", grid_width, grid_height, _createGrid(grid_width, grid_height)]));

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
	};


	iface.start = function ()
	{
		if (console.profile) {
			console.profile();
		}
		_running = true;
		_phy.postMessage(JSON.stringify(["next"]));
	};


	iface.step = function ()
	{
		_running = false;
		_phy.postMessage(JSON.stringify(["next"]));
	};


	iface.stop = function ()
	{
		_running = false;
		if (console.profileEnd) {
			console.profileEnd();
		}
	};


	_phy.onmessage = function (ev)
	{
		var msg = JSON.parse(ev.data);

		//console.log(msg);

		if (msg.content && msg.content.grid) {
			graphics.update(msg.content.grid);
		}

		if (msg.title === "ready") {
		} else if (msg.title === "started") {
		} else if (msg.title === "stepped") {
			_nr_steps++;
			_ui.nr_steps.textContent = _nr_steps;
			if (_running) {
				_phy.postMessage(JSON.stringify(["next"]));
			}
		} else if (msg.title === "stopped") {
		} else if (msg.title === "log") {
		}
	};

	return iface;
}(GRAPHICS));
