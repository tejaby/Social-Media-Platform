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
import Spinner from "../ui/Spinner";
import UserSearchResults from "./UserSearchResults";

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

function ExploreGrid({ postsLoading }) {
  const { theme } = useContext(InterfaceContext);
  const { token } = useContext(UserContext);
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
        } xs:relative py-2 min-w-full bg-white dark:bg-DarkColor z-50`}
      >
        <div className="flex w-full gap-2 bg-white dark:bg-DarkColor">
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
            className="grow px-4 py-2 rounded-full outline-none border-2 border-white dark:border-darkColorHover focus:border-PrimaryColor dark:focus:border-PrimaryColor text-black dark:text-white bg-colorHover focus:bg-white dark:bg-darkColorHover dark:focus:bg-DarkColor"
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
          <UserSearchResults
            searchTerm={searchTerm}
            searchResults={searchResults}
            handleUserPage={handleUserPage}
          />
        )}
      </div>
      {postsLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-3 gap-1 md:gap-2 sm:pt-2">
          {posts.map((post, index) => (
            <div key={post.id}>
              <PostGrid post={post} />
              {index === posts.length - 1 && <div ref={ref} />}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ExploreGrid;
