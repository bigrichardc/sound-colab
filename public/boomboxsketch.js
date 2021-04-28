var socket = io();
var socketId = null;

socket.on("connect", () => {
  socketId = socket.id;
  console.log(socketId); // an alphanumeric id...
  socket.emit("Boombox connected", socketId);
});

socket.on("Boombox queue", (msg, button) => {
  queueSound("sound" + button);
});

var multiPlayer = new Tone.Players(
  {
    sound1: "./sounds/Scape12(C).wav",
    sound2: "./sounds/Scape13(C).wav",
    sound3: "./sounds/Scape14(C).wav",
    sound4: "./sounds/Scape15(C).wav",
    sound5: "./sounds/Scape16(C).wav",
    sound6: "./sounds/Scape17(C).wav",
    sound7: "./sounds/Scape18(C).wav",
  },
  audioLoaded()
).toDestination();

let soundPlayer1 = null;

function audioLoaded() {
  console.log("Audio loaded...");
}
var soundQueue = ["sound3"];

var count = 0;
var SOUNDS_PLAYING = false;

function playSounds() {
  displayQueue();
  soundPlayer1 = multiPlayer.player(soundQueue[0]);
  soundPlayer1.onstop = () => {
    if (soundQueue.length > 1) {
      soundQueue.shift();
      playSounds();
    } else {
      soundQueue.shift();
      SOUNDS_PLAYING = false;
      displayQueue();
    }
  };
  soundPlayer1.start();
  SOUNDS_PLAYING = true;
}

function queueSound(sound = "sound1") {
  console.log(sound);
  soundQueue.push(sound);
  if (!SOUNDS_PLAYING) {
    playSounds();
  }
}

function wahSound() {
  var autoWah = new Tone.PingPongDelay("4n", 0.2).toDestination();
  soundPlayer1.connect(autoWah);
}

function displayQueue() {
  let soundQueueList = document.querySelector("#soundqueue");

  soundQueueList.innerHTML =
    "<ul>" +
    soundQueue
      .map(function (sound) {
        return "<li><h1>" + sound + "</h1></li>";
      })
      .join("") +
    "</ul>";
}
