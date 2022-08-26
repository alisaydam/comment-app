import axios from "axios";

// const url = "http://localhost:3001";
const url = "https://realtime-commento.herokuapp.com";

export const fetch = () => axios.get(url);
export const create = (newComment) => axios.post(url, newComment);
export const createSub = (newComment) => axios.post(url + "/sub", newComment);
export const like = (payload) => axios.put(url, payload);
export const likeSub = (payload) => axios.patch(url, payload);
