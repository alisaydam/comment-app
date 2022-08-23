import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { engine } from 'express-handlebars';  
import {
  getComments,
  newComment,
  updateComment,
} from "./controller/comment.js";
dotenv.config();

const PORT = process.env.PORT || 3001;
 

const app = express(); 

//* Middlewares
app.use(express.json());


//* View Engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views'); 


const uri = process.env.MONGO_URI;
mongoose.connect("...", { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected");
});

app.use(express.static('public'))

app.get("/", getComments);
app.post("/", newComment);
app.put("/", updateComment);

 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
