import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    user: { avatar: "", comment: "", name: "" },
    content: { type: String, required: true, trim: true },
    upvotes: [],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
