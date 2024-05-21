// libraries
import axios from "axios";

const POST_API_BASE_URL = "http://localhost:8000/api/";

export const createPostService = async (data, access) => {
  try {
    const response = await axios.post(`${POST_API_BASE_URL}post/`, data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error creating post:", err);
    throw err.response;
  }
};

export const listPostService = async (access) => {
  try {
    const response = await axios.get(`${POST_API_BASE_URL}post/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error listing posts:", err);
    throw err.response;
  }
};

export const listUserPostService = async (access) => {
  try {
    const response = await axios.get(`${POST_API_BASE_URL}post/user/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error getting post:", err);
    throw err.response;
  }
};

export const listPostsByUseridService = async (data, access) => {
  try {
    const response = await axios.get(`${POST_API_BASE_URL}post/user/${data}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error getting post:", err);
    throw err.response;
  }
};

export const loadMorePostsService = async (nextPageUrl, access) => {
  try {
    const response = await axios.get(nextPageUrl, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response;
  }
};
