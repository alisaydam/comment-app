import {
  createComment,
  getComments,
  likeComment,
  likeSubComment,
} from "./actions/comments";
import "./App.css";
import Form from "./components/Form";
import Comment from "./components/Comment";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState("");
  const [comments, setComments] = useState(0);
  useEffect(() => {
    getComments().then((res) => {
      setComments(res.data);
    });
    async function getANewUser() {
      const {
        name: { first: firstName, last: lastName },
        picture: { large },
      } = await axios.get("https://randomuser.me/api/").then((data) => {
        return data.data.results[0];
      });

      return {
        firstName,
        lastName,
        avatar: large,
      };
    }

    getANewUser().then((data) => {
      setUser(data);
    });
  }, []);

  const sock = new WebSocket("ws://localhost:5000/like");

  sock.onopen = function () {
    console.log("open");
  };

  sock.onmessage = function (e) {
    const message = JSON.parse(e.data);
    setComments(message.data);
  };

  function like(e, data) {
    likeComment(data).then((data) => {
      sock.send(JSON.stringify({ data }));
    });
  }
  function likeSub(e, data) {
    const { name, id, comment } = data;
    const subs = comment.subComments;
    subs.forEach((item) => {
      if (item._id === id) {
        item.upvotes.includes(name)
          ? item.upvotes.splice(item.upvotes.indexOf(name), 1)
          : item.upvotes.push(name);
        return item;
      } else {
        return item;
      }
    });
    comment.subComments = subs;

    likeSubComment(comment).then((data) => {
      sock.send(JSON.stringify({ data }));
    });
  }

  function handlePost(e, data) {
    createComment(data).then((data) => {
      setComments(data.data);
    });
  }

  return (
    <div className="container">
      <Form handlePost={handlePost} user={user} />
      <hr />
      {comments &&
        comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              comment={comment}
              user={user}
              like={like}
              likeSub={likeSub}
            />
          );
        })}
    </div>
  );
}

export default App;
