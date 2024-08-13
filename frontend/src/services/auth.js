// libraries
import axios from "axios";

const AUTH_API_BASE_URL = "https://socialmedia-s0f6.onrender.com/api/token/";

export const loginService = async (data) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE_URL}login/`, data);
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const logoutService = async (refresh) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE_URL}logout/`, refresh);
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const refreshTokenService = async (refresh) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE_URL}refresh/`, refresh);
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const verifyTokenService = async (access) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE_URL}verify/`, access);
    return response.data;
  } catch (err) {
    throw err.response;
  }
};
