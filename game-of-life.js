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

		isRunning = function ()
		{
			return !!interval;
		},

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

			PHYSICS.init(WORLD, null);
			GRAPHICS.init({ canvas: canvas, cell: {width: 2, height: 2}});

			//WORLD.update(PHYSICS.next(WORLD.getDescription()));
			WORLD.update();
			GRAPHICS.update(WORLD.getDescription());


			// User input
			ui["start-stop"].addEventListener("click", function (ev)
			{
				if (isRunning()) {
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
