import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    user: { avatar: "", name: "" },
    content: { type: String, required: true, trim: true },
    upvotes: [],
    subComments: [
      {
        user: { avatar: "", name: "" },
        content: { type: String, required: true, trim: true },
        upvotes: [],
        createdAt: "",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
