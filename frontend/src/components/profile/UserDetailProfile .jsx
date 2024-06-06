// libraries
import { useInView } from "react-intersection-observer";

// services
import { loadMorePostsService } from "../../services/post";

// pages
import Follow from "../../pages/Follow";

// components
import UserPostGrid from "../../components/post/grid/UserPostGrid";
import UseSvgLoader from "../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";

// hooks
import { useMorePostRequest } from "../../hooks/post/useMorePostRequest";
import useFollowStatus from "../../hooks/follow/useFollowStatus";

// utils
import { formatDate } from "../../utils/dateUtils";

// react
import { useEffect, useContext, useState } from "react";

function UserDetailProfile({
  statePosts,
  setStatePosts,
  statePage,
  setStatePage,
  userPostCount,
  followers,
  followersLoading,
  following,
  followingLoading,
}) {
  const { theme } = useContext(InterfaceContext);

  const { token, viewUser } = useContext(UserContext);

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
    if (!statePage || loading) return;

    if (inView) {
      executeRequest(
        loadMorePostsService,
        statePosts,
        setStatePosts,
        setStatePage,
        statePage,
        token.access
      );
    }
  }, [inView]);

  return !showFollowPage ? (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center text-sm sm:text-base">
        <button>
          {theme === "light" ? (
            <UseSvgLoader
              name="error-404"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="error-404Dark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
        </button>
        <button className="flex gap-1 items-center">
          {viewUser && (
            <span className="font-bold text-black dark:text-white">
              {viewUser.username}
            </span>
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
            className="rounded-full px-4 py-1 sm:py-2 font-semibold text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
            onClick={unfollowUser}
          >
            Siguiendo
          </button>
        ) : (
          <button
            className="rounded-full px-4 py-1 sm:py-2 font-semibold text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
            onClick={followUser}
          >
            Seguir
          </button>
        )}
      </div>
      <div className="flex flex-col justify-center items-center my-5">
        <div className="w-14 h-14 sm:w-16 sm:h-16">
          {viewUser && (
            <img
              src={`${
                viewUser.profile_picture
                  ? viewUser.profile_picture
                  : "/user-defect.png"
              }`}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>
        {viewUser && (
          <span className="mt-3 text-black dark:text-white">{`${viewUser.first_name} ${viewUser.last_name}`}</span>
        )}
        {viewUser && (
          <span className="mb-3 text-secondaryText dark:text-secondaryTextDark">
            @{viewUser.username}
          </span>
        )}
        <div className="flex items-center gap-10 text-sm">
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
        {viewUser && (
          <p className="my-3 text-black dark:text-white">
            {viewUser.biography ? viewUser.biography : "Nada por aquí..."}
          </p>
        )}
        {viewUser && viewUser.website && (
          <a
            href={viewUser.website}
            className="mb-3 text-black dark:text-white hover:text-PrimaryColor dark:hover:text-PrimaryColor"
            target="_blank"
          >
            {viewUser.website}
          </a>
        )}
        {viewUser && (
          <p className="text-secondaryText dark:text-secondaryTextDark">
            {viewUser.date_joined && `Se unió: ${formattedDate}`}
          </p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1 md:gap-2 sm:pt-2">
        {statePosts.map((post, index) => (
          <div key={post.id}>
            <UserPostGrid
              src={post.image}
              alt={post.author.username}
              post={post}
            />
            {index === statePosts.length - 1 && <div ref={ref} />}
          </div>
        ))}
      </div>
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
