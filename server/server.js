import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import { engine } from "express-handlebars";
import {
  getComments,
  likeComment,
  newComment,
  newSubComment,
  likeSubComment,
} from "./controller/comment.js";
dotenv.config();
import { Server } from "socket.io";

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);

//* Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

//* View Engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected");
});

app.use(express.static("public"));

app.get("/", getComments);
app.post("/", newComment);
app.post("/sub", newSubComment);
app.put("/", likeComment);
app.patch("/", likeSubComment);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    console.log("meeasge");
    io.emit("receive_message", data);
  });
});

server.listen(PORT, () => {
  console.log("SERVER RUNNING");
});
