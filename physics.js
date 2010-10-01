var grids,
	current,
	width, height,
	running,
	iface = {},

	_step = function (notify)
	{
		if (notify) {
			postMessage(JSON.stringify({title: "stepped", content: {grid: grids[current]}}));
		}
	},

	_loop = function (notify)
	{
		while (running) {
			_step(notify);
		}
	};


/*
 * Allocates the grid.
 */
iface.init = function (grid_width, grid_height, matrix)
{
	var i, j, k;

	width = grid_width;
	height = grid_height;

	grids = [[], []];

	for (i = 0; i < grids.length; i++) {
		for (j = 0; j < grid_width; j++) {
			grids[i][j] = [];
			for (k = 0; k < grid_height; k++) {
				grids[i][j][k] = matrix[j][k];
			}
		}
	}

	current = 0;
	running = false;

	return {
		title: "ready",
		content: {
			grid: grids[current]
		}
	};
};


/*
 * start: starts the simulation.
 *
 * - interval: time in milliseconds between steps. If it's zero simulation
 *   runs in a tight loop.
 *
 * - notify: notify steps
 *
 * - nr_thread: number of additional web workers to use. If it's zero, use
 *   just this one.
 */
iface.start = function (interval, notify, nr_thread)
{
	interval = Number(interval);
	nr_thread = Number(nr_thread);

	// NaN
	if (interval !== interval) {
		throw "interval is not a number"
	}
	if (nr_thread !== nr_thread) {
		throw "nr_thread is not a number"
	}

	// Tell we're going...
	postMessage(JSON.stringify({title: "started", content: null}));

	// ... and go!
	if (interval === 0) {
		running = true;
		_loop(notify)
	} else {
		running = setInterval(function()
		{
			_step(notify);
		}, 1000 / interval);
	}

};


/*
 * stop: stops the simulation.
 */
iface.stop = function ()
{
	if (typeof running === "number") {
		clearInterval(running);
	}
	running = false;
};


/*
 * step: advances the simulation just one step.
 */
iface.step = function ()
{
};


onmessage = function (ev)
{
	var request = JSON.parse(ev.data),
		result;

	if (request[0] in iface) {
		result = iface[request[0]].apply(this, request.slice(1));
	} else {
		throw msg.fn + " not in interface.";
	}

	if (typeof result !== "undefined") {
		postMessage(JSON.stringify(result));
	}
};
