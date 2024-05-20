// libraries
import { useNavigate } from "react-router-dom";

// components
import SvgButton from "../../../components/ui/SvgButton";

// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";
import { PostContext } from "../../../context/Post";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";
import useToggleModalPost from "../../../hooks/interface/useToggleModalPost";

// utils
import { formatTimeAgo } from "../../../utils/dateUtils";

// react
import { useContext } from "react";

function ViewPostModal() {
  const { theme, showViewPost, setShowViewPost } = useContext(InterfaceContext);

  const { setViewUser } = useContext(UserContext);

  const { viewPost, setViewPost } = useContext(PostContext);

  const { toggleShowModal } = useToggleModalPost(setShowViewPost, showViewPost);

  const navigate = useNavigate();

  const handleUserPage = (post) => {
    setViewUser(post.author);
    navigate(`/profile/${post.author.username}`);
  };

  return (
    <>
      <div className="absolute w-full top-0 lg:hidden">
        <div className="flex justify-between p-2">
          <button
            onClick={() => {
              setViewPost(null);
              toggleShowModal();
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
          <button>
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

      <div className="lg:hidden w-full h-full xs:max-w-xl xs:h-full flex flex-col justify-between bg-white dark:bg-DarkColor">
        <div className="grow overflow-hidden">
          <img
            src={viewPost.image ? viewPost.image : ""}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex justify-evenly items-center p-2">
          <div className="flex items-center">
            {theme === "light" ? (
              <SvgButton
                name="heart"
                options={{ width: "32px", height: "32px" }}
              />
            ) : (
              <SvgButton
                name="heartDark"
                options={{ width: "32px", height: "32px" }}
              />
            )}
            <span className="text-black dark:text-white">0</span>
          </div>
          <div className="flex items-center">
            {theme === "light" ? (
              <SvgButton
                name="message-circle-2"
                options={{ width: "32px", height: "32px" }}
              />
            ) : (
              <SvgButton
                name="message-circle-2Dark"
                options={{ width: "32px", height: "32px" }}
              />
            )}
            <span className="text-black dark:text-white">3</span>
          </div>
          <div className="flex items-center">
            {theme === "light" ? (
              <SvgButton
                name="chart-line"
                options={{ width: "32px", height: "32px" }}
              />
            ) : (
              <SvgButton
                name="chart-lineDark"
                options={{ width: "32px", height: "32px" }}
              />
            )}
            <span className="text-black dark:text-white">54</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:justify-between w-full h-full">
        <div className="xl:block"></div>
        <div className="basis-2/4 xl:basis-2/5 h-full bg-white dark:bg-DarkColor">
          <img
            src={viewPost.image}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="basis-30 xl:basis-1/5 h-full flex flex-col bg-white dark:bg-DarkColor border-l-2 border-colorHover dark:border-darkColorHover">
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
                    setViewPost(null);
                    toggleShowModal();
                    handleUserPage(viewPost);
                  }}
                />
              </div>
              <div
                className="flex flex-col"
                onClick={() => {
                  setViewPost(null);
                  toggleShowModal();
                  handleUserPage(viewPost);
                }}
              >
                <span className="text-dark dark:text-white">{`${viewPost.author.first_name} ${viewPost.author.last_name}`}</span>
                <span className="text-secondaryText dark:text-secondaryTextDark">
                  @{viewPost.author.username}
                </span>
              </div>
            </div>
            <div>
              <button>
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
              <div className="flex items-center">
                {theme === "light" ? (
                  <SvgButton
                    name="heart"
                    options={{ width: "32px", height: "32px" }}
                  />
                ) : (
                  <SvgButton
                    name="heartDark"
                    options={{ width: "32px", height: "32px" }}
                  />
                )}
                <span className="text-black dark:text-white">0</span>
              </div>
              <div className="flex items-center">
                {theme === "light" ? (
                  <SvgButton
                    name="message-circle-2"
                    options={{ width: "32px", height: "32px" }}
                  />
                ) : (
                  <SvgButton
                    name="message-circle-2Dark"
                    options={{ width: "32px", height: "32px" }}
                  />
                )}
                <span className="text-black dark:text-white">3</span>
              </div>
              <div className="flex items-center">
                {theme === "light" ? (
                  <SvgButton
                    name="chart-line"
                    options={{ width: "32px", height: "32px" }}
                  />
                ) : (
                  <SvgButton
                    name="chart-lineDark"
                    options={{ width: "32px", height: "32px" }}
                  />
                )}
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
            setViewPost(null);
            toggleShowModal();
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
