import axios from "axios";

export const sharedHttpClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000
});
