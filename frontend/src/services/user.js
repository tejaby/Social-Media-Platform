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
    const response = await axios.patch(`${urlUsers}`, data, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
