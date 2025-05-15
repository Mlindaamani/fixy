// Global Library
const cors = require("cors");
const morgan = require("morgan");
const { Portfolio } = require("./models/Portifolio");

// Utility
const { startServer } = require("./utils/helpers");
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
const ReviewRouter = require("./routes/ReviewRoutes");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

// Fixy Endpoints
app.use("/api/providers", ServiceProviderRouter);
app.use("/api/services", ServicesRouter);
app.use("/api/reviews", ReviewRouter);
app.use("/api/customers", CustomerRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/messages", MessageRouter);
app.use("/api/conversations", ConversationRouter);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    error: false,
    protocal: req.protocol,
    host: req.hostname,
    http_version: req.httpVersion,
    message: "API server is up and running",
  });
});
server.listen(process.env.PORT, () => {
  startServer();
  connnectToMongoDb();
});

app.use(catchAllMiddleware);
