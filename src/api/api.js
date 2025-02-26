import axios from "axios";

export const api = axios.create({
  baseURL: "https://e-pharmacy-back-t7uj.onrender.com/api",
  withCredentials: true,
});
