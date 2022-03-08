var cvs = document.getElementById("c");
var ctx = cvs.getContext("2d");
var {width, height} = cvs;
var [x, y] = [width / 2, height / 2];
var radius = 2;
var connected = false;

cvs.onclick = () => cvs.requestPointerLock();
document.onpointerlockchange = () => connected = document.pointerLockElement === cvs;
document.onmousemove = e => {
  if (!connected) return;

  x += e.movementX * 1.2;
  y += e.movementY * 1.2;

  if (x > width) x -= width;
  if (x < 0) x += width;
  if (y > height) y -= height;
  if (y < 0) y += height;
};

clearInterval(window._id);
window._id = setInterval(() => update(), 13);


var update = () => {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < width; i+= 50) {
    for (let j = 0; j < height; j += 50) {
      if (x > i && x <= i + 50 && y > j && y <= j + 50);
      else {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.strokeRect(i, j, 50, 50);
      }
    }
  }

  let i = Math.floor(x / 50) * 50;
  let j = Math.floor(y / 50) * 50;
  box(i, j, 50);

  circle(x, y, radius);
}

var box = (x, y, s) => {
  ctx.save();
  ctx.transform(1, 0, 0, 1, 0, 0);
  ctx.strokeStyle = "turquoise";
  ctx.lineWidth = 5;
  ctx.strokeRect(x-5, y-5, s+10, s+10);
  ctx.fillStyle = "white";
  ctx.fillRect(x-5, y-5, s+10, s+10);
  ctx.restore();
};

var circle = (x, y, r) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "turquoise";
  ctx.fill();
  ctx.restore();
}

update();