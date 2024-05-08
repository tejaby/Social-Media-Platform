import axios from "axios";

const urlPosts = "http://localhost:8000/api/posts/";

const POST_API_BASE_URL = "http://localhost:8000/api/";

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

export const createPostService = async (data, access) => {
  try {
    const response = await axios.post(`${POST_API_BASE_URL}posts/`, data, {
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
    const response = await axios.get(`${POST_API_BASE_URL}posts/`, {
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

export const getPostService = async (access) => {
  try {
    const response = await axios.get(`${POST_API_BASE_URL}posts/`, {
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
