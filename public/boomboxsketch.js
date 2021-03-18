var socket = io();
var socketId = null;

socket.on("connect", () => {
  socketId = socket.id;
  console.log(socketId); // an alphanumeric id...
  socket.emit("Boombox connected", socketId);
});

socket.on("Client event", (msg) => {
  console.log(msg);
});

function setup() {
  createCanvas(500, 500);
  background(64);
}

function draw() {
  fill(255);
  ellipse(mouseX, mouseY, 20, 20);
}
