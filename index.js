const express = require('express');
const Gun = require('gun');
const { ExpressPeerServer } = require('peer');
const http = require('http');

const app = express();
const port = process.env.PORT || 8765;

// Create a native HTTP server to handle the upgrades manually
const server = http.createServer(app);

// 1. Initialize PeerJS
const peerServer = ExpressPeerServer(server, {
  path: '/',
  allow_discovery: true
});
app.use('/peerjs', peerServer);

// 2. Initialize Gun
// We explicitly tell Gun to use the same server
const gun = Gun({ web: server });

server.listen(port, () => {
  console.log('Unified Server listening on port', port);
  console.log('Gun Relay: /gun');
  console.log('PeerJS Broker: /peerjs');
});
