import axios from "axios";

const urlPosts = "http://localhost:8000/api/posts/";

export const getProducts = async (userToken) => {
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
