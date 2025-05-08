const cron = require("node-cron");

const initCronJobs = (io, onlineUsers) => {
  cron.schedule("*/2 * * * *", () => {
    io.emit("system-status", {
      currentOnline: onlineUsers.size,
    });
  });

  cron.schedule("* * * * *", () => {
    const onlineUserIds = Array.from(onlineUsers.keys());
    if (onlineUserIds.length > 0) {
      io.emit("scheduled-notification", {
        message: "Socket server is up and running",
      });
    }

    onlineUserIds.forEach((userId) => {
      const socketId = onlineUsers.get(userId);
      const socket = io.sockets.sockets.get(socketId);
      if (!socket) {
        onlineUsers.delete(userId);
        io.emit("online-users", Array.from(onlineUsers.keys()));
      }
    });
  });
};

module.exports = { initCronJobs };
