// Global Library
const cors = require("cors");
const morgan = require("morgan");

// Utility
const { startServer } = require("./utils/functions");
const { catchAllMiddleware } = require("./middlewares/CatchAllMiddleware");
const { app, express, server } = require("./socket");
const { connnectToMongoDb } = require("./config/database");

// Routers
const { MessageRouter } = require("./routes/MessageRoutes");
const { CustomerRouter } = require("./routes/CustomerRoutes");
const { ServiceProviderRouter } = require("./routes/ServiceProviderRoutes");
const { AuthRouter } = require("./routes/AuthRoutes");
const { ConversationRouter } = require("./routes/ConversationRoutes");
const { ServicesRouter } = require("./routes/ServicesRoutes");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

// Fixy Endpoints
app.use("/api/providers", ServiceProviderRouter);
app.use("/api/services", ServicesRouter);
app.use("/api/customers", CustomerRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/messages", MessageRouter);
app.use("/api/conversations", ConversationRouter);

server.listen(process.env.PORT, () => {
  startServer();
  connnectToMongoDb();
});

app.use(catchAllMiddleware);
