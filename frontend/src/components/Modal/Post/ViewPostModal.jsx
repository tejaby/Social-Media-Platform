// libraries
import { useNavigate } from "react-router-dom";

// components
import OptionsMenu from "../../../components/modal/post/OptionsMenu";

// context
import { InterfaceContext } from "../../../context/Interface";
import { PostContext } from "../../../context/Post";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";
import useModal from "../../../hooks/interface/useModal";

// utils
import { formatTimeAgo } from "../../../utils/dateUtils";

// react
import { useContext, useState } from "react";

function ViewPostModal() {
  const { theme, showViewPost, setShowViewPost } = useContext(InterfaceContext);

  const { viewPost } = useContext(PostContext);

  const { toggleModal } = useModal();

  const navigate = useNavigate();

  // Estado para mostrar u ocultar el menú de opciones abierto
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleUserPage = (username) => {
    navigate(`/profile/${username}`);
    toggleModal(setShowViewPost, showViewPost);
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
        <div className="relative lg:hidden">
          {openDropdown && (
            <OptionsMenu
              toggleDropdown={toggleDropdown}
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
          <div className="flex items-center">
            <button>
              {theme === "light" ? (
                <UseSvgLoader
                  name="heart"
                  options={{ width: "32px", height: "32px" }}
                />
              ) : (
                <UseSvgLoader
                  name="heartDark"
                  options={{ width: "32px", height: "32px" }}
                />
              )}
            </button>
            <span className="text-black dark:text-white">0</span>
          </div>
          <div className="flex items-center">
            <button>
              {theme === "light" ? (
                <UseSvgLoader
                  name="message-circle-2"
                  options={{ width: "32px", height: "32px" }}
                />
              ) : (
                <UseSvgLoader
                  name="message-circle-2Dark"
                  options={{ width: "32px", height: "32px" }}
                />
              )}
            </button>
            <span className="text-black dark:text-white">3</span>
          </div>
          <div className="flex items-center">
            <button>
              {theme === "light" ? (
                <UseSvgLoader
                  name="chart-line"
                  options={{ width: "32px", height: "32px" }}
                />
              ) : (
                <UseSvgLoader
                  name="chart-lineDark"
                  options={{ width: "32px", height: "32px" }}
                />
              )}
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
                className="flex flex-col"
                onClick={() => {
                  handleUserPage(viewPost.author.username);
                }}
              >
                <span className="text-dark dark:text-white">{`${viewPost.author.first_name} ${viewPost.author.last_name}`}</span>
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
              <div className="flex items-center">
                <button>
                  {theme === "light" ? (
                    <UseSvgLoader
                      name="heart"
                      options={{ width: "32px", height: "32px" }}
                    />
                  ) : (
                    <UseSvgLoader
                      name="heartDark"
                      options={{ width: "32px", height: "32px" }}
                    />
                  )}
                </button>
                <span className="text-black dark:text-white">0</span>
              </div>
              <div className="flex items-center">
                <button>
                  {theme === "light" ? (
                    <UseSvgLoader
                      name="message-circle-2"
                      options={{ width: "32px", height: "32px" }}
                    />
                  ) : (
                    <UseSvgLoader
                      name="message-circle-2Dark"
                      options={{ width: "32px", height: "32px" }}
                    />
                  )}
                </button>
                <span className="text-black dark:text-white">3</span>
              </div>
              <div className="flex items-center">
                <button>
                  {theme === "light" ? (
                    <UseSvgLoader
                      name="chart-line"
                      options={{ width: "32px", height: "32px" }}
                    />
                  ) : (
                    <UseSvgLoader
                      name="chart-lineDark"
                      options={{ width: "32px", height: "32px" }}
                    />
                  )}
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
