const mongoose = require("mongoose");
const { MONGO_URI_DEV } = process.env;

const connnectToMongoDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI_DEV);
    console.log(
      `✔️  Success! Mongodb is running on port: ${conn.connection.port}`
    );
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { connnectToMongoDb };
