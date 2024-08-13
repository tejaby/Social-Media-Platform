// libraries
import { useForm } from "react-hook-form";

// services
import { updateUserService } from "../../../services/user";

// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";

// hooks
import useModal from "../../../hooks/interface/useModal";
import { useUserRequest } from "../../../hooks/user/useUserRequest";

// react
import { useContext } from "react";

function UpdateProfileInfo() {
  const { showModalProfile, setShowModalProfile } =
    useContext(InterfaceContext);
  const { user, token } = useContext(UserContext);

  const { executeRequest } = useUserRequest(updateUserService);

  const { toggleModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      biography: user.biography ? user.biography : null,
      website: user.website ? user.website : null,
    },
  });

  const onSubmit = (data) => {
    executeRequest("update", data, token.access, user.id);
    toggleModal(setShowModalProfile, showModalProfile);
  };

  return (
    <form
      className="w-full h-full flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="basis-1/2 w-full flex flex-col items-center">
        <h3 className="font-semibold text-black dark:text-white mb-1">Biografía</h3>
        <textarea
          name="biography"
          className="grow w-4/5 border rounded text-base text-center resize-none focus:outline-none border-colorHover dark:border-darkColorHover text-black dark:text-white bg-white dark:bg-DarkColor"
          spellCheck="false"
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
          <p className="text-sm text-colorError">{errors.biography.message}</p>
        )}
      </div>
      <div className="basis-1/2 w-full flex flex-col items-center justify-center">
        <h3 className="font-semibold text-black dark:text-white mb-1">Sitio Web</h3>
        <input
          type="text"
          name="website"
          className="w-4/5 py-2 px-3 border rounded text-sm xs:text-base text-center focus:outline-none border-colorHover dark:border-darkColorHover text-black dark:text-white bg-white dark:bg-DarkColor"
          spellCheck="false"
          autoComplete="off"
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
            Agrega enlaces a tus perfiles en redes sociales y sitios web aquí.
          </p>
        ) : (
          <p className="text-sm text-colorError">{errors.website.message}</p>
        )}
      </div>
      <div className="w-4/5 flex justify-end pb-4">
        <button
          type="submit"
          className="text-sm rounded-md px-2 py-1 font-semibold text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
}

export default UpdateProfileInfo;
