this.PHYSICS = (function ()
{
	var step,

		init = function (world, config)
		{
			var i, j;

			// Randomly spawn living cells
			for (i = 0; i < world.getWidth(); i++) {
				for (j = 0; j < world.getHeight(); j++) {
					world.setCell(i, j, Math.random() >= 0.5 ? true : false);
				}
			}
		},

		next = function (world)
		{
			console.log("TODO");
		};


	// PHYSICS' public interface.
	return {
		init: init,
		next: next
	};
}());
