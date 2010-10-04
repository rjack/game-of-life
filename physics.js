importScripts("grid.js");


var iface = {},

	_sum = function (x, y)
	{
		return x + y;
	},

	_evolve = function (cell, neighbours)
	{
		var nr_alive = neighbours.reduce(_sum);
		if (cell) {
			if (nr_alive < 2 || nr_alive > 3) {
				return false;
			} else {
				return true;
			}
		} else {
			if (nr_alive === 3) {
				return true;
			} else {
				return false;
			}
		}
	};


iface.init = function (width, height, matrix)
{
	GRID.init(width, height, matrix);
	postMessage(JSON.stringify({
		title: "ready",
		content: {
			grid: GRID.getGrid()
		}
	}));
};


/*
 * compute the next grid configuration
 */
iface.next = function ()
{
	var i, j, grid = GRID.getGrid();

	for (i = 0; i < GRID.getWidth(); i++) {
		for (j = 0; j < GRID.getHeight(); j++) {
			GRID.setGrid(i, j, _evolve(GRID.cell(i, j, 0, 0), GRID.neighbours(i, j)), true);
		}
	}

	GRID.swap();

	return {
		title: "stepped",
		content: {
			grid: GRID.getGrid()
		}
	};
};


onmessage = function (ev)
{
	var request = JSON.parse(ev.data),
		result;

	if (request[0] in iface) {
		result = iface[request[0]].apply(this, request.slice(1));
	} else {
		throw request[0] + " not in interface.";
	}

	if (typeof result !== "undefined") {
		postMessage(JSON.stringify(result));
	}
};
