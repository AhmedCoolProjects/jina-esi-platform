import axios from "axios";

export default axios.create({
  baseURL: "https://jinaep-api.herokuapp.com/jinaep/api/v1",
  // baseURL: "http://localhost:8800/jinaep/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});
