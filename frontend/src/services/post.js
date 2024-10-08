// libraries
import axios from "axios";

const POST_API_BASE_URL = "https://socialmedia-s0f6.onrender.com/api/post/";

export const createPostService = async (data, access) => {
  try {
    const response = await axios.post(`${POST_API_BASE_URL}`, data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const listPostService = async (access) => {
  try {
    const response = await axios.get(`${POST_API_BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const listUserPostService = async (access) => {
  try {
    const response = await axios.get(`${POST_API_BASE_URL}user/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const listUserInactivePostService = async (access) => {
  try {
    const response = await axios.get(`${POST_API_BASE_URL}user/inactive/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const listPostsByUseridService = async (data, access) => {
  try {
    const response = await axios.get(`${POST_API_BASE_URL}user/${data}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
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

export const deletePostService = async (post_id, access) => {
  try {
    const response = await axios.delete(`${POST_API_BASE_URL}${post_id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const deactivatePostService = async (post_id, access) => {
  try {
    const response = await axios.delete(
      `${POST_API_BASE_URL}deactivate/${post_id}/`,
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

export const activatePostService = async (post_id, access) => {
  try {
    const response = await axios.put(
      `${POST_API_BASE_URL}activate/${post_id}/`,
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

export const listFollowedPostsService = async (access) => {
  try {
    const response = await axios.get(`${POST_API_BASE_URL}followed_posts/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const likePostService = async (post_id, access) => {
  try {
    const response = await axios.post(
      `${POST_API_BASE_URL}like/${post_id}/`,
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

export const dislikePostService = async (post_id, access) => {
  try {
    const response = await axios.post(
      `${POST_API_BASE_URL}dislike/${post_id}/`,
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
