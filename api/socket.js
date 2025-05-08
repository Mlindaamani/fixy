const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { corsConfiguration } = require("./utils/functions");
const { initCronJobs } = require("./cronJobs");

const app = express();
const server = http.createServer(app);
const io = new Server(server, corsConfiguration);

const onlineUsers = new Map();

const getReceiverSocketId = (receiverId) => {
  return onlineUsers.get(receiverId);
};

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;

  if (userId !== "undefined") {
    onlineUsers.set(userId, socket.id);

    io.emit("join-chat", userId);

    io.emit("online-users", Array.from(onlineUsers.keys()));
  }

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    io.emit("online-users", Array.from(onlineUsers.keys()));
    io.emit("leave-chat", userId);
  });
});

// initCronJobs(io, onlineUsers);

module.exports = {
  app,
  server,
  io,
  express,
  getReceiverSocketId,
};
