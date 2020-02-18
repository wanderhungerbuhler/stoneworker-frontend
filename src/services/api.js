import axios from "axios";

const api = axios.create({
  baseURL: "https://stoneworker-api.herokuapp.com/api"
});

export default api;
