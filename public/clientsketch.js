var socket = io();
var socketId = null;

socket.on("connect", () => {
  socketId = socket.id;
  console.log(socketId); // an alphanumeric id...
  socket.emit("Client connected", socketId);
});

let gui;
let button1, button2, button3, button4, button5, button6, button7, button8;
let slider1, slider2, slider3, slider4;
let joystick1;
let slider2d1;

let canvasWidth;
let canvasHeight;

let controlWidth = 0;
let controlPadding = 20;

function setup() {
  //This needs to be set here otherwise firefox mobile renders
  //the incorrect canvas size the -20 is to stop any scrolling
  canvasWidth = window.innerWidth - 20;
  canvasHeight = window.innerHeight - 20;

  createCanvas(canvasWidth, canvasHeight);
  background(64);

  drawGUI();
}

function draw() {
  background(0);
  drawGui();

  if (button1.isPressed) {
    socket.emit("Button pressed", socketId, "1");
  }
  if (button2.isPressed) {
    socket.emit("Button pressed", socketId, "2");
  }
  if (button3.isPressed) {
    socket.emit("Button pressed", socketId, "3");
  }
  if (button4.isPressed) {
    socket.emit("Button pressed", socketId, "4");
  }
  if (button5.isPressed) {
    socket.emit("Button pressed", socketId, "5");
  }
  if (button6.isPressed) {
    socket.emit("Button pressed", socketId, "6");
  }
  if (button7.isPressed) {
    socket.emit("Button pressed", socketId, "7");
  }
  if (button8.isPressed) {
    socket.emit("Button pressed", socketId, "8");
  }

  if (slider1.isReleased) {
    socket.emit("Slider released", socketId, "1", slider1.val);
  }

  if (slider1.val > slider1.min) {
    slider1.val--;
    socket.emit("Slider released", socketId, "1", slider1.val);
  }

  if (slider2.isReleased) {
    socket.emit("Slider released", socketId, "2", slider2.val);
  }

  if (slider2.val > slider2.min) {
    slider2.val--;
    socket.emit("Slider released", socketId, "2", slider2.val);
  }

  if (slider3.isReleased) {
    socket.emit("Slider released", socketId, "3", slider3.val);
  }

  if (slider3.val > slider3.min) {
    slider3.val--;
    socket.emit("Slider released", socketId, "3", slider3.val);
  }

  if (slider4.isReleased) {
    socket.emit("Slider released", socketId, "4", slider4.val);
  }

  if (slider4.val > slider4.min) {
    slider4.val--;
    socket.emit("Slider released", socketId, "4", slider4.val);
  }

  if (joystick1.isChanged) {
    socket.emit("Joystick changed", socketId, "1", joystick1.val);
  }

  if (slider2d1.isChanged) {
    socket.emit("Slider2d changed", socketId, "1", slider2d1.val);
  }
}

function drawGUI() {
  gui = createGui();
  gui.loadStyle("TerminalGreen");

  controlHeight = (canvasHeight - 5) / 4;
  controlWidth = (canvasWidth - controlPadding * 5) / 4;

  //Top row
  button1 = createButton(
    "1",
    controlPadding,
    controlPadding,
    controlWidth,
    controlHeight / 2 - controlPadding / 2
  );

  button1._style.textSize = 40;

  button2 = createButton(
    "2",
    controlPadding * 2 + controlWidth,
    controlPadding,
    controlWidth,
    controlHeight / 2 - controlPadding / 2
  );

  button2._style.textSize = 40;

  button3 = createButton(
    "3",
    controlPadding * 3 + controlWidth * 2,
    controlPadding,
    controlWidth,
    controlHeight / 2 - controlPadding / 2
  );

  button3._style.textSize = 40;

  button4 = createButton(
    "4",
    controlPadding * 4 + controlWidth * 3,
    controlPadding,
    controlWidth,
    controlHeight / 2 - controlPadding / 2
  );

  button4._style.textSize = 40;

  //Second row
  button5 = createButton(
    "5",
    controlPadding,
    controlPadding + controlHeight / 2,
    controlWidth,
    controlHeight / 2 - controlPadding / 2
  );

  button5._style.textSize = 40;

  button6 = createButton(
    "6",
    controlPadding * 2 + controlWidth,
    controlPadding + controlHeight / 2,
    controlWidth,
    controlHeight / 2 - controlPadding / 2
  );

  button6._style.textSize = 40;

  button7 = createButton(
    "7",
    controlPadding * 3 + controlWidth * 2,
    controlPadding + controlHeight / 2,
    controlWidth,
    controlHeight / 2 - controlPadding / 2
  );

  button7._style.textSize = 40;

  button8 = createButton(
    "8",
    controlPadding * 4 + controlWidth * 3,
    controlPadding + controlHeight / 2,
    controlWidth,
    controlHeight / 2 - controlPadding / 2
  );

  button8._style.textSize = 40;

  slider1 = createSliderV(
    "Slider1",
    controlPadding,
    controlPadding * 2 + controlHeight,
    controlWidth,
    controlHeight,
    100,
    300
  );
  slider1.isInteger = true;

  slider2 = createSliderV(
    "Slider2",
    controlPadding * 2 + controlWidth,
    controlPadding * 2 + controlHeight,
    controlWidth,
    controlHeight,
    100,
    300
  );
  slider2.isInteger = true;

  slider3 = createSliderV(
    "Slider3",
    controlPadding * 3 + controlWidth * 2,
    controlPadding * 2 + controlHeight,
    controlWidth,
    controlHeight,
    100,
    300
  );
  slider3.isInteger = true;

  slider4 = createSliderV(
    "Slider4",
    controlPadding * 4 + controlWidth * 3,
    controlPadding * 2 + controlHeight,
    controlWidth,
    controlHeight,
    100,
    300
  );
  slider4.isInteger = true;

  slider2d1 = createSlider2d(
    "Slider2d1",
    controlPadding,
    controlPadding * 3 + controlHeight * 2,
    controlWidth * 2 + controlPadding,
    controlHeight
  );

  joystick1 = createJoystick(
    "Joystick1",
    controlPadding * 3 + controlWidth * 2,
    controlPadding * 3 + controlHeight * 2,
    controlWidth * 2 + controlPadding,
    controlHeight
  );
}
