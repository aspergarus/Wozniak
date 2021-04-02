var mode = 'casual';

document.addEventListener("DOMContentLoaded", function() {
  main();
});

function main() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');

  var img = MyImage("g.jpg");

  img.onload = function() {
      addControls();
      drawCanvas(ctx, img);
  };
}

function addControls() {
  var valBtn = document.getElementById("valentine-button");
  var casBtn = document.getElementById("casual-button");

  valBtn.addEventListener("click", function() {
    valBtn.style.display = 'none';
    casBtn.style.display = 'inline-block';
    mode = 'valentine';
  });

  casBtn.addEventListener("click", function() {
    casBtn.style.display = 'none';
    valBtn.style.display = 'inline-block';
    mode = 'casual';
  });
}

function drawCanvas(ctx, img) {
  var data = getImageData(ctx, img);

  draw(ctx, data, 200);
  animation(ctx, data, 1000);
}

function getImageData(ctx, img) {
  var canvas = ctx.canvas;
  ctx.drawImage(img, 0, 0);
  img.style.display = "none";

  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return imageData.data;
}

function draw(ctx, data, matrixSize) {
  var allPixels = [];
  for (var i = 0; i < data.length; i += 4) {
    allPixels.push({
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
      a: data[i + 3]
    });
  }

  var row = [];
  var pixels = [];
  for (var i = 1; i < allPixels.length + 1; i++) {
    row.push(allPixels[i - 1]);
    if (i % canvas.width == 0) {
      pixels.push(row);
      row = [];
    }
  }
  row = null;
  allPixels = null;

  // Draw image in circles
  var combinedPixels = [], row = [];
  var heartSize = matrixSize / 20;
  for (var x = 0; x < pixels.length; x += matrixSize) {
    for (var y = 0; y < pixels[x].length; y += matrixSize) {
      if (x + matrixSize > ctx.canvas.height || y + matrixSize > ctx.canvas.width) break;

      var res = calculatePixelsToOne(pixels, x, y, matrixSize);

      var color = 'rgb(' + res.r + ',' + res.g + ',' + res.b + ')';
      if (mode == 'casual') {
        drawCircle(ctx, y + matrixSize / 2, x + matrixSize / 2, matrixSize / 2, color, 0);
      }
      else {
        drawHeart(ctx, heartSize, y + matrixSize / 2, x + matrixSize / 2, color);
      }
      
    }
  }
}

function calculatePixelsToOne(data, x, y, size) {
  var tempPixels = [];
  var result = { r: 0, g: 0, b: 0, a: 0 };
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (data[x + i] != undefined && data[x + i][y + j] != undefined ) {
        tempPixels.push(data[x + i][y + j]);
      }
    }
  }
  for (var i = 0; i < tempPixels.length; i++) {
    result.r += tempPixels[i].r;
    result.g += tempPixels[i].g;
    result.b += tempPixels[i].b;
  }
  result.r = Math.floor(result.r / tempPixels.length);
  result.g = Math.floor(result.g / tempPixels.length);
  result.b = Math.floor(result.b / tempPixels.length);

  return result;
}

function animation(ctx, data, timeOut) {
  var canvas = ctx.canvas;

  var sizes = [100, 50, 25, 20, 15, 10, 8, 6, 5, 4];
  var pointer = 0;

  setInterval(function() {
    // Clearing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw(ctx, data, sizes[pointer]);
    pointer = !sizes[pointer] ? 0 : pointer + 1;

  }, timeOut);
}
