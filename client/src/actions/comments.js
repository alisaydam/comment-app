import * as api from "../api/index.js";

export const getComments = async () => {
  try {
    const data = await api.fetch();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createComment = async (comment) => {
  try {
    const data = await api.create(comment);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const likeComment = async (id) => {
  try {
    const { data } = await api.like(id);
  } catch (error) {
    console.log(error.message);
  }
};
