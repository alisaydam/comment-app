import Comment from "../models/Comment.js";
import axios from "axios";
import moment from "moment";

export const getComments = async (req, res) => {
  console.log("get data");
  try {
    const comments = await fetchComments();
    res.status(201).json(comments);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};
export const newComment = async (req, res) => {
  console.log("post");
  const { firstname, lastname, avatar, content } = req.body;
  try {
    await Comment.create({
      content,
      user: {
        name: firstname + " " + lastname,
        avatar: avatar,
      },
    });
    const comments = await fetchComments();
    res.status(201).send(comments);
  } catch (err) {
    res.status(400).send(err);
  }
};
export const likeComment = async (req, res) => {
  const { name, id } = req.body;
  try {
    const comment = await Comment.findById(id);
    if (comment.upvotes.includes(name)) {
      const index = comment.upvotes.indexOf(name);
      comment.upvotes.splice(index, 1);
    } else {
      comment.upvotes.push(name);
    }
    await Comment.create(comment);
    res.status(201).send(comment);
    res.redirect("/");
  } catch (err) {
    res.status(400).send(err);
  }
};

async function getANewUser() {
  const {
    name,
    picture: { large },
  } = await axios.get("https://randomuser.me/api/").then((data) => {
    return data.data.results[0];
  });

  return {
    name,
    avatar: large,
  };
}

async function fetchComments() {
  const comments = await Comment.find().sort({ createdAt: -1 }).lean();
  comments.forEach((x) => {
    const fromNow = moment(x.createdAt).fromNow();
    return (x.fromNow = fromNow);
  });

  return comments;
}
