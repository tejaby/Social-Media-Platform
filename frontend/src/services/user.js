// libraries
import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8000/api/";

export const createUserService = async (data) => {
  try {
    const response = await axios.post(`${USER_API_BASE_URL}user/`, data);
    return response.data;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err.response;
  }
};

export const updateUserService = async (user, data, access) => {
  try {
    const response = await axios.put(
      `${USER_API_BASE_URL}user/${user}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error updating user:", err);
    throw err.response;
  }
};

export const loginService = async (data) => {
  try {
    const response = await axios.post(`${USER_API_BASE_URL}token/login/`, data);
    return response.data;
  } catch (err) {
    console.error("Error logging:", err);
    throw err.response;
  }
};

export const logoutService = async (refresh) => {
  try {
    const response = await axios.post(
      `${USER_API_BASE_URL}token/logout/`,
      refresh
    );
    return response.data;
  } catch (err) {
    console.error("Error logging out:", err);
    throw err.response;
  }
};

export const refreshTokenService = async (refresh) => {
  try {
    const response = await axios.post(
      `${USER_API_BASE_URL}token/refresh/`,
      refresh
    );
    return response.data;
  } catch (err) {
    console.error("Error refreshing token:", err);
    throw err.response;
  }
};

export const verifyTokenService = async (access) => {
  try {
    const response = await axios.post(
      `${USER_API_BASE_URL}token/verify/`,
      access
    );
    return response.data;
  } catch (err) {
    console.error("Error verifying token:", err);
    throw err.response;
  }
};

export const listUsersService = async (data, access) => {
  try {
    let url = `${USER_API_BASE_URL}user/`;
    if (data) {
      url += `?username=${data}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error verifying token:", err);
    throw err.response;
  }
};
