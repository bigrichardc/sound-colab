const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT_NUMBER = 3000;
const SERVER_ADDRESS_IP = "0.0.0.0"; //change as necessary
const colours = require("colors");

colours.setTheme({
  client: "yellow",
  zeu: "blue",
  boombox: "magenta",
});

let BOOMBOX_SOCKET_ID = "";
let ZEU_SOCKET_ID = "";

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/boombox", (req, res) => {
  res.sendFile(__dirname + "/boombox.html");
});

app.get("/zeu", (req, res) => {
  res.sendFile(__dirname + "/zeu.html");
});

io.on("connection", (socket) => {
  console.log(socket.id + " connected");
  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
});

io.on("connection", (socket) => {
  socket.on("Boombox connected", (boomBoxkSocketId) => {
    BOOMBOX_SOCKET_ID = boomBoxkSocketId;
    console.log(("Booombox connecting on: " + boomBoxkSocketId).boombox);
  });
});

io.on("connection", (socket) => {
  socket.on("Zeu connected", (ZeuSocketId) => {
    ZEU_SOCKET_ID = ZeuSocketId;
    console.log(("Zeu connecting on: " + ZeuSocketId).zeu);
  });
});

io.on("connection", (socket) => {
  socket.on("Client connected", (ClientSocketId) => {
    console.log(("Client connecting on: " + ClientSocketId).client);
  });
});

io.on("connection", (socket) => {
  socket.on("Boombox connected", (boomBoxkSocketId) => {
    console.log("Client connecting on: " + boomBoxkSocketId);
  });
});

io.on("connection", (socket) => {
  socket.on("Button pressed", (clientSocketId, button) => {
    console.log((clientSocketId + " triggered button " + button).client);

    console.log(("Queue sound on boombox " + BOOMBOX_SOCKET_ID).boombox);
    io.to(BOOMBOX_SOCKET_ID).emit("Boombox queue", "Queue Sound", button);
    console.log("Fire signal event on Zeu".zeu);
    io.to(ZEU_SOCKET_ID).emit("Zeu fire", clientSocketId);
  });
});

io.on("connection", (socket) => {
  socket.on("Slider released", (clientSocketId, slider, val) => {
    console.log((clientSocketId + " slider" + slider + ": " + val).client);
    //io.to(BOOMBOX_SOCKET_ID).emit("Client event", "I'm booming");
    //io.to(ZEU_SOCKET_ID).emit("Client event", "I'm booming");
  });
});

io.on("connection", (socket) => {
  socket.on("Slider2d changed", (clientSocketId, slider, val) => {
    console.log((clientSocketId + " slider" + slider + ": " + val).client);
    //io.to(BOOMBOX_SOCKET_ID).emit("Client event", "I'm booming");
    //io.to(ZEU_SOCKET_ID).emit("Client event", "I'm booming");
  });
});

io.on("connection", (socket) => {
  socket.on("Joystick changed", (clientSocketId, joystick, val) => {
    console.log((clientSocketId + " joystick" + joystick + ": " + val).client);
    //io.to(BOOMBOX_SOCKET_ID).emit("Client event", "I'm booming");
    //io.to(ZEU_SOCKET_ID).emit("Client event", "I'm booming");
  });
});

http.listen(PORT_NUMBER, SERVER_ADDRESS_IP || "localhost", () => {
  console.log("listening on *:3000");
});
