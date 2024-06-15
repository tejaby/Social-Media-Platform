// libraries
import { useInView } from "react-intersection-observer";

// services
import { loadMorePostsService } from "../../services/post";

// pages
import Follow from "../../pages/Follow";

// components
import UserPostGrid from "../../components/post/grid/UserPostGrid";
import UseSvgLoader from "../ui/UseSvgLoader";
import Spinner from "../ui/Spinner";
import Avatar from "../ui/Avatar";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";
import { PostContext } from "../../context/Post";

// hooks
import { useMorePostRequest } from "../../hooks/post/useMorePostRequest";
import useFollowStatus from "../../hooks/follow/useFollowStatus";

// utils
import { formatDate } from "../../utils/dateUtils";

// react
import { useEffect, useContext, useState } from "react";

function UserDetailProfile({
  userPostCount,
  followers,
  followersLoading,
  following,
  followingLoading,
  postsLoading,
}) {
  const { theme } = useContext(InterfaceContext);

  const { token, viewUser } = useContext(UserContext);

  const {
    currentPosts,
    setCurrentPosts,
    nextPageCurrentPosts,
    setNextPageCurrentPosts,
  } = useContext(PostContext);

  const { inView, ref } = useInView();

  const formattedDate = viewUser ? formatDate(viewUser.date_joined) : "";

  // Estado para mostrar u ocultar la pagina follow del usuario
  const [showFollowPage, setShowFollowPage] = useState(false);

  // Estado para indicar si la pestaña activa es la de followers o followings
  const [isFollowersTabActive, setIsFollowersTabActive] = useState(true);

  const { executeRequest, loading } = useMorePostRequest();

  const { isFollowing, followUser, unfollowUser } = useFollowStatus(
    viewUser?.id,
    token.access
  );

  const handleFollowPage = () => {
    setShowFollowPage(true);
  };

  useEffect(() => {
    if (!nextPageCurrentPosts || loading) return;

    if (inView) {
      executeRequest(
        loadMorePostsService,
        currentPosts,
        setCurrentPosts,
        setNextPageCurrentPosts,
        nextPageCurrentPosts,
        token.access
      );
    }
  }, [inView]);

  return !showFollowPage ? (
    <div className="flex flex-col gap-2 min-h-screen">
      <div className="flex justify-between items-center text-sm sm:text-base h-12">
        <div className="w-12" />
        <button className="flex justify-center items-center gap-1">
          {viewUser ? (
            <span className="font-bold text-black dark:text-white">
              {viewUser.username}
            </span>
          ) : (
            <div className="h-4 w-28 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse" />
          )}
          {theme === "light" ? (
            <UseSvgLoader
              name="chevron-down"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="chevron-downDark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
        </button>
        {isFollowing ? (
          <button
            className="rounded-full px-4 py-2 font-semibold text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
            onClick={unfollowUser}
          >
            Siguiendo
          </button>
        ) : (
          <button
            className="rounded-full px-4 py-2 font-semibold text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
            onClick={followUser}
          >
            Seguir
          </button>
        )}
      </div>
      <div className="flex flex-col justify-center items-center my-5">
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 mt-3${
            !viewUser ? " animate-pulse" : ""
          }`}
        >
          {viewUser ? (
            <img
              src={`${
                viewUser.profile_picture
                  ? viewUser.profile_picture
                  : "/user-defect.png"
              }`}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Avatar />
          )}
        </div>
        <div
          className={`flex flex-col items-center ${
            viewUser ? "gap-1" : "gap-4"
          } mt-3`}
        >
          {viewUser ? (
            <>
              <span className="text-black dark:text-white">{`${viewUser.first_name} ${viewUser.last_name}`}</span>
              <span className="text-secondaryText dark:text-secondaryTextDark">
                @{viewUser.username}
              </span>
            </>
          ) : (
            <>
              <div className="h-4 w-28 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse" />
              <div className="h-4 w-28 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse" />
            </>
          )}
        </div>
        <div className="flex items-center gap-10 text-sm mt-3">
          <div className="flex flex-col items-center">
            <span className="font-bold text-black dark:text-white">
              {userPostCount}
            </span>
            <span className="text-black dark:text-white">Post</span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              handleFollowPage();
              setIsFollowersTabActive(true);
            }}
          >
            <span className="font-bold text-black dark:text-white">
              {followersLoading ? 0 : followers.count}
            </span>
            <span className="text-black dark:text-white">seguidores</span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              handleFollowPage();
              setIsFollowersTabActive(false);
            }}
          >
            <span className="font-bold text-black dark:text-white">
              {followingLoading ? 0 : following.count}
            </span>
            <span className="text-black dark:text-white">seguidos</span>
          </div>
        </div>
        {viewUser ? (
          <p className="mt-3 text-black dark:text-white">
            {viewUser.biography ? viewUser.biography : "Nada por aquí..."}
          </p>
        ) : (
          <div className="h-4 w-40 bg-gray-200 rounded-full dark:bg-gray-700 mt-6 animate-pulse" />
        )}
        {viewUser && viewUser.website && (
          <a
            href={viewUser.website}
            className="mt-3 text-black dark:text-white hover:text-PrimaryColor dark:hover:text-PrimaryColor"
            target="_blank"
          >
            {viewUser.website}
          </a>
        )}
        {viewUser ? (
          <p className="text-secondaryText dark:text-secondaryTextDark mt-3">
            {viewUser.date_joined && `Se unió: ${formattedDate}`}
          </p>
        ) : (
          <div className="h-4 w-40 bg-gray-200 rounded-full dark:bg-gray-700 mt-6 animate-pulse" />
        )}
      </div>
      <hr className="border-0 border-b-2 border-colorHover dark:border-darkColorHover" />
      {postsLoading ? (
        <Spinner />
      ) : currentPosts.length > 0 ? (
        <div className="grid grid-cols-3 gap-1 md:gap-2 sm:pt-2">
          {currentPosts.map((post, index) => (
            <div key={post.id}>
              <UserPostGrid
                src={post.image}
                alt={post.author.username}
                post={post}
              />
              {index === currentPosts.length - 1 && <div ref={ref} />}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex flex-col justify-center items-center">
          {theme === "light" ? (
            <UseSvgLoader name="photo-off" />
          ) : (
            <UseSvgLoader name="photo-offDark" />
          )}
          <h2 className="text-xl font-semibold text-secondaryText dark:text-secondaryTextDark">
            Este usuario aún no ha publicado nada
          </h2>
        </div>
      )}
    </div>
  ) : (
    <Follow
      user={viewUser}
      followers={followers}
      following={following}
      setShowFollowPage={setShowFollowPage}
      isFollowersTabActive={isFollowersTabActive}
      setIsFollowersTabActive={setIsFollowersTabActive}
    />
  );
}

export default UserDetailProfile;
