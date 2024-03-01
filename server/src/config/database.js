import mongoose from "mongoose";

const DB_URL = process.env.MONGO_DB_URL;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection to MongoDB established successfully."))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

export default mongoose;
