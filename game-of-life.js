this.GAMEOFLIFE = (function ()
{
	var canvas = document.getElementById("canvas");

	WORLD.init({ grid: { width: 10, height: 10 }});
	GRAPHICS.init({ canvas: canvas, cell: {width: 10, height: 10 }});
}());
