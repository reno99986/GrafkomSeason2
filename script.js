/**
 * Description
 * @type {HTMLCanvasElement} ".canv"
 *
 */
let Canvas = document.querySelector(".canv");
Canvas.width = window.innerWidth;
Canvas.height = window.innerHeight;
let ctx = Canvas.getContext("2d");
ctx.fillStyle = "blue";

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  ball.x = x;
  ball.y = y;

  console.log("Coordinate x: " + x, "Coordinate y: " + y);
}

let canvasElem = document.querySelector("canvas");
let isHoldingPointer = false;
canvasElem.addEventListener("mousedown", function (e) {
  getMousePosition(canvasElem, e);
  ball.velocityY = 0;
  isHoldingPointer = true;

});

canvasElem.addEventListener("mouseup", function (e) {
  isHoldingPointer = false;
});

canvasElem.addEventListener("mousemove", function (e) {
  if (isHoldingPointer) {
    getMousePosition(canvasElem, e);
    ball.velocityY = 0;
      console.log(MouseEvent.clientX)
  }
});

function koorX(x) {
  return Math.floor(window.innerWidth / 2) + x * -1;
}
function koorY(y) {
  return Math.floor(window.innerHeight / 2) + y * -1;
}
let ball = {
  x: 200,
  y: 0,
  width: 100,
  height: 100,
  velocityX: 0,
  velocityY: 0,
  gravity: 1, // Adjust this value to control the strength of gravity
  rotationAngle: 0,
};

let ball2 = {
  x: 500,
  y: 0,
  width: 100,
  height: 100,
  velocityX: 0,
  velocityY: 0,
  gravity: 10, // Adjust this value to control the strength of gravity
};

function drawPix(x, y, bold) {
  ctx.fillRect(x, y, bold, bold);
}

function drawfillCircle(cX, cY, r, bold) {
  let x = r;
  let y = 0;
  let rError = 1 - x;
  while (x >= y) {
    drawPix(cX + x, cY - y, bold);
    drawPix(cX - x, cY - y, bold);
    drawPix(cX + x, cY + y, bold);
    drawPix(cX - x, cY + y, bold);
    drawPix(cX + y, cY - x, bold);
    drawPix(cX - y, cY - x, bold);
    drawPix(cX + y, cY + x, bold);
    drawPix(cX - y, cY + x, bold);
    y++;
    r--;

    if (rError < 0) {
      rError += 2 * y + 1;
    } else {
      x--;
      rError += 2 * (y - x) + 1;
    }
  }
}

function drawCircleDDA(centerX, centerY, radius, color) {
  ctx.fillStyle = color;

  let x = centerX + radius;
  let y = centerY;
  let e = Math.round((radius - 0.5) * (radius - 0.5)); // Initial error term

  while (x >= centerX - radius) {
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1); // Plot pixel

    if (e >= 0) {
      y--;
      e = e - 2 * (x - centerX) - 1;
    } else {
      x--;
      e = e + 2 * (y - centerY) + 1;
    }
  }
}

function drawDDA(x1, x2, y1, y2, tebal, warna) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (Math.abs(dx) > Math.abs(dy)) {
    steps = Math.abs(dx);
  } else {
    steps = Math.abs(dy);
  }

  let incX = dx / steps;
  let incY = dy / steps;

  let x = x1;
  let y = y1;
  for (let i = 0; i < steps; i++) {
    ctx.fillStyle = warna;
    ctx.fillRect(Math.floor(x), Math.floor(y), tebal, tebal);

    x += incX;
    y += incY;
  }
}

let gravityspeed = 10;
window.requestAnimationFrame(loop);
let initVal = 100;

let fpsInterval = 1000 / 60; // 60 FPS

let then = performance.now();

function loop(now) {
  // Calculate elapsed time since the last frame
  let elapsed = now - then;

  // Only update and draw if enough time has elapsed
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    // Clear canvas
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    if (!isHoldingPointer) {
      // Apply gravity
      ball.velocityY += ball.gravity;

      // Update position based on velocity
      ball.y += ball.velocityY;


            // Update position based on velocity
            ball.x += ball.velocityX;
    }

    // Bounce if it hits the bottom
    if (ball.y + ball.height >= Canvas.height) {
      ball.velocityY *= -1.1; // Reduce velocity on bounce
      ball.y = Canvas.height - ball.height;
    }
    // Bounce if it hits the top
    if (ball.y <= ball.height) {
      ball.velocityY *= -0.5; // Reverse velocity to bounce
      ball.y = ball.height;
    }
    // Bounce if it hits the right
    if (ball.x+ball.width >= Canvas.width) {
      ball.velocityX *= -1; // Reverse velocity to bounce
      ball.x = Canvas.width - ball.width;
    }

        // Bounce if it hits the left
        if (ball.x <= ball.width) {
          ball.velocityX *= -1; // Reverse velocity to bounce
          ball.x = ball.width;
        }


    // Calculate rotation angle based on ball's horizontal movement
    ball.rotationAngle = (ball.x - window.innerWidth / 2) / 100; // Adjust divisor for rotation speed

    // Draw the rotated lines and circle
    ctx.save(); // Save the current transformation matrix
    ctx.translate(ball.x, ball.y); // Translate to the ball's position
    ctx.rotate(ball.rotationAngle); // Rotate by the calculated angle
    ctx.fillStyle = "green";
    drawfillCircle(0, 0, ball.height, 5); // Draw the circle at the center (0, 0)
    drawDDA(-100, 100, 0, 0, 3, "red"); // Draw the rotated lines
    drawDDA(0, 0, 100, -100, 3, "red");
    ctx.restore(); // Restore the previous transformation matrix
  }

  // Request next frame
  window.requestAnimationFrame(loop);
}

// Start the loop
window.requestAnimationFrame(loop);
