// libraries
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// services
import { userDeactivationService } from "../../services/user";

// components
import UseSvgLoader from "../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";

// react
import { useContext } from "react";

// utils
import { getDeactivateErrorMessage } from "../../utils/getErrorMessage";

function DeactivateAccount() {
  const { theme } = useContext(InterfaceContext);
  const { user, setUser, token, setToken } = useContext(UserContext);

  const navigate = useNavigate();

  const handleOpenDeactivateModal = () => {
    Swal.fire({
      text: "¿Realmente quieres desactivar tu cuenta?",
      showCancelButton: true,
      color: "#FFFFFF",
      background: "#15202B",
      backdrop: "rgba(49, 64, 78, 0.6)",
      confirmButtonText: "Sí, Desactivar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeactivate();
      }
    });
  };

  const handleDeactivate = async () => {
    if (token) {
      try {
        const response = await userDeactivationService(user.id, token.access);
        toast.success(response.message, { duration: 5000 });
        setTimeout(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("authUser");
          localStorage.removeItem("authToken");
        }, 5000);
      } catch (err) {
        const errorMessage = getDeactivateErrorMessage(err);
        toast.error(errorMessage, { duration: 5000 });
        if (err.status === 401) {
          setTimeout(() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem("authUser");
            localStorage.removeItem("authToken");
          }, 5000);
        }
      }
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mb-16 sm:my-2">
        <div className="flex gap-2 items-center p-4 border-b-2 border-colorHover dark:border-darkColorHover">
          <button
            onClick={() => {
              navigate("/settings");
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
          <p className="text-lg font-bold text-black dark:text-white">
            Desactivar la cuenta
          </p>
        </div>
        <div
          className="flex justify-start items-center gap-2 rounded sm:hover:bg-colorHover sm:dark:hover:bg-darkColorHover p-4 cursor-pointer"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={`${
                user.profile_picture ? user.profile_picture : "/user-defect.png"
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
        <div className="p-4">
          <div className="mb-4">
            <p className="text-xl font-semibold text-black dark:text-white mb-2">
              Esta acción desactivará tu cuenta
            </p>
            <p className="text-sm text-justify text-secondaryText dark:text-secondaryTextDark">
              Estás por iniciar el proceso de desactivación de tu cuenta. Tu
              nombre visible, tu @nombre de usuario y tu perfil público ya no se
              podrán ver.
            </p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold text-black dark:text-white mb-2">
              Qué más debes saber
            </p>
            <p className="text-sm text-justify text-secondaryText dark:text-secondaryTextDark mb-4">
              Para reactivarla, simplemente inicia sesión y podrás activarla
              nuevamente.
            </p>
            <p className="text-sm text-justify text-secondaryText dark:text-secondaryTextDark">
              Si solo quieres cambiar tu @usuario, no es necesario que
              desactives tu cuenta; cámbialo en tu{" "}
              <span
                className="font-semibold text-PrimaryColor cursor-pointer"
                onClick={() => {
                  navigate("/settings");
                }}
              >
                configuración
              </span>
              .
            </p>
          </div>
        </div>
        <div
          className="w-full p-4 text-center hover:bg-colorHover dark:hover:bg-darkColorHover cursor-pointer"
          onClick={handleOpenDeactivateModal}
        >
          <button className="rounded-full px-4 py-2 font-semibold text-red-600 outline-none">
            Desactivar
          </button>
        </div>
      </div>
    </>
  );
}

export default DeactivateAccount;
