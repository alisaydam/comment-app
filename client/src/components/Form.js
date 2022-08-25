import { useEffect, useState } from "react";
import axios from "axios";
import { createComment } from "../actions/comments";

export default function Form({ handlePost, user }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    createComment(formData).then((data) => {
      handlePost(event, data);
    });
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  useEffect(() => {
    setFormData(user);
  }, []);

  return (
    <form onSubmit={handleSubmit} class="comment-input">
      {formData.avata}
      <img
        src={formData?.avatar}
        title={formData?.firstName + " " + formData?.lastName}
        alt="profile"
      />
      <input
        type="text"
        value={formData?.first}
        name="firstname"
        onChange={handleChange}
        hidden
      />
      <input
        type="text"
        value={formData?.last}
        name="lastname"
        onChange={handleChange}
        hidden
      />
      <input
        type="text"
        value={formData?.avatar}
        name="avatar"
        onChange={handleChange}
        hidden
      />
      <input
        type="text"
        name="content"
        onChange={handleChange}
        placeholder="What are your thoughts?"
      />
      <button class="sub-button">Commit</button>
    </form>
  );
}
