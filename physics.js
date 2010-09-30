var grids,
	current,
	width, height,
	iface = {};


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
 * - onstep: callback function, called on each step.
 *
 * - nr_thread: number of additional web workers to use. If it's zero, use
 *   just this one.
 */
iface.start = function (interval, onstep, nr_thread)
{
	postMessage(JSON.stringify({title: "started", content: null}));
};


/*
 * stop: stops the simulation.
 */
iface.stop = function ()
{
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
