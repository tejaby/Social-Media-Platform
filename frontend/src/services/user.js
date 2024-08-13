// libraries
import axios from "axios";

const USER_API_BASE_URL = "https://socialmedia-s0f6.onrender.com/api/user/";

export const createUserService = async (data) => {
  try {
    const response = await axios.post(`${USER_API_BASE_URL}`, data);
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const updateUserService = async (user, data, access) => {
  try {
    const response = await axios.put(`${USER_API_BASE_URL}${user}/`, data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const listUsersService = async (data, access) => {
  try {
    let url = `${USER_API_BASE_URL}list/`;
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
    throw err.response;
  }
};

export const changePasswordService = async (data, access) => {
  try {
    const response = await axios.put(
      `${USER_API_BASE_URL}change-password/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const userDeactivationService = async (user, access) => {
  try {
    const response = await axios.post(
      `${USER_API_BASE_URL}${user}/deactivate/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const userActivationService = async (user) => {
  try {
    const response = await axios.post(
      `${USER_API_BASE_URL}${user}/activate/`,
      {}
    );
    return response.data;
  } catch (err) {
    throw err.response;
  }
};
