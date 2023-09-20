import axios from "axios";

const urlPosts = "http://localhost:8000/api/posts/";

export const getPosts = async (userToken) => {
  try {
    const response = await axios.get(`${urlPosts}`, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    const posts = response.data;
    return posts;
  } catch (e) {
    throw e.response;
  }
};

export const createPost = async (userToken, data) => {
  try {
    const response = await axios.post(`${urlPosts}`, data, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    const post = response.data;
    return post;
  } catch (e) {
    throw e.response;
  }
};

export const user_posts = async (userToken) => {
  try {
    const response = await axios.get(`${urlPosts}user_posts/`, {
      headers: { Authorization: `Token ${userToken}` },
    });
    const posts = response.data;
    return posts;
  } catch (e) {
    throw e.response;
  }
};
