// libraries
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

// services
import { listUsersService } from "../../services/user";

// components
import PostGrid from "../../components/post/grid/PostGrid";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";
import { PostContext } from "../../context/Post";

// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";

// react
import { useContext, useEffect, useState } from "react";

function ExploreGrid() {
  const { theme } = useContext(InterfaceContext);
  const { setUser, token, setToken, setViewUser } = useContext(UserContext);
  const { posts, setPosts, nextPagePosts, setNextPagePosts } =
    useContext(PostContext);

  const { inView, ref } = useInView();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults([]);
  };

  const handleUserPage = (user) => {
    setViewUser(user);
    navigate(`/profile/${user.username}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await listUsersService(
          debouncedSearchTerm,
          token.access
        );
        setSearchResults(response.results);
      } catch (err) {
        console.error(err);
      }
    };

    if (debouncedSearchTerm.length > 0 && token.access) {
      fetchUsers();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!nextPagePosts || loading) return;

    const loadMorePosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(nextPagePosts, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        });
        setPosts([...posts, ...response.data.results]);
        setNextPagePosts(response.data.next);
      } catch (err) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    if (inView) {
      loadMorePosts();
    }
  }, [inView]);
  return (
    <>
      <div className="fixed xs:relative xs:py-2 min-w-full bg-white dark:bg-DarkColor">
        <div className="flex w-full gap-2">
          {isFocused && (
            <button
              className=""
              onClick={() => {
                setIsFocused(false);
              }}
            >
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
          )}
          <input
            type="text"
            className="grow p-2 rounded-full outline-none border-2 border-white dark:border-darkColorHover focus:border-PrimaryColor dark:focus:border-PrimaryColor text-black dark:text-white bg-colorHover focus:bg-white dark:bg-darkColorHover dark:focus:bg-DarkColor"
            placeholder="Buscar"
            onFocus={() => {
              setIsFocused(true);
            }}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <button className="">
            {theme === "light" ? (
              <UseSvgLoader
                name="settings"
                options={{ width: "32px", height: "32px" }}
              />
            ) : (
              <UseSvgLoader
                name="settingsDark"
                options={{ width: "32px", height: "32px" }}
              />
            )}
          </button>
        </div>
        {isFocused && (
          <div className="fixed xs:absolute flex flex-col xs:top-full w-full h-screen xs:left-1/2 xs:transform xs:-translate-x-1/2 xs:w-3/4 xs:h-auto xs:rounded shadow shadow-colorHover dark:shadow-darkColorHover bg-white dark:bg-DarkColor p-2">
            {searchResults.length === 0 ? (
              searchTerm ? (
                <div className="p-2 text-center">
                  <span className="text-secondaryText dark:text-secondaryTextDark">
                    No se encontraron usuarios
                  </span>
                </div>
              ) : (
                <div className="p-2 text-center">
                  <span className="text-secondaryText dark:text-secondaryTextDark">
                    Prueba a buscar personas
                  </span>
                </div>
              )
            ) : (
              searchResults.map((user) => (
                <div
                  className="flex justify-start rounded sm:hover:bg-colorHover sm:dark:hover:bg-darkColorHover p-2 cursor-pointer"
                  onClick={() => {
                    handleUserPage(user);
                  }}
                  key={user.id}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={`${
                        user.profile_picture
                          ? user.profile_picture
                          : "/user-defect.png"
                      }`}
                      alt="Avatar"
                    />
                  </div>
                  <div className="">
                    <p className="text-black dark:text-white">
                      {`${user.first_name} ${user.last_name}`}
                    </p>
                    <p className="text-secondaryText dark:text-secondaryTextDark">
                      {user.username}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1 md:gap-2 sm:pt-2">
        {posts.map((post, index) => (
          <div key={post.id}>
            <PostGrid post={post} />
            {index === posts.length - 1 && <div ref={ref} />}
          </div>
        ))}
      </div>
    </>
  );
}

export default ExploreGrid;
