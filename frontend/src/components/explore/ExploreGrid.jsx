// libraries
import { useInView } from "react-intersection-observer";
import axios from "axios";

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
  const { setUser, token, setToken } = useContext(UserContext);
  const { posts, setPosts, nextPagePosts, setNextPagePosts } =
    useContext(PostContext);

  const { inView, ref } = useInView();

  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(null);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

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
            {!value ? (
              <div className="p-2 text-center">
                <span className="text-secondaryText dark:text-secondaryTextDark">
                  Prueba a buscar personas
                </span>
              </div>
            ) : (
              <>
                <div
                  className="flex justify-start rounded sm:hover:bg-colorHover sm:dark:hover:bg-darkColorHover p-2 cursor-pointer"
                  onClick={() => {
                    setIsFocused(false);
                  }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="https://avatars.githubusercontent.com/u/123685633?v=4"
                      alt="Avatar"
                    />
                  </div>
                  <div className="">
                    <p className="text-black dark:text-white">
                      Nombre Apellido
                    </p>
                    <p className="text-secondaryText dark:text-secondaryTextDark">
                      @username
                    </p>
                  </div>
                </div>
                <div
                  className="flex justify-start rounded sm:hover:bg-colorHover sm:dark:hover:bg-darkColorHover p-2 cursor-pointer"
                  onClick={() => {
                    setIsFocused(false);
                  }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="https://avatars.githubusercontent.com/u/123685633?v=4"
                      alt="Avatar"
                    />
                  </div>
                  <div className="">
                    <p className="text-black dark:text-white">
                      Nombre Apellido
                    </p>
                    <p className="text-secondaryText dark:text-secondaryTextDark">
                      @username
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1 md:gap-2 sm:pt-2">
        {posts.map((post, index) => (
          <div key={post.id}>
            <PostGrid src={post.image} alt={post.author.username} />
            {index === posts.length - 1 && <div ref={ref} />}
          </div>
        ))}
      </div>
    </>
  );
}

export default ExploreGrid;
