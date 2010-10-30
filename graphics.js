/*
 * Game of Life Graphics Module
 *
 * Draws a WORLD's description on an HTML canvas.
 */

this.GRAPHICS = (function ()
{
	var cnv, ctx, img, pixels, pixels_length,

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
			img = ctx.getImageData(0, 0, cnv.width, cnv.height);
			pixels = img.data;
			pixels_length = img.data.length;

		},


		update = function (cells)
		{
			var p, i, j;

			for (p = 0; p < pixels_length; p += 4) {
				i = (p / 4);
				if (cells[i] < 9) {
					pixels[p + 0] = 0;
					pixels[p + 1] = 0;
					pixels[p + 2] = 0;
					pixels[p + 3] = 255;
				} else {
					pixels[p + 0] = 255;
					pixels[p + 1] = 255;
					pixels[p + 2] = 255;
					pixels[p + 3] = 255;
				}
			}
			img.data = pixels;
			ctx.putImageData(img, 0, 0);
		};


	// GRAPHICS's public interface
	return {
		init: init,
		update: update
	};
}());
