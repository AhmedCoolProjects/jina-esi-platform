import axios from "axios";

export default axios.create({
  baseURL: "https://jinaep-flask-api.herokuapp.com/jinaep/api/v1/",
  headers: {
    "Content-type": "application/json",
  },
});
