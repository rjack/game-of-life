this.GOF = (function (graphics)
{
	var iface = {},
		phy = new Worker("physics.js"),

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
		console.profile();
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

	iface.start = function (interval, nr_thread)
	{
	};


	phy.onmessage = function (ev)
	{
		var msg = JSON.parse(ev.data);

		console.log(msg);

		if (msg.title === "ready") {
			graphics.update(msg.content.grid);
			console.profileEnd();
		} else if (msg.title === "start") {
			phy.postMessage(JSON.stringify(["start", onstep, nr_thread]));
		} else if (msg.title === "step") {
			// TODO
		} else if (msg.title === "stop") {
			// TODO
		} else if (msg.title === "log") {
			console.log(msg.content);
		}
	};

	return iface;
}(GRAPHICS));
