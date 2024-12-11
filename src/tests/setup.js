const connectDB = require("../config/db");
const mongoose = require("mongoose");

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collection of collections) {
    await mongoose.connection.collections[collection].deleteMany();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
