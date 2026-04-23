const express = require('express');
const Gun = require('gun');
const app = express();
const port = process.env.PORT || 8765;

// Use Gun with the Express server
const server = app.listen(port, () => {
  console.log('Relay listening on port', port);
});

// Initialize Gun on this server
const gun = Gun({ web: server });
