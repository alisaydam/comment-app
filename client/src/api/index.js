import axios from "axios";

const url = "http://localhost:3001";

export const fetch = () => axios.get(url);
export const create = (newComment) => axios.post(url, newComment);
export const like = (id, name) => axios.put(`${url}/${id}/${name}`);
