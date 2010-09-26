this.GAMEOFLIFE = (function ()
{
	var grid_width = 250,
		grid_heigth = 250,

		ui = (function ()
		{
			var i,
				elems = {
					draw: null,
					profile: null,
					"start-stop": null
				};
			for (i in elems) {
				elems[i] = document.getElementById(i);
			}
			return elems;
		}()),

		interval,

		ui = (function ()
		{
			var i,
				elems = {
					draw: null,
					profile: null,
					"start-stop": null
				};
			for (i in elems) {
				elems[i] = document.getElementById(i);
			}
			return elems;
		}()),

		interval,

		canvas = document.getElementById("canvas"),


		start = function ()
		{
			interval = setInterval(function ()
			{
				WORLD.update();
				GRAPHICS.update(WORLD.getDescription());
			}, 1000 / 1);
		},


		stop = function ()
		{
			clearInterval(interval);
			interval = null;
		},

		init = function ()
		{
			var i, j;

			interval = null;

			WORLD.init({ grid: { width: grid_heigth, height: grid_width }});

			//PHYSICS.init();
			GRAPHICS.init({ canvas: canvas, cell: {width: 2, height: 2}});

			// Randomly spawn living cells
			for (i = 0; i < grid_width; i++) {
				for (j = 0; j < grid_heigth; j++) {
					WORLD.setCell(i, j, Math.random() >= 0.5 ? true : false);
				}
			}
			//WORLD.update(PHYSICS.next(WORLD.getDescription()));
			WORLD.update();
			GRAPHICS.update(WORLD.getDescription());


			// User input
			ui["start-stop"].addEventListener("click", function (ev)
			{
				if (interval) {
					if (ui.profile.checked) {
						console.profileEnd();
					}
					ui.profile.disabled = false;
					stop();
					ev.target.textContent = "start";
				} else {
					if (ui.profile.checked) {
						console.profile();
					}
					start();
					ui.profile.disabled = true;
					ev.target.textContent = "stop";
				}
			});
		};

	init();
}());
