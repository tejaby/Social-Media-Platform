// libraries
import { useForm } from "react-hook-form";

// services
import { updateUserService } from "../../../services/user";

// components
import UseSvgLoader from "../../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";

// hooks
import useModal from "../../../hooks/interface/useModal";
import useFileReader from "../../../hooks/post/useFileReader";
import { useUserRequest } from "../../../hooks/user/useUserRequest";
import useClickOutside from "../../../hooks/interface/useClickOutside";

// react
import { useContext, useState, useEffect, useRef } from "react";

function ModalProfile() {
  const { theme, showModalProfile, setShowModalProfile } =
    useContext(InterfaceContext);
  const { user, token } = useContext(UserContext);

  const modalRef = useRef(null);

  const { toggleModal } = useModal();

  const { executeRequest } = useUserRequest(updateUserService);

  // Estado para almacenar la imagen de previsualización de la foto de perfil
  const [cover, setCover] = useState(null);

  const { handleChangeFile } = useFileReader(setCover);

  const closeModal = () => {
    toggleModal(setShowModalProfile, showModalProfile);
  };

  useClickOutside(modalRef, () => {
    closeModal();
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("biography", user.biography);
    setValue("website", user.website);
  }, []);

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.profile_picture) {
      formData.append("profile_picture", data.profile_picture);
    }
    formData.append("biography", data.biography);
    formData.append("website", data.website);

    executeRequest("update", formData, token.access, user.id);
    toggleModal(setShowModalProfile, showModalProfile);
  };

  return (
    <>
      <div
        ref={modalRef}
        className={`flex flex-col w-full h-full xs:max-w-xl xs:h-5/6 xs:rounded-lg bg-white dark:bg-DarkColor`}
      >
        <div className="flex items-center p-2 border-b-2 border-colorHover dark:border-darkColorHover">
          <button onClick={closeModal}>
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
          <p className="grow text-base font-semibold text-black dark:text-white">
            Editar perfil
          </p>
          <button
            className="rounded-full px-4 py-2 font-semibold text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
            onClick={handleSubmit(onSubmit)}
          >
            Guardar
          </button>
        </div>
        <form className="grow flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="basis-1/2 flex flex-col justify-center">
            <div className="py-2">
              <label className="text-base sm:text-lg font-semibold text-black dark:text-white">
                Actualizar foto de perfil
              </label>
            </div>
            <div
              className={`${
                !!cover ? "relative grow " : ""
              }flex justify-center items-center`}
            >
              {!cover ? (
                <input
                  type="file"
                  accept=".png, .jpg, .webp"
                  className="text-sm file:mr-2 file:p-4 file:rounded-full file:border-0 file:font-semibold text-darkColorHover dark:text-colorHover file:text-white file:bg-PrimaryColor hover:file:bg-PrimaryColorHover"
                  onChange={(e) => {
                    handleChangeFile(e);
                    setValue("profile_picture", e.target.files[0]);
                  }}
                />
              ) : (
                <img
                  src={cover}
                  alt=""
                  className="absolute w-44 h-44 rounded-full object-cover"
                />
              )}
            </div>
            {cover && (
              <div className="p-2">
                <label
                  className="text-xs  text-PrimaryColor hover:text-PrimaryColorHover cursor-pointer"
                  onClick={() => {
                    setCover(null);
                  }}
                >
                  Seleccionar otra foto
                </label>
              </div>
            )}
          </div>
          <div className="basis-1/2 flex flex-col justify-center">
            <div className="basis-1/2 flex flex-col justify-center items-center">
              <label className="text-base sm:text-lg font-semibold text-black dark:text-white">
                Biografía
              </label>
              <textarea
                name="biography"
                className="grow w-4/5 border rounded text-base text-center resize-none focus:outline-none border-colorHover dark:border-darkColorHover text-black dark:text-white bg-white dark:bg-DarkColor"
                {...register("biography", {
                  maxLength: {
                    value: 150,
                    message: "No debe superar los 150 caracteres",
                  },
                })}
              />
              {!errors.biography ? (
                <p className="text-xs text-secondaryText dark:text-secondaryTextDark pb-2">
                  Cuéntanos un poco sobre ti en unas pocas palabras.
                </p>
              ) : (
                <p className="text-sm text-colorError">
                  {errors.biography.message}
                </p>
              )}
            </div>
            <div className="basis-1/2 flex flex-col justify-center items-center">
              <label className="text-base sm:text-lg font-semibold text-black dark:text-white">
                Sitio Web
              </label>
              <input
                type="text"
                name="website"
                className="w-4/5 py-2 px-3 border rounded text-sm xs:text-base text-center focus:outline-none border-colorHover dark:border-darkColorHover text-black dark:text-white bg-white dark:bg-DarkColor"
                {...register("website", {
                  maxLength: {
                    value: 150,
                    message: "No debe superar los 150 caracteres",
                  },
                  minLength: {
                    value: 10,
                    message: "Debe tener al menos 10 caracteres",
                  },
                })}
              />
              {!errors.website ? (
                <p className="text-xs text-secondaryText dark:text-secondaryTextDark pb-2">
                  Agrega enlaces a tus perfiles en redes sociales y sitios web
                  aquí.
                </p>
              ) : (
                <p className="text-sm text-colorError">
                  {errors.website.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="hidden xs:block absolute top-0 right-0 p-4">
        <button onClick={closeModal}>
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

export default ModalProfile;
