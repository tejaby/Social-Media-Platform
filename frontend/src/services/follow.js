// libraries
import axios from "axios";

const FOLLOW_API_BASE_URL = "https://socialmedia-s0f6.onrender.com/api/follow/";

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

export const listFollowersService = async (user, access) => {
  try {
    const response = await axios.get(
      `${FOLLOW_API_BASE_URL}followers/${user}/`,
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

export const listFollowingService = async (user, access) => {
  try {
    const response = await axios.get(
      `${FOLLOW_API_BASE_URL}following/${user}/`,
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
