// libraries
import { useNavigate, useLocation } from "react-router-dom";

// libraries
import { likePostService, dislikePostService } from "../../../services/post";

// components
import OptionsMenu from "../../dropdown/post/OptionsMenu";
import UseSvgLoader from "../../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";
import { PostContext } from "../../../context/Post";

// hooks
import useModal from "../../../hooks/interface/useModal";

// utils
import { formatTimeAgo } from "../../../utils/dateUtils";

// react
import { useContext, useState } from "react";

function ViewPostModal() {
  const { theme, showViewPost, setShowViewPost } = useContext(InterfaceContext);

  const { user, token } = useContext(UserContext);

  const { viewPost, setViewPost, setPosts, setUserPosts, setCurrentPosts } =
    useContext(PostContext);

  const { toggleModal } = useModal();

  const navigate = useNavigate();

  const location = useLocation();

  // Estado para mostrar u ocultar el menú de opciones abierto
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDropdownMobile, setOpenDropdownMobile] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const toggleDropdownMobile = () => {
    setOpenDropdownMobile(!openDropdownMobile);
  };

  const handleUserPage = (username) => {
    navigate(`/profile/${username}`);
    toggleModal(setShowViewPost, showViewPost);
  };

  const handleLike = async (postId) => {
    if (token) {
      try {
        await likePostService(postId, token.access);
        setViewPost((prevPost) =>
          prevPost.id === postId
            ? { ...prevPost, likes: [...prevPost.likes, user] }
            : prevPost
        );
        if (location.pathname === "/explore") {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId
                ? { ...post, likes: [...post.likes, user] }
                : post
            )
          );
        } else if (location.pathname === "/profile") {
          setUserPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId
                ? { ...post, likes: [...post.likes, user] }
                : post
            )
          );
        } else {
          setCurrentPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId
                ? { ...post, likes: [...post.likes, user] }
                : post
            )
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDislike = async (postId) => {
    if (token) {
      try {
        await dislikePostService(postId, token.access);
        setViewPost((prevPost) =>
          prevPost.id === postId
            ? {
                ...prevPost,
                likes: prevPost.likes.filter((like) => like.id !== user.id),
              }
            : prevPost
        );
        if (location.pathname === "/explore") {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    likes: post.likes.filter((like) => like.id !== user.id),
                  }
                : post
            )
          );
        } else if (location.pathname === "/profile") {
          setUserPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    likes: [
                      ...post.likes.filter((like) => like.id !== user.id),
                    ],
                  }
                : post
            )
          );
        } else {
          setCurrentPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    likes: [
                      ...post.likes.filter((like) => like.id !== user.id),
                    ],
                  }
                : post
            )
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className="absolute w-full top-0 lg:hidden">
        <div className="relative flex justify-between p-4">
          <button
            onClick={() => {
              toggleModal(setShowViewPost, showViewPost);
            }}
          >
            {theme === "light" ? (
              <UseSvgLoader
                name="x"
                options={{ width: "32px", height: "32px" }}
              />
            ) : (
              <UseSvgLoader
                name="xDark"
                options={{ width: "32px", height: "32px" }}
              />
            )}
          </button>
          <button onClick={toggleDropdownMobile}>
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
        </div>
        <div className="relative lg:hidden">
          {openDropdownMobile && (
            <OptionsMenu
              toggleDropdown={toggleDropdownMobile}
              viewPost={viewPost}
              updateGlobalModal={true}
            />
          )}
        </div>
      </div>

      <div className="lg:hidden w-full h-full xs:max-w-xl xs:h-full flex flex-col justify-between bg-white dark:bg-DarkColor">
        <div className="grow overflow-hidden">
          <img
            src={viewPost.image ? viewPost.image : ""}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col p-2">
          <div className="flex gap-2 items-center">
            <span
              className="font-semibold text-black dark:text-white cursor-pointer"
              onClick={() => {
                handleUserPage(viewPost.author.username);
              }}
            >
              {viewPost.author.username}
            </span>
            <span className="text-secondaryText dark:text-secondaryTextDark">
              {formatTimeAgo(new Date(viewPost.created_at))}
            </span>
          </div>
          <p className="text-sm xs:text-base text-justify text-black dark:text-white">
            {viewPost.content}
          </p>
        </div>
        <div className="flex justify-evenly items-center p-2 border-t-2 border-colorHover dark:border-darkColorHover">
          <div className="flex items-center gap-1">
            {!viewPost.likes.some((like) => like.id === user.id) ? (
              <button
                onClick={() => {
                  handleLike(viewPost.id);
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
                  handleDislike(viewPost.id);
                }}
              >
                <UseSvgLoader
                  name="heart-filled"
                  options={{ width: "24px", height: "24px" }}
                />
              </button>
            )}
            <span className="text-black dark:text-white">
              {viewPost.likes.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button>
              <UseSvgLoader
                name="message-circle-2"
                options={{ width: "24px", height: "24px" }}
              />
            </button>
            <span className="text-black dark:text-white">3</span>
          </div>
          <div className="flex items-center gap-1">
            <button>
              <UseSvgLoader
                name="chart-line"
                options={{ width: "24px", height: "24px" }}
              />
            </button>
            <span className="text-black dark:text-white">54</span>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:justify-between w-full h-full">
        <div className="xl:block"></div>
        <div className="max-w-2xl xl:max-w-3xl h-full bg-white dark:bg-DarkColor">
          <img
            src={viewPost.image}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-80 h-full flex flex-col bg-white dark:bg-DarkColor border-l-2 border-colorHover dark:border-darkColorHover">
          <div className="basis-1/10 flex justify-between p-2 border-b-2 border-colorHover dark:border-darkColorHover">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={
                    viewPost.author.profile_picture
                      ? viewPost.author.profile_picture
                      : "/user-defect.png"
                  }
                  alt=""
                  className="w-full h-full object-cover"
                  onClick={() => {
                    handleUserPage(viewPost.author.username);
                  }}
                />
              </div>
              <div
                className="flex flex-col items-start"
                onClick={() => {
                  handleUserPage(viewPost.author.username);
                }}
              >
                <span className="font-semibold text-dark dark:text-white">{`${viewPost.author.first_name} ${viewPost.author.last_name}`}</span>
                <span className="text-secondaryText dark:text-secondaryTextDark">
                  @{viewPost.author.username}
                </span>
              </div>
            </div>
            <div>
              <button onClick={toggleDropdown}>
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
            </div>
          </div>
          <div className="relative">
            {openDropdown && (
              <OptionsMenu
                toggleDropdown={toggleDropdown}
                viewPost={viewPost}
                updateGlobalModal={true}
              />
            )}
          </div>
          <div className="basis-30 flex flex-col gap-2 items-start justify-center p-2 border-b-2 border-colorHover dark:border-darkColorHover">
            <p className="text-black dark:text-white text-justify">
              {viewPost.content}
            </p>
            <span className="text-secondaryText dark:text-secondaryTextDark">
              {formatTimeAgo(new Date(viewPost.created_at))}
            </span>
          </div>
          <div className="basis-1/10 border-b-2 border-colorHover dark:border-darkColorHover">
            <div className="h-full flex justify-evenly items-center">
              <div className="flex items-center gap-1">
                {!viewPost.likes.some((like) => like.id === user.id) ? (
                  <button
                    onClick={() => {
                      handleLike(viewPost.id);
                    }}
                  >
                    <UseSvgLoader
                      name="heart"
                      options={{ width: "28px", height: "28px" }}
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleDislike(viewPost.id);
                    }}
                  >
                    <UseSvgLoader
                      name="heart-filled"
                      options={{ width: "28px", height: "28px" }}
                    />
                  </button>
                )}
                <span className="text-black dark:text-white">
                  {viewPost.likes.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button>
                  <UseSvgLoader
                    name="message-circle-2"
                    options={{ width: "28px", height: "28px" }}
                  />
                </button>
                <span className="text-black dark:text-white">3</span>
              </div>
              <div className="flex items-center gap-1">
                <button>
                  <UseSvgLoader
                    name="chart-line"
                    options={{ width: "28px", height: "28px" }}
                  />
                </button>
                <span className="text-black dark:text-white">54</span>
              </div>
            </div>
          </div>
          <div className="basis-1/2"></div>
        </div>
      </div>

      <div className="hidden lg:block absolute top-0 left-0 p-4">
        <button
          onClick={() => {
            toggleModal(setShowViewPost, showViewPost);
          }}
        >
          {theme === "light" ? (
            <UseSvgLoader
              name="x"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="xDark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
        </button>
      </div>
    </>
  );
}

export default ViewPostModal;
