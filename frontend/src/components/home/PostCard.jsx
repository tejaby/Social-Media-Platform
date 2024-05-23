// libraries
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

// services
import { loadMorePostsService } from "../../services/post";

// components
import PostImage from "../../components/post/image/PostImage";
import OptionsMenu from "../../components/modal/post/OptionsMenu";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";
import { PostContext } from "../../context/Post";

// hooks
import { useMorePostRequest } from "../../hooks/post/useMorePostRequest";
import UseSvgLoader from "../../hooks/useSvgLoader";

// utils
import { formatTimeAgo } from "../../utils/dateUtils";

// react
import { useContext, useEffect, useState } from "react";

function PostCard() {
  const { theme } = useContext(InterfaceContext);
  const { token, setViewUser } = useContext(UserContext);
  const {
    followedPosts,
    setFollowedPosts,
    nextPageFollowedPosts,
    setNextPageFollowedPosts,
  } = useContext(PostContext);

  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const handleUserPage = (user) => {
    setViewUser(user);
    navigate(`/profile/${user.username}`);
  };

  const { executeRequest, loading } = useMorePostRequest(loadMorePostsService);

  // Estado para rastrear cuál post tiene el menú de opciones abierto
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (postId) => {
    if (openDropdown === postId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(postId);
    }
  };

  useEffect(() => {
    if (!nextPageFollowedPosts || loading) return;

    if (inView) {
      executeRequest(
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
                  handleUserPage(post.author);
                }}
              />
              <span
                className="font-bold text-black dark:text-white cursor-pointer"
                onClick={() => {
                  handleUserPage(post.author);
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
                <OptionsMenu toggleDropdown={toggleDropdown} viewPost={post} />
              )}
            </div>
          </div>
          <div>
            <PostImage src={post.image} alt={post.author.username} />
            <div className="flex gap-1">
              <span className="font-semibold text-black dark:text-white">
                {post.author.username}
              </span>
              <p className="text-base text-black dark:text-white">
                {post.content}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <div className="flex gap-2">
              <div className="flex items-center">
                <button>
                  {theme === "light" ? (
                    <UseSvgLoader
                      name="heart"
                      options={{ width: "24px", height: "24px" }}
                    />
                  ) : (
                    <UseSvgLoader
                      name="heartDark"
                      options={{ width: "24px", height: "24px" }}
                    />
                  )}
                </button>
                <span className="text-black dark:text-white">{post.likes}</span>
              </div>
              <div className="flex items-center">
                <button>
                  {theme === "light" ? (
                    <UseSvgLoader
                      name="message-circle-2"
                      options={{ width: "24px", height: "24px" }}
                    />
                  ) : (
                    <UseSvgLoader
                      name="message-circle-2Dark"
                      options={{ width: "24px", height: "24px" }}
                    />
                  )}
                </button>
                <span className="text-black dark:text-white">3</span>
              </div>
            </div>
            <div className="flex items-center">
              <button>
                {theme === "light" ? (
                  <UseSvgLoader
                    name="chart-line"
                    options={{ width: "24px", height: "24px" }}
                  />
                ) : (
                  <UseSvgLoader
                    name="chart-lineDark"
                    options={{ width: "24px", height: "24px" }}
                  />
                )}
              </button>
              <span className="text-black dark:text-white">54</span>
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
