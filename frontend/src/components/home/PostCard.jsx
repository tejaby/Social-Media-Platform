// libraries
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

// services
import {
  loadMorePostsService,
  likePostService,
  dislikePostService,
} from "../../services/post";

// components
import PostImage from "../../components/post/image/PostImage";
import OptionsMenu from "../dropdown/post/OptionsMenu";
import UseSvgLoader from "../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";
import { PostContext } from "../../context/Post";

// hooks
import { useMorePostRequest } from "../../hooks/post/useMorePostRequest";

// utils
import { formatTimeAgo } from "../../utils/dateUtils";

// react
import { useContext, useEffect, useState } from "react";

function PostCard() {
  const { theme } = useContext(InterfaceContext);
  const { token, user } = useContext(UserContext);
  const {
    followedPosts,
    setFollowedPosts,
    nextPageFollowedPosts,
    setNextPageFollowedPosts,
  } = useContext(PostContext);

  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const handleUserPage = (username) => {
    navigate(`/profile/${username}`);
  };

  const { executeRequest, loading } = useMorePostRequest();

  // Estado para rastrear cuál post tiene el menú de opciones abierto
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (postId) => {
    if (openDropdown === postId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(postId);
    }
  };

  const handleLike = async (postId) => {
    if (token) {
      try {
        await likePostService(postId, token.access);
        setFollowedPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, likes: [...post.likes, user] }
              : post
          )
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDislike = async (postId) => {
    if (token) {
      try {
        await dislikePostService(postId, token.access);
        setFollowedPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: post.likes.filter((like) => like.id !== user.id),
                }
              : post
          )
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (!nextPageFollowedPosts || loading) return;

    if (inView) {
      executeRequest(
        loadMorePostsService,
        followedPosts,
        setFollowedPosts,
        setNextPageFollowedPosts,
        nextPageFollowedPosts,
        token.access
      );
    }
  }, [inView]);

  return (
    <div className="flex flex-col gap-2">
      {followedPosts.map((post, index) => (
        <div
          key={post.id}
          className="flex flex-col border-b-2 border-colorHover dark:border-darkColorHover"
        >
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-1">
              <img
                src={`${
                  post.author.profile_picture
                    ? post.author.profile_picture
                    : "/user-defect.png"
                }`}
                alt=""
                className="w-10 h-10 object-cover rounded-full cursor-pointer"
                onClick={() => {
                  handleUserPage(post.author.username);
                }}
              />
              <span
                className="font-bold text-black dark:text-white cursor-pointer"
                onClick={() => {
                  handleUserPage(post.author.username);
                }}
              >
                {post.author.username}
              </span>
              <span className="text-secondaryText dark:text-secondaryTextDark">
                {formatTimeAgo(new Date(post.created_at))}
              </span>
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  toggleDropdown(post.id);
                }}
              >
                {theme === "light" ? (
                  <UseSvgLoader
                    name="dots"
                    options={{ width: "32px", height: "32px" }}
                  />
                ) : (
                  <UseSvgLoader
                    name="dotsDark"
                    options={{ width: "32px", height: "32px" }}
                  />
                )}
              </button>
              {openDropdown === post.id && (
                <OptionsMenu
                  toggleDropdown={toggleDropdown}
                  viewPost={post}
                  updateGlobalModal={false}
                />
              )}
            </div>
          </div>
          <div>
            <PostImage src={post.image} alt={post.author.username} />
            <div className="flex gap-1">
              <span
                className="font-semibold text-black dark:text-white cursor-pointer"
                onClick={() => {
                  handleUserPage(post.author.username);
                }}
              >
                {post.author.username}
              </span>
              <p className="text-base text-black dark:text-white">
                {post.content}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                {!post.likes.some((like) => like.id === user.id) ? (
                  <button
                    onClick={() => {
                      handleLike(post.id);
                    }}
                  >
                    <UseSvgLoader
                      name="heart"
                      options={{ width: "24px", height: "24px" }}
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleDislike(post.id);
                    }}
                  >
                    <UseSvgLoader
                      name="heart-filled"
                      options={{ width: "24px", height: "24px" }}
                    />
                  </button>
                )}
                <span className="text-black dark:text-white">
                  {post.likes.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button>
                  <UseSvgLoader
                    name="message-circle-2"
                    options={{ width: "24px", height: "24px" }}
                  />
                </button>
                <span className="text-black dark:text-white">0</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button>
                <UseSvgLoader
                  name="chart-line"
                  options={{ width: "24px", height: "24px" }}
                />
              </button>
              <span className="text-black dark:text-white">0</span>
            </div>
          </div>
          {index === followedPosts.length - 1 && <div ref={ref} />}
        </div>
      ))}
      {nextPageFollowedPosts && (
        <div className="flex justify-center text-black dark:text-white">
          Loading...
        </div>
      )}
    </div>
  );
}

export default PostCard;
