// libraries
import { useNavigate } from "react-router-dom";

// components
import UseSvgLoader from "../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../context/Interface";

// react
import { useContext } from "react";

function FollowDetails({
  user,
  followers,
  following,
  setShowFollowPage,
  isFollowersTabActive,
  setIsFollowersTabActive,
}) {
  const { theme } = useContext(InterfaceContext);

  const navigate = useNavigate();

  const handleUserProfile = () => {
    setShowFollowPage(false);
  };

  const handleUserPage = (username) => {
    setShowFollowPage(false);
    navigate(`/profile/${username}`);
  };

  return (
    <div>
      <div className="flex gap-2 items-center p-4">
        <button onClick={handleUserProfile}>
          {theme === "light" ? (
            <UseSvgLoader
              name="arrow-left"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="arrow-leftDark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
        </button>
        <div className="flex flex-col">
          <p className="text-lg font-bold text-black dark:text-white">
            {user.first_name}
          </p>
          <span className="text-base font-semibold text-secondaryText dark:text-secondaryTextDark">
            {user.username}
          </span>
        </div>
      </div>
      <div className="flex justify-evenly border-b-2 border-colorHover dark:border-darkColorHover cursor-pointer">
        <div
          className={`basis-1/2 md:basis-1/3 text-center p-2 hover:bg-colorHover dark:hover:bg-darkColorHover ${
            isFollowersTabActive && "border-b-2 border-PrimaryColor"
          }`}
          onClick={() => {
            setIsFollowersTabActive(true);
          }}
        >
          <span className="font-semibold text-black dark:text-white">
            Seguidores
          </span>
        </div>
        <div
          className={`basis-1/2 md:basis-1/3 text-center p-2 hover:bg-colorHover dark:hover:bg-darkColorHover ${
            !isFollowersTabActive && "border-b-2 border-PrimaryColor"
          }`}
          onClick={() => {
            setIsFollowersTabActive(false);
          }}
        >
          <span className="font-semibold text-black dark:text-white">
            Seguidos
          </span>
        </div>
      </div>
      <div>
        {isFollowersTabActive
          ? followers.results.map((follower) => (
              <div
                key={follower.id}
                className="flex justify-start items-center gap-2 rounded sm:hover:bg-colorHover sm:dark:hover:bg-darkColorHover p-2 cursor-pointer"
                onClick={() => {
                  handleUserPage(follower.username);
                }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={`${
                      follower.profile_picture
                        ? follower.profile_picture
                        : "/user-defect.png"
                    }`}
                    alt="Avatar"
                  />
                </div>
                <div className="">
                  <p className="text-black dark:text-white">
                    {`${follower.first_name} ${follower.last_name}`}
                  </p>
                  <p className="text-secondaryText dark:text-secondaryTextDark">
                    {follower.username}
                  </p>
                </div>
              </div>
            ))
          : following.results.map((following) => (
              <div
                key={following.id}
                className="flex justify-start items-center gap-2 rounded sm:hover:bg-colorHover sm:dark:hover:bg-darkColorHover p-2 cursor-pointer"
                onClick={() => {
                  handleUserPage(following.username);
                }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={`${
                      following.profile_picture
                        ? following.profile_picture
                        : "/user-defect.png"
                    }`}
                    alt="Avatar"
                  />
                </div>
                <div className="">
                  <p className="text-black dark:text-white">
                    {`${following.first_name} ${following.last_name}`}
                  </p>
                  <p className="text-secondaryText dark:text-secondaryTextDark">
                    {following.username}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default FollowDetails;
