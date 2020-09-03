/**
 * A regular express server, listening on a unix socket.
 * Expects the socket name as the first argument.
 */

const { existsSync, unlinkSync } = require('fs');
const { resolve } = require('path');
const express = require('express');
const app = express();

const socketFileName = process.argv[2];
if (!socketFileName) {
  throw Error(`No socket file name provided. Please pass an argument.`);
}

const pathInDocker = `/app/sockets/${socketFileName}`;
const pathOnLocal = resolve(__dirname, 'sockets', socketFileName);
const runningOnDocker = existsSync('/app');
const socketFilePath = runningOnDocker ? pathInDocker : pathOnLocal;

if (existsSync(socketFilePath)) {
  unlinkSync(socketFilePath);
}

app.get('*', (req, res) => {
  res.send(`Socket power from ${socketFileName} 💪\n`);
})

app.listen(socketFilePath, () => {
  console.log(`Express app listening at ${socketFilePath}`)
});