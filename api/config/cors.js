const corsConfiguration = {
  cors: {
    origin: `http://localhost:${process.env.CLIENT_APP_PORT}`,
    methods: ["GET", "POST"],
  },
};
