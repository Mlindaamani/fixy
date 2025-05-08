const cron = require("node-cron");

const initCronJobs = (io, onlineUsers) => {
  console.log("Cron jobs initialized.");

  cron.schedule("*/2 * * * *", () => {
    io.emit("system-status", {
      currentOnline: onlineUsers.size,
    });
  });

  // run every minute
  cron.schedule("* * * * *", () => {
    console.log("Running scheduled notification task...");

    // Get all online user IDs
    const onlineUserIds = Array.from(onlineUsers.keys());
    console.log(`Online users: ${onlineUserIds.length}`);

    // Emit a notification to all connected clients
    if (onlineUserIds.length > 0) {
      io.emit("scheduled-notification", {
        message: "Remember to logout!",
      });
      console.log("Notification sent to all online users.");
    } else {
      console.log("No online users to notify.");
    }

    //  Clean up stale entries
    onlineUserIds.forEach((userId) => {
      const socketId = onlineUsers.get(userId);
      const socket = io.sockets.sockets.get(socketId);
      if (!socket) {
        console.log(`Removing stale user: ${userId}`);
        onlineUsers.delete(userId);
        io.emit("online-users", Array.from(onlineUsers.keys()));
      }
    });
  });
};

module.exports = { initCronJobs };
