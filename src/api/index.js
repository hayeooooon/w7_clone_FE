import axios from "axios";

const api = axios.create({
  baseURL: "http://15.164.218.19",
});
api.defaults.headers.common["Authorization"] = sessionStorage.getItem("token");

export const apis = {};
