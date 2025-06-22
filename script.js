const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  return `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= canvas.width || (this.x - this.size) <= 0) {
      this.velX = -this.velX;
    }
    if ((this.y + this.size) >= canvas.height || (this.y - this.size) <= 0) {
      this.velY = -this.velY;
    }
    this.velY += 0.2; // gravity
    this.velY *= 0.98; // friction


    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(balls) {
    for (let ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          this.color = ball.color = randomColor();
        }
      }
    }
  }
}

const balls = [];
const counter = document.getElementById('counter');
while (balls.length < 25) {
  const size = random(10, 20);
  let ball = new Ball(
    random(size, canvas.width - size),
    random(size, canvas.height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size
  );
  balls.push(ball);
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(balls);

  }
  counter.textContent = `Balls: ${balls.length}`;


  requestAnimationFrame(loop);
}

loop();
canvas.addEventListener('click', () => {
  const size = random(10, 20);
  const newBall = new Ball(
    random(size, canvas.width - size),
    random(size, canvas.height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size
  );
  balls.push(newBall);
});

