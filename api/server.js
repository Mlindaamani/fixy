require("./models/ServiceProvider");
require("./models/User");
require("./models/Customer");
require("./models/Service");
require("./models/ServiceCategory");
require("./models/Review");
require("./models/Message");
require("./models/Portifolio");
require("./models/Conversation");
const { catchAllMiddleware } = require("./middlewares/catchAllMiddleware");
const { app, express, server } = require("./socket");
const cors = require("cors");
const morgan = require("morgan");
const { startServer } = require("./utils/functions");
const { connnectToMongoDb } = require("./config/database");
const { serviceProviderRouter } = require("./routes/serviceProviderRoutes");
const { authRouter } = require("./routes/authRoutes");
const { messageRouter } = require("./routes/messageRoutes");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Fixy Endpoints
app.use("/api/providers", serviceProviderRouter);
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

server.listen(process.env.PORT, () => {
  startServer();
  connnectToMongoDb();
});

app.use(catchAllMiddleware);
