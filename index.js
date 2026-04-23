const express = require('express');
const Gun = require('gun');
const { ExpressPeerServer } = require('peer');

const app = express();
const port = process.env.PORT || 8765;

// 1. Start the Express HTTP server
const server = app.listen(port, () => {
  console.log('Unified Server listening on port', port);
});

// 2. Initialize PeerJS and mount it to the '/peerjs' route
const peerServer = ExpressPeerServer(server, {
  path: '/', // This resolves to /peerjs/ because of the app.use below
  allow_discovery: true
});
app.use('/peerjs', peerServer);

// 3. Initialize Gun.js on the same HTTP server
// Gun automatically intercepts WebSocket requests to /gun
const gun = Gun({ web: server });

console.log('--> Gun.js relay running at /gun');
console.log('--> PeerJS broker running at /peerjs');
