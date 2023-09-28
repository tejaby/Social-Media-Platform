// components
import ProfilePostList from "../../components/post/grid/ProfilePostList";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";

// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";
import useToggleModalPost from "../../hooks/interface/useToggleModalPost";

// react
import { useContext } from "react";

function UserProfile() {
  const { showModalProfile, setShowModalProfile } =
    useContext(InterfaceContext);

  const { user } = useContext(UserContext);

  const { toggleShowModal } = useToggleModalPost(
    setShowModalProfile,
    showModalProfile
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center text-sm">
        <button>
          <UseSvgLoader options={{ width: "32px", height: "32px" }} />
        </button>
        <button className="flex gap-1 items-center">
          <span className="font-bold">@{user.username}</span>
          <UseSvgLoader
            name="chevron-down"
            options={{ width: "32px", height: "32px" }}
          />
        </button>
        <button>
          <UseSvgLoader
            name="menu-2"
            options={{ width: "32px", height: "32px" }}
          />
        </button>
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
        <span className="my-3">{`${user.first_name} ${user.last_name}`}</span>
        <div className="flex gap-10 text-sm">
          <div className="flex flex-col items-center">
            <span className="font-bold">10</span>
            <span>Post</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">1.20 K</span>
            <span>seguidores</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">300</span>
            <span>seguidos</span>
          </div>
        </div>
        <button
          className="my-5 py-2 px-3 font-semibold text-sm border border-primary"
          onClick={toggleShowModal}
        >
          Editar perfil
        </button>
        <p className="mb-3">
          {user.biography ? user.biography : "Nada por aquí..."}
        </p>
        {user.website && (
          <a href={user.website} target="_blank">
            {user.website}
          </a>
        )}
      </div>

      <ProfilePostList />
    </div>
  );
}

export default UserProfile;
