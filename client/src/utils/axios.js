import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://mosala.onrender.com",
});

export default customFetch;
