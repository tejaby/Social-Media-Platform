// libraries
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { format } from "date-fns";

// components
import UserPostGrid from "../../components/post/grid/UserPostGrid";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";

// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";

// react
import { useState, useEffect, useContext } from "react";

function UserDetailProfile({
  statePosts,
  setStatePosts,
  statePage,
  setStatePage,
  stateUser,
}) {
  const { theme } = useContext(InterfaceContext);

  const { token } = useContext(UserContext);

  const { inView, ref } = useInView();

  const formattedDate = stateUser
    ? format(new Date(stateUser.date_joined), "dd MMMM yyyy")
    : "";

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!statePage || loading) return;

    const loadMorePosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(statePage, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        });
        setStatePosts([...statePosts, ...response.data.results]);
        setStatePage(response.data.next);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (inView) {
      loadMorePosts();
    }
  }, [inView]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center text-sm">
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
          {stateUser && (
            <span className="font-bold text-black dark:text-white">
              {stateUser.username}
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
        <button className="sm:hidden">
          {theme === "light" ? (
            <UseSvgLoader
              name="menu-2"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="menu-2Dark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
        </button>
        <button className="hidden sm:block">
          {theme === "light" ? (
            <UseSvgLoader
              name="menu-2"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="menu-2Dark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
        </button>
      </div>
      <div className="flex flex-col justify-center items-center my-5">
        <div className="w-14 h-14 sm:w-16 sm:h-16">
          {stateUser && (
            <img
              src={`${
                stateUser.profile_picture
                  ? stateUser.profile_picture
                  : "/user-defect.png"
              }`}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>
        {stateUser && (
          <span className="mt-3 text-black dark:text-white">{`${stateUser.first_name} ${stateUser.last_name}`}</span>
        )}
        {stateUser && (
          <span className="mb-3 text-secondaryText dark:text-secondaryTextDark">
            @{stateUser.username}
          </span>
        )}
        <div className="flex gap-10 text-sm">
          <div className="flex flex-col items-center">
            <span className="font-bold text-black dark:text-white">10</span>
            <span className="text-black dark:text-white">Post</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-black dark:text-white">1.20 K</span>
            <span className="text-black dark:text-white">seguidores</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-black dark:text-white">300</span>
            <span className="text-black dark:text-white">seguidos</span>
          </div>
        </div>
        {stateUser && (
          <p className="my-3 text-black dark:text-white">
            {stateUser.biography ? stateUser.biography : "Nada por aquí..."}
          </p>
        )}
        {stateUser && stateUser.website && (
          <a
            href={stateUser.website}
            className="mb-3 text-black dark:text-white hover:text-PrimaryColor dark:hover:text-PrimaryColor"
            target="_blank"
          >
            {stateUser.website}
          </a>
        )}
        {stateUser && (
          <p className="text-secondaryText dark:text-secondaryTextDark">
            {stateUser.date_joined && `Se unió: ${formattedDate}`}
          </p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1 md:gap-2 sm:pt-2">
        {statePosts.map((post, index) => (
          <div key={post.id}>
            <UserPostGrid src={post.image} alt={post.author.username} />
            {index === statePosts.length - 1 && <div ref={ref} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDetailProfile;
