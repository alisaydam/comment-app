import { useEffect, useState } from "react";
import { createSubComment } from "../actions/comments";
import Form from "./Form";
import moment from "moment";

export default function Comment({ comment, user, like, likeSub }) {
  const [showSubForm, setShowSubForm] = useState(false);
  const [subComments, setSubComments] = useState(comment.subComments);

  function handlePost(e, data) {
    let date = new Date();
    date.toISOString();
    const subs = {
      _id: comment._id,
      subComments: [
        ...subComments,
        {
          user: {
            name: data.firstName + " " + data.lastName,
            avatar: data.avatar,
          },
          content: data.content,
          createdAt: date,
        },
      ],
    };
    createSubComment(subs).then((data) => {
      setSubComments(data.data);
    });
  }

  useEffect(() => {
    setSubComments(addFromNow(comment.subComments));
  }, [comment]);

  function addFromNow(arr) {
    arr.forEach((x) => {
      const fromNow = moment(x.createdAt).fromNow();
      return (x.fromNow = fromNow);
    });
    return arr;
  }

  return (
    <>
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
            <button
              class="upvote"
              onClick={(e) =>
                like(e, {
                  id: comment._id,
                  name: user.firstName + " " + user.lastName,
                })
              }
            >
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
      <div style={{ margin: "0 0 0 40px" }}>
        {subComments
          .map((sub, i) => {
            return (
              <div class="comment-card">
                <img
                  src={sub.user.avatar}
                  width="30px"
                  height="30"
                  alt="profile"
                />
                <div class="comment">
                  <p class="name">
                    {sub.user.name}
                    <span class="time">・{sub.fromNow} </span>
                  </p>
                  <p class="comment-text"> {sub.content}</p>
                  <div class="buttons-row">
                    <button
                      class="upvote"
                      onClick={(e) =>
                        likeSub(e, {
                          comment: comment,
                          id: sub._id,
                          name: user.firstName + " " + user.lastName,
                        })
                      }
                    >
                      <span class="uparrow">▲</span> Upvote
                      <span class="likes">
                        {sub.upvotes.length === 0 ? "" : sub.upvotes.length}
                      </span>
                    </button>
                    <button class="upvote">Reply</button>
                  </div>
                </div>
              </div>
            );
          })
          .reverse()}
      </div>
    </>
  );
}
