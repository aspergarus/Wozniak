/**
 * Pack of helper-functions
 */

/**
 * Wrapper function for creating Image with src.
 */
function MyImage(src, w, h) {
	if (arguments.length == 2) {
		h = w;
	}
	var img = w ? new Image(w, h) : new Image();
	
	img.src = src;
	return img;
}

/**
 * Draws heart with some size on the {x,y} coordinates with some color.
 * Fill = 0 - fill the shape,
 * Fill = 1 - don't fill the shape, just draws a border,
 * Fill = 2 - draws a border and fill it.
 */
function drawHeart(ctx, size, x, y, color, fill) {
  fill = fill == undefined ? 0 : fill;
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.bezierCurveTo(x, y - size * 6, x - size * 10, y - size * 6, x - size * 10, y);
  ctx.bezierCurveTo(x - size * 10, y + size * 6, x, y + size * 7, x, y + size * 12);
  ctx.bezierCurveTo(x, y + size * 7, x + size * 10, y + size * 6, x + size * 10, y);
  ctx.bezierCurveTo(x + size * 10, y - size * 6, x, y - 6 * size, x, y);

  if (fill == 0) {
    ctx.fillStyle = color;
    ctx.fill();
  }
  else if (fill == 1) {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  else {
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  }
}

/**
 * Draws circle on the {x,y} coordinates with some radius{r} and with some color.
 * Fill = 0 - fill the shape,
 * Fill = 1 - don't fill the shape, just draws a border,
 * Fill = 2 - draws a border and fill it.
 */
function drawCircle(ctx, x, y, r, color, fill) {
  fill = fill == undefined ? 0 : fill;

  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);

  if (fill == 0) {
    ctx.fillStyle = color;
    ctx.fill();
  }
  else if (fill == 1) {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  else {
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
  }
}

/**
 * Draws list of points on the context.
 */
function drawHeartDots(context, points) {
  var canvas = context.canvas;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = "9px Arial";

  for (var i = 0; i < points.length; i++) {
    var x = points[i].x;
    var y = points[i].y;

    context.beginPath();
    context.strokeStyle = '#FF0000';
    context.lineWidth = 1;
    context.arc(x,y,1,0,2*Math.PI);
    context.fillText(i,x,y);
    context.stroke();
  }
}
