// libraries
import axios from "axios";

const FOLLOW_API_BASE_URL = "http://localhost:8000/api/follow/";

export const followUserService = async (user, access) => {
  try {
    const response = await axios.post(
      `${FOLLOW_API_BASE_URL}follow/${user}/`,
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

export const unfollowUserService = async (user, access) => {
  try {
    const response = await axios.post(
      `${FOLLOW_API_BASE_URL}unfollow/${user}/`,
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

export const verifyUserFollow = async (user, access) => {
  try {
    const response = await axios.get(
      `${FOLLOW_API_BASE_URL}is_following/${user}/`,
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

export const listFollowersService = async (access) => {
  try {
    const response = await axios.get(`${FOLLOW_API_BASE_URL}followers/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const listFollowingService = async (access) => {
  try {
    const response = await axios.get(`${FOLLOW_API_BASE_URL}following/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response;
  }
};
