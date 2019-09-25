import axios from "axios";

export const sharedHttpClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
