// Global Library
const cors = require("cors");
const morgan = require("morgan");

// Models
require("./models/ServiceProvider");
require("./models/User");
require("./models/Customer");
require("./models/Service");
require("./models/ServiceCategory");
require("./models/Review");
require("./models/Message");
require("./models/Portifolio");
require("./models/Conversation");

// Utility
const { startServer } = require("./utils/functions");
const { catchAllMiddleware } = require("./middlewares/catchAllMiddleware");
const { app, express, server } = require("./socket");
const { connnectToMongoDb } = require("./config/database");

// Routers
const { messageRouter } = require("./routes/messageRoutes");
const { customerRouter } = require("./routes/customerRoutes");
const { serviceProviderRouter } = require("./routes/serviceProviderRoutes");
const { authRouter } = require("./routes/authRoutes");
const { ciConversationRouter } = require("./routes/ci/ConversationRoutes");
const { ciMessageRouter } = require("./routes/ci/MessageRoutes");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Fixy Endpoints
app.use("/api/providers", serviceProviderRouter);
app.use("/api/customers", customerRouter);
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

// Test realtime model
app.use("/api/ci/conversations", ciConversationRouter);
app.use("/api/ci/messages", ciMessageRouter);

server.listen(process.env.PORT, () => {
  startServer();
  connnectToMongoDb();
});

app.use(catchAllMiddleware);
