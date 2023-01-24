import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:5008";

export function signup(body) {
  const response = axios.post(`${REACT_APP_API_URL}/sign-up`, body);
  return response;
}

export function signin(body) {
  const response = axios.post(`${REACT_APP_API_URL}/sign-in`, body).catch((error) => {
    return error.response;
  });
  return response;
}
