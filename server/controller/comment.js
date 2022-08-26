import Comment from "../models/Comment.js";
import moment from "moment";

export const getComments = async (req, res) => {
  try {
    const comments = await fetchComments();
    res.status(201).json(comments);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};
export const newComment = async (req, res) => {
  const { firstName, lastName, avatar, content } = req.body;
  try {
    await Comment.create({
      content,
      user: {
        name: firstName + " " + lastName,
        avatar: avatar,
      },
    });
    const comments = await fetchComments();
    res.status(201).send(comments);
  } catch (err) {
    res.status(400).send(err);
  }
};
export const newSubComment = async (req, res) => {
  const { subComments, _id } = req.body;
  try {
    await Comment.findByIdAndUpdate(_id, {
      subComments: subComments,
    });
    const comment = await Comment.findById(_id).lean();
    const subs = addFromNow(comment.subComments);
    res.status(201).send(subs);
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
    const comments = await fetchComments();
    res.status(201).send(comments);
  } catch (err) {
    res.status(400).send(err);
  }
};
export const likeSubComment = async (req, res) => {
  delete req.body.fromNow;
  try {
    await Comment.findByIdAndUpdate(req.body._id, req.body);
    const comments = await fetchComments();
    res.status(201).send(comments);
  } catch (err) {
    (err);
    res.status(400).send(err);
  }
};

async function fetchComments() {
  const comments = await Comment.find().sort({ createdAt: -1 }).lean();
  return addFromNow(comments);
}

function addFromNow(arr) {
  arr.forEach((x) => {
    const fromNow = moment(x.createdAt).fromNow();
    return (x.fromNow = fromNow);
  });
  return arr;
}
