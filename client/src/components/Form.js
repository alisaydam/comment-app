import { useState } from "react";

export default function Form({ handlePost, user }) {
  const [formData, setFormData] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    handlePost(event, formData);
    setFormData((prevState) => ({ ...prevState, content: "" }));
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData(() => {
      return {
        ...user,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  return (
    <form onSubmit={handleSubmit} class="comment-input">
      <img
        class={!user.avatar && "skeleton"}
        src={user.avatar ? user.avatar : "placeholder.png"}
        title={user.firstName + " " + user.lastName}
        alt="profile"
      />
      <input
        type="text"
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="What are your thoughts?"
      />
      <button class="sub-button">Commit</button>
    </form>
  );
}
