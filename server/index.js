import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactRoute.js";
import setUpSocket from "./socket.js";
import messagesRoutes from "./routes/MessageRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploadS/profiles", express.static("uploadS/profiles"))
app.use("/uploadS/files", express.static("uploadS/files"))


app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/contacts",contactRoutes)
app.use("/api/messages",messagesRoutes)

const server = app.listen(port, () => {
  console.log("server is running");
});

setUpSocket(server)
mongoose
  .connect(databaseURL)
  .then(() => console.log("DB Connection successfull"))
  .catch((err) => console.log(err.message));
