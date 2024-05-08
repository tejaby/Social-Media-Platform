// libraries
import axios from "axios";

const urlUsers = "http://localhost:8000/api/users/";

export const createUser = async (data) => {
  try {
    const response = await axios.post(`${urlUsers}create_user/`, data);
    const createdUser = response.data;
    return createdUser;
  } catch (e) {
    throw e.response;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${urlUsers}login/`, data);
    const userLogged = response.data;
    return userLogged;
  } catch (e) {
    throw e.response;
  }
};

export const logoutUser = async (userToken) => {
  try {
    const response = await axios.post(
      `${urlUsers}logout/`,
      {},
      {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      }
    );
    const userLogout = response.data;
    return userLogout;
  } catch (e) {
    throw e.response;
  }
};

export const tokenValidation = async (userToken) => {
  try {
    const response = await axios.get(`${urlUsers}validate_token/`, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    const userLogged = response.data;
    return userLogged;
  } catch (e) {
    throw e.response;
  }
};

export const updateProfile = async (userToken, data) => {
  try {
    const response = await axios.patch(`${urlUsers}update_profile/`, data, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return response.data;
  } catch (e) {
    throw e.response;
  }
};

const USER_API_BASE_URL = "http://localhost:8000/api/";

export const createUserService = async (data) => {
  try {
    const response = await axios.post(`${USER_API_BASE_URL}api/`, data);
    return response.data;
  } catch (err) {
    console.error("Error creating user:", err);
    return err.response;
  }
};

export const updateUserService = async (user, data, access) => {
  try {
    const response = await axios.put(`${USER_API_BASE_URL}api/${user}/`, data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error updating user:", err);
    return err.response;
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
