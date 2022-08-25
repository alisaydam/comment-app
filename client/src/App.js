import { getComments } from "./actions/comments";
import "./App.css";
import Form from "./components/Form";
import Comment from "./components/Comment";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState("");
  const [comments, setComments] = useState(0);

  const dede = "dwdswa";
  useEffect(() => {
    getComments()
      .then((res) => {
        setComments(res.data);
      })
      .then((data) => {
        console.log(comments);
      });
    console.log(Array.isArray(comments));
  }, []);

  // const sock = new WebSocket("ws://localhost:3001/like");

  // sock.onopen = function () {
  //   console.log("open");
  // };

  // sock.onmessage = function (e) {
  //   const message = JSON.parse(e.data);
  //   const dataToSend = JSON.stringify(message);
  //   //* set comments on data incoming
  //   console.log("Data that comes from ws", dataToSend);
  // };
  // const data = {
  //   name: "Ali",
  // };

  // function wsSend() {
  //   sock.send(JSON.stringify(data));
  // }

  useEffect(() => {
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
    console.log(user);
  }, []);

  function handlePost(e, data) {
    console.log("gege");
    console.log("data", data);
  }

  return (
    <div className="container">
      <Form handlePost={handlePost} user={user} />
      <hr />
      {comments &&
        comments.map((comment) => {
          return <Comment comment={comment} user={user} />;
        })}
    </div>
  );
}

export default App;
