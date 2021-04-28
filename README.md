# Multiple Client Sound Collaboration Experiments

Multiple client music tool using:

- server.js to manage client connections.
- socket.io to send messages to mulitple clients.
- tone.js (https://tonejs.github.io/docs/14.7.77/index.html) to play and manipulate sounds.
- zeu.js (https://github.com/shzlw/zeu) to visualize network data.

# Setup

- Allow port forwarding on your router to the ip address of the server and port specified in server.js as SERVER_ADDRESS_IP and PORT.
- **npm start** to run the server
- http://(SERVER_ADDRESS_IP) - Url for sound player client
- http://(SERVER_ADDRESS_IP)/boombox.html - Url for the central sound player
- http://(SERVER_ADDRESS_IP)/zeu.html - Url for network visualisation tool

# Todo

- Experiment with sound filters
- Improve network visualisation to add and remove connected devices
