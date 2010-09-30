/*
 * Game of Life Graphics Module
 *
 * Draws a WORLD's description on an HTML canvas.
 */

this.GRAPHICS = (function ()
{
	var cnv, ctx,

		cell = {
			width: 0,
			height: 0
		},


		init = function (config)
		{
			cnv = config.canvas.element;
			cnv.width = config.canvas.width;
			cnv.height = config.canvas.height;
			ctx = cnv.getContext("2d");
			cell.width = config.cell.width;
			cell.height = config.cell.height;
			ctx.fillStyle = "black";
		},


		update = function (grid)
		{
			var i_width, i_height;

			ctx.clearRect(0, 0, cnv.width, cnv.height);
			for (i_width = 0; i_width < grid.length; i_width++) {
				for (i_height = 0; i_height < grid[i_width].length; i_height++) {
					if (grid[i_width][i_height]) {
						ctx.fillRect(i_width * cell.width, i_height * cell.height, cell.width, cell.height);
					}
				}
			}
		};


	// GRAPHICS's public interface
	return {
		init: init,
		update: update
	};
}());
