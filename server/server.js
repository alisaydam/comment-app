import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { engine } from "express-handlebars";
import expressWs from "express-ws";
import { getComments, likeComment, newComment } from "./controller/comment.js";
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

//* Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
const wsInstance = expressWs(app);

//* View Engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const uri = process.env.MONGO_URI;
mongoose.connect(
  "mongodb+srv://romisrealestate:djNtVHhdHsboLIGJ@cluster0.1hcrvej.mongodb.net/commentsdb?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected");
});

app.use(express.static("public"));

app.get("/", getComments);
app.post("/", newComment);
app.put("/", likeComment);
app.post("/like", likeComment);

app.ws("/like", (ws, req) => {
  ws.on("message", function incoming(message) {
    console.log(message);
    ws.broadcast(message);
  });

  ws.broadcast = function broadcast(data) {
    wsInstance.getWss().clients.forEach(function each(client) {
      client.send(data);
    });
  };
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
