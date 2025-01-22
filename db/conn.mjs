//Imports
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//Global Config
const mongoURL = process.env.MONGO_URL;
const db = mongoose.connect;

//Connect to Mongoose
mongoose.connect(mongoURL);
mongoose.connection.once("open", () => {
  console.log("Connected to mongoose");
});
export default db;
