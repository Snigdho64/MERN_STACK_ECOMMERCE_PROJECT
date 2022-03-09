const mongoose = require('mongoose');

const env = require('dotenv');

env.config({ path: 'backend/config/config.env' });

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    if (connection) {
      const { host, port, name, db } = connection.connections[0];
      console.log(
        `Connected to ${name}\nMongoDB Port : ${port}\nMongoDB Host : ${host}`
      );
    }
    return connection;
  } catch (err) {
    console.error(`Connection To Database failed ${err.codeName}`);
    throw new Error(err);
  }
};

module.exports = connectDB;
