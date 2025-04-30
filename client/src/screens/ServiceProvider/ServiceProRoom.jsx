import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { formatDate } from "../../utils/functions";
import LoadingSpinner from "../../components/Spinner";
import { messageStore } from "../../stores/messageStore";
import { useSocket } from "../../stores/socketStore";
import { useAuthStore } from "../../stores/authStore";
import { useUtilsStore } from "../../stores/utilsStore";

const ServiceProRoom = () => {
  const lastMessageRef = useRef();
  const [message, setMessage] = useState("");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);
  const { connectToSocketServer, onlineUsers, disconnect } = useSocket();
  const { user } = useAuthStore();
  const { isSidebarCollapsed } = useUtilsStore();
  const {
    messages,
    sendNewMessage,
    users,
    getChatUsers,
    getMessages,
    selectedUser,
    setSelectedUser,
    isLoading: messagesLoading,
  } = messageStore();

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  useEffect(() => {
    if (lastMessageRef.current && messages) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendNewMessage(message);
      setMessage("");
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    getMessages();
    setIsChatSidebarOpen(false);
  };

  useEffect(() => {
    getChatUsers();
    connectToSocketServer();
    return () => disconnect();
  }, [getChatUsers, connectToSocketServer, disconnect]);

  if (messagesLoading && !selectedUser) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-full bg-gray-100">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-16 left-0 p-3 bg-indigo-600 text-white z-20"
        onClick={() => setIsChatSidebarOpen(!isChatSidebarOpen)}
        aria-label={
          isChatSidebarOpen ? "Close chat sidebar" : "Open chat sidebar"
        }
      >
        <i
          className={`fa-solid ${isChatSidebarOpen ? "fa-times" : "fa-bars"}`}
        ></i>
      </button>

      {/* Chat Sidebar */}
      <div
        className={`fixed top-16 ${
          isSidebarCollapsed ? "left-20" : "left-64"
        } w-80 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 p-4 flex flex-col z-10 ${
          isChatSidebarOpen ? "block" : "hidden md:block"
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg font-semibold text-gray-800">Chats</h5>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={() => setShowOnlineOnly(!showOnlineOnly)}
              className="sr-only peer"
              aria-label="Toggle online users only"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-400"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            <span className="ml-2 text-sm text-gray-600">
              {showOnlineOnly ? "Online" : "All"}
            </span>
          </label>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <p className="text-gray-500 text-center">No users found.</p>
          ) : (
            filteredUsers.map((user) => {
              const usernameInitial = user.username.charAt(0).toUpperCase();
              const isOnline = onlineUsers.includes(user._id);

              return (
                <div
                  key={user._id}
                  onClick={() => handleUserClick(user)}
                  className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                    selectedUser?._id === user._id
                      ? "bg-indigo-100 text-indigo-800 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                  role="button"
                  aria-label={`Chat with ${user.username}`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleUserClick(user)}
                >
                  <div className="relative mr-3">
                    <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center text-lg">
                      {usernameInitial}
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800">
                      {user.username}
                    </span>
                    <span
                      className={`text-xs ${
                        isOnline ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`ml-80 flex-1 flex flex-col bg-gray-100 transition-all duration-300 ${
          isSidebarCollapsed
            ? "md:ml-[calc(5rem+20rem)]"
            : "md:ml-[calc(16rem+20rem)]"
        }`}
      >
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto">
          {!selectedUser ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <h4 className="text-lg font-medium">
                  Select a chat to start messaging
                </h4>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <h4 className="text-lg font-medium">No messages yet</h4>
                <p className="text-sm">Start the conversation!</p>
              </div>
            </div>
          ) : (
            messages.map(({ _id: id, senderId, message, created_at }) => (
              <div
                key={id}
                ref={lastMessageRef}
                className={`mb-4 flex ${
                  senderId === user?.id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs sm:max-w-md p-3 rounded-lg ${
                    senderId === user?.id
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium">
                      {senderId === user?.id ? "You" : selectedUser?.username}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      {formatDate(created_at)}
                    </span>
                  </div>
                  <p className="text-sm">{message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        {selectedUser && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <form onSubmit={sendMessage} className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
                aria-label="Type a message"
              />
              <button
                type="submit"
                className={`px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none ${
                  !message.trim() ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!message.trim()}
                aria-label="Send message"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default ServiceProRoom;
