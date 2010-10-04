this.GRID = (function ()
{
	var _grids,
		_current,
		_width, _height,

		// neighbours offsets
		_ngb_off = [
			[-1, -1], [+0, -1], [+1, -1],
			[-1, +0],           [+1, +0],
			[-1, +1], [+0, +1], [+1, +1]
		],

		iface = {};


	iface.init = function (grid_width, grid_height, matrix)
	{
		var i, j, k;

		_width = grid_width;
		_height = grid_height;

		_grids = [[], []];

		for (i = 0; i < _grids.length; i++) {
			for (j = 0; j < grid_width; j++) {
				_grids[i][j] = [];
				for (k = 0; k < grid_height; k++) {
					_grids[i][j][k] = matrix[j][k];
				}
			}
		}

		_current = 0;
	};


	iface.swap = function ()
	{
		_current = 1 - _current;
	};


	iface.cell = function (i, j, i_off, j_off)
	{
		var new_i = (i + i_off + _width) % _width,
			new_j = (j + j_off + _height) % _height;

		return _grids[_current][new_i][new_j];
	};


	iface.neighbours = function (i, j)
	{
		var n, neighbs = [];

		for (n = 0; n < _ngb_off.length; n++) {
			neighbs.push(iface.cell(i, j, _ngb_off[n][0], _ngb_off[n][1]));
		}
		return neighbs;
	};


	iface.getGrid = function ()
	{
		return _grids[_current];
	};


	iface.setGrid = function (i, j, value, future)
	{
		var which = _current;

		if (future) {
			which = 1 - _current;
		}

		_grids[which][i][j] = value;
	};


	iface.getWidth = function ()
	{
		return _width;
	};


	iface.getHeight = function ()
	{
		return _height;
	};


	return iface;
}());
