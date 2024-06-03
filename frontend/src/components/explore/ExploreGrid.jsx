// libraries
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// services
import { listUsersService } from "../../services/user";
import { loadMorePostsService } from "../../services/post";

// components
import PostGrid from "../../components/post/grid/PostGrid";
import UseSvgLoader from "../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";
import { PostContext } from "../../context/Post";

// hooks
import { useMorePostRequest } from "../../hooks/post/useMorePostRequest";
import useClickOutside from "../../hooks/interface/useClickOutside";

// utils
import { getUserErrorMessage } from "../../utils/getErrorMessage";

// react
import { useContext, useEffect, useState, useRef } from "react";

function ExploreGrid() {
  const { theme } = useContext(InterfaceContext);
  const { setUser, token, setToken } = useContext(UserContext);
  const { posts, setPosts, nextPagePosts, setNextPagePosts } =
    useContext(PostContext);

  const { inView, ref } = useInView();
  const navigate = useNavigate();

  const searchRef = useRef(null);

  const { executeRequest, loading } = useMorePostRequest();

  // Estado para almacenar los términos del input para buscar usuarios
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para almacenar los resultados de la búsqueda de usuarios
  const [searchResults, setSearchResults] = useState([]);

  // Estado para indicar si el input del buscador de usuarios tiene el foco
  const [isFocused, setIsFocused] = useState(false);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults([]);
  };

  const handleUserPage = (username) => {
    navigate(`/profile/${username}`);
  };

  useClickOutside(searchRef, () => {
    setIsFocused(false);
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await listUsersService(
          debouncedSearchTerm,
          token.access
        );
        setSearchResults(response.results);
      } catch (err) {
        const errorMessage = getUserErrorMessage(err, "search");
        toast.error(errorMessage);
        setTimeout(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("authUser");
          localStorage.removeItem("authToken");
        }, 5000);
      }
    };

    if (debouncedSearchTerm.length > 0 && token.access) {
      fetchUsers();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!nextPagePosts || loading) return;

    if (inView) {
      executeRequest(
        loadMorePostsService,
        posts,
        setPosts,
        setNextPagePosts,
        nextPagePosts,
        token.access
      );
    }
  }, [inView]);

  return (
    <>
      <div
        ref={searchRef}
        className={`${
          isFocused && "fixed"
        } xs:relative py-2 min-w-full bg-white dark:bg-DarkColor`}
      >
        <div className="flex w-full gap-2">
          {isFocused && (
            <button
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
                  className="flex justify-start items-center gap-2 rounded sm:hover:bg-colorHover sm:dark:hover:bg-darkColorHover p-2 cursor-pointer"
                  onClick={() => {
                    handleUserPage(user.username);
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
