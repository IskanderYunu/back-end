import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.mjs";

// import conn.mjs so that I connect to my db
import db from "./db/conn.mjs";

const PORT = process.env.PORT || 5000;
const app = express();

// create connection to db using mongoose and db connection string from conn.mjs file
app.use(cors());
app.use(express.json());
//GLOBAL ERROR HANDLER after the routes
app.use((err, _req, res, next) => {
  res.status(500).send("There was an issue on the server :(");
});

//ROUTES
app.get("/", (req, res) => {
  res.send("MindFlix API");
});

app.use("/api/users", userRoutes);

//Starting the server
app.listen(PORT, () => {
  console.log(`Server is ALIVE! Port: ${PORT}`);
});
