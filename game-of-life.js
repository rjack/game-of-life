this.GOF = (function (graphics)
{
	var iface = {},
		nr_steps,
		phy = new Worker("physics.js"),

		ui = (function (elems)
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
					grid[i][j] = (Math.random() >= 0.5);
				}
			}
			return grid;
		};

	iface.init = function (grid_width, grid_height, cell_width, cell_height)
	{
		nr_steps = 0;
		ui.nr_steps.textContent = nr_steps;

		// init physics worker
		phy.postMessage(JSON.stringify(["init", grid_width, grid_height, _createGrid(grid_width, grid_height)]));

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

	iface.start = function (interval, onstep, nr_thread)
	{
		phy.postMessage(JSON.stringify(["start", interval, onstep, nr_thread]));
	};


	iface.stop = function ()
	{
		phy.postMessage(JSON.stringify(["stop"]));
	};


	phy.onmessage = function (ev)
	{
		var msg = JSON.parse(ev.data);

		//console.log(msg);

		if (msg.content && msg.content.grid) {
			//graphics.update(msg.content.grid);
		}

		if (msg.title === "ready") {
		} else if (msg.title === "started") {
		} else if (msg.title === "stepped") {
			nr_steps++;
			ui.nr_steps.textContent = nr_steps;
		} else if (msg.title === "stopped") {
		} else if (msg.title === "log") {
		}
	};

	return iface;
}(GRAPHICS));
