main();

function main() {
  var canvas = document.getElementById("canvas");

  drawGirl(canvas);
  drawCanvas(canvas);
}

function drawCanvas(canvas) {
  var ctx = canvas.getContext("2d");
  ctx.globalAlpha = 0.5;

  var middle = canvas.width / 2;
  var bot = canvas.height;

  drawHeart(ctx, 40, middle, 240, 'red', 1);

  // Get points of heart
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var data = imgData.data;
  var res = [];
  var i, chunk = 4;
  var heartPoints = [];
  for (i = 0; i < data.length; i += chunk) {
    res.push(data[i]);
  }
  for (i = 0; i < res.length; i++) {
    if (res[i] != 0) {
      var y = Math.floor(i / 1024);
      var x = i - y * 1024;
      heartPoints.push({x: x, y: y});
    }
  }

  // Sorting by X
  heartPoints.sort(function(pointA, pointB) {
    return pointA.x - pointB.x;
  });
  var topPoints = [];
  var bottomPoints = [];
  for (var i = 0; i < heartPoints.length; i++) {
    var point = heartPoints[i];
    if (point.y < 232) {
      topPoints.push(point);
    }
    else {
      if ((point.x < middle + 5) && (point.x > middle - 5)) {
        if (point.y > 240) {
          bottomPoints.push(point);
        }
      }
      else {
        bottomPoints.push(point);
      }
    }
  }
  bottomPoints.reverse();
  heartPoints = topPoints.concat(bottomPoints);
  heartPoints = heartPoints.filter(function(e, index) {
    return index % 50 == 0;
  });

  animation(ctx, heartPoints, 40);
}

function animation(ctx, points, timeOut) {
  var canvas = ctx.canvas;
  var partN = 1;

  var middle = canvas.width / 2;
  var bot = canvas.height;
  var sizeDiff = 0;
  var sigh = 1;
  var curPoint = 0;

  setInterval(function() {

    // Clearing canvas
    ctx.fillStyle = 'rgba(255, 255, 255, 100)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Moving hearts
    var x = points[curPoint].x;
    var y = points[curPoint].y;
    drawHeart(ctx, 5, x, y, 'red', 2);
    curPoint = ++curPoint < points.length ? curPoint : 0;

    // Pulsing heart
    ctx.lineWidth = 2;
    drawHeart(ctx, 35 + sizeDiff, middle, 240 - sizeDiff * 3, 'red', 1);
    sizeDiff = sizeDiff + sigh * 0.25;
    if (sizeDiff > 10) sigh = -1;
    if (sizeDiff < 0) sigh = 1;

  }, timeOut);
}

function drawGirl(origCanvas) {
  var canvas = document.getElementById("girl");
  canvas.style.top = origCanvas.offsetTop + 'px';
  canvas.style.left = origCanvas.offsetLeft + 'px';

  var ctx = canvas.getContext('2d');
  var girlImg = MyImage('g.jpg');
  var x = canvas.width / 2;
  var y = 240;

  girlImg.onload = function() {
    drawHeart(ctx, 18, x, y, 'red', 1);
    ctx.clip();
    ctx.drawImage(girlImg, x * 0.65, y * 0.65, 383, 345);
  };
}
