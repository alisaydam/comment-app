import { useEffect, useState } from "react";
import Form from "./Form";

export default function Comment({ comment, user }) {
  const [showSubForm, setShowSubForm] = useState(false);
  function handlePost(e, data) {
    console.log("gege");
    console.log("data", data);
  }

  return (
    <div>
      <div class="comment-card">
        <img
          src={comment.user?.avatar}
          width="30px"
          height="30"
          alt="profile"
        />
        <div class="comment">
          <p class="name">
            {comment.user?.name}
            <span class="time">・{comment.fromNow} </span>
          </p>
          <p class="comment-text"> {comment.content}</p>
          <div class="buttons-row">
            <button class="upvote">
              <span class="uparrow">▲</span> Upvote
              <span class="likes">{comment.upvotes?.length}</span>
            </button>
            <button class="upvote" onClick={() => setShowSubForm(!showSubForm)}>
              Reply
            </button>
          </div>
        </div>
      </div>
      {showSubForm && (
        <div style={{ margin: "0 0 0 40px" }}>
          <Form handlePost={handlePost} user={user} />
        </div>
      )}
    </div>
  );
}
