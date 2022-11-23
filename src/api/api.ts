import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "4ad42b8b-c3a7-4052-a33a-e542dfbbe48f",
  },
});
