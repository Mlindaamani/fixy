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
const { MessageRouter } = require("./routes/messageRoutes");
const { customerRouter } = require("./routes/customerRoutes");
const { serviceProviderRouter } = require("./routes/serviceProviderRoutes");
const { authRouter } = require("./routes/authRoutes");
const { ConversationRouter } = require("./routes/ConversationRoutes");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Fixy Endpoints
app.use("/api/providers", serviceProviderRouter);
app.use("/api/customers", customerRouter);
app.use("/api/auth", authRouter);
app.use("/api/messages", MessageRouter);
app.use("/api/conversations", ConversationRouter);

server.listen(process.env.PORT, () => {
  startServer();
  connnectToMongoDb();
});

app.use(catchAllMiddleware);
