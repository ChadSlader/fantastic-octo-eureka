const express = require('express');
const Gun = require('gun');
const { ExpressPeerServer } = require('peer');
const http = require('http');

const app = express();
const port = process.env.PORT || 8765;

// 1. CRITICAL FIX: Tell Express to route HTTP requests for Gun
app.use(Gun.serve); 

const server = http.createServer(app);

// 2. Initialize PeerJS
const peerServer = ExpressPeerServer(server, {
  path: '/',
  allow_discovery: true
});
app.use('/peerjs', peerServer);

// 3. Initialize Gun
const gun = Gun({ web: server });

// 4. FIX: Bind explicitly to '0.0.0.0' for Render compatibility
server.listen(port, '0.0.0.0', () => {
  console.log('Unified Server listening on port', port);
  console.log('Gun Relay: /gun');
  console.log('PeerJS Broker: /peerjs');
});
