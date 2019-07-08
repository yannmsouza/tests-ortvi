import express from 'express';

const server = express();

server.use('/_healthcheck', (_req, res) => {
  res.status(200).json({ uptime: process.uptime() });
});

export default server;
