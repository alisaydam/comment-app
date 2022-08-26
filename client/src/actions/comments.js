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
export const createSubComment = async (subComment) => {
  try {
    const data = await api.createSub(subComment);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const likeComment = async (payload) => {
  try {
    const { data } = await api.like(payload);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export const likeSubComment = async (payload) => {
  try {
    const { data } = await api.likeSub(payload);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

 
