const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { app } = require("./app");

dotenv.config();

const start = async () => {
  if (!process.env.DATABASE) throw new Error("MONGO_URI must be defined");
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Successfully connected to db");
  } catch (error) {
    console.log(error);
  }
};

start();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
