// libraries
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { format } from "date-fns";

// components
import UserPostGrid from "../../components/post/grid/UserPostGrid";
import OptionsModal from "../../components/modal/navbar/OptionsModal";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";
import { PostContext } from "../../context/Post";

// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";
import useToggleModalPost from "../../hooks/interface/useToggleModalPost";

// react
import { useContext, useState, useEffect } from "react";

function UserProfile() {
  const { theme, showModalProfile, setShowModalProfile } =
    useContext(InterfaceContext);

  const { user, setUser, token, setToken } = useContext(UserContext);

  const { userPosts, setUserPosts, nextPageUserPosts, setNextPageUserPosts } =
    useContext(PostContext);

  const { inView, ref } = useInView();

  const [showAccountModal, setShowAccountModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toggleShowModal } = useToggleModalPost(
    setShowModalProfile,
    showModalProfile
  );

  const toggleAccountModal = () => {
    setShowAccountModal(!showAccountModal);
  };

  const { OptionsModalMobile } = OptionsModal({
    toggleAccountModal,
  });

  const formattedDate = format(new Date(user.date_joined), "dd MMMM yyyy");

  useEffect(() => {
    if (!nextPageUserPosts || loading) return;

    const loadMorePosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(nextPageUserPosts, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        });
        setUserPosts([...userPosts, ...response.data.results]);
        setNextPageUserPosts(response.data.next);
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
          <span className="font-bold text-black dark:text-white">
            @{user.username}
          </span>
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
        <button className="sm:hidden" onClick={toggleAccountModal}>
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
      <div className="relative sm:hidden">
        {showAccountModal && <OptionsModalMobile />}
      </div>
      <div className="flex flex-col justify-center items-center my-5">
        <div className="w-14 h-14 sm:w-16 sm:h-16">
          <img
            src={`${
              user.profile_picture ? user.profile_picture : "/user-defect.png"
            }`}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <span className="mt-3 text-black dark:text-white">{`${user.first_name} ${user.last_name}`}</span>
        <span className="mb-3 text-secondaryText dark:text-secondaryTextDark">
          @{user.username}
        </span>
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
        <button
          className="my-5 py-2 px-3 font-semibold text-sm xs:text-base rounded text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
          onClick={toggleShowModal}
        >
          Editar perfil
        </button>
        <p className="mb-3 text-black dark:text-white">
          {user.biography ? user.biography : "Nada por aquí..."}
        </p>
        {user.website && (
          <a
            href={user.website}
            className="mb-3 text-black dark:text-white hover:text-PrimaryColor dark:hover:text-PrimaryColor"
            target="_blank"
          >
            {user.website}
          </a>
        )}
        <p className="text-secondaryText dark:text-secondaryTextDark">
          {user.date_joined && `Se unió: ${formattedDate}`}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1 md:gap-2 sm:pt-2">
        {userPosts.map((p, index) => (
          <div key={p.id}>
            <UserPostGrid src={p.image} alt={p.author.username} />
            {index === userPosts.length - 1 && <div ref={ref} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
