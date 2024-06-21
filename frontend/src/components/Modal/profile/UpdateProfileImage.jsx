// libraries
import imageCompression from "browser-image-compression";

// services
import { updateUserService } from "../../../services/user";

// components
import UseSvgLoader from "../../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";

// hooks
import useFileReader from "../../../hooks/post/useFileReader";
import useModal from "../../../hooks/interface/useModal";
import { useUserRequest } from "../../../hooks/user/useUserRequest";

// react
import { useState, useContext } from "react";

function UpdateProfileImage() {
  const { showModalProfile, setShowModalProfile } =
    useContext(InterfaceContext);
  const { user, token } = useContext(UserContext);

  const { executeRequest } = useUserRequest(updateUserService);

  const { toggleModal } = useModal();

  // Estado para almacenar la imagen de previsualización de la foto de perfil
  const [cover, setCover] = useState(user.profile_picture);

  // Estado para almacenar el archivo de imagen que se enviará como foto de perfil
  const [file, setFile] = useState(null);

  const { handleChangeFile } = useFileReader(setCover);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(file, options);
      const compressedFile = new File([compressedBlob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      });
      const formData = new FormData();
      formData.append("profile_picture", compressedFile);
      executeRequest("update", formData, token.access, user.id);
      toggleModal(setShowModalProfile, showModalProfile);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = () => {
    const data = {
      profile_picture: null,
    };
    executeRequest("update", data, token.access, user.id);
    toggleModal(setShowModalProfile, showModalProfile);
  };

  return (
    <form
      className="h-full w-full flex flex-col gap-2 items-center justify-center"
      onSubmit={handleSubmit}
    >
      <h3 className="font-semibold text-black dark:text-white mb-1">
        Foto de perfil
      </h3>
      {cover ? (
        <div className="w-full flex justify-center items-center gap-2">
          <img
            src={cover}
            alt=""
            className="w-32 h-32 rounded-full object-cover"
          />
          {cover && file ? (
            <button type="submit">
              <UseSvgLoader
                name="device-floppy"
                options={{ width: "32px", height: "32px" }}
              />
            </button>
          ) : (
            <button type="button" onClick={handleDelete}>
              <UseSvgLoader
                name="trash"
                options={{ width: "32px", height: "32px" }}
              />
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <input
            type="file"
            accept=".png, .jpg, .webp"
            id="fileInput"
            className="hidden"
            onChange={(e) => {
              handleChangeFile(e);
              handleImageChange(e);
            }}
          />
          <label
            htmlFor="fileInput"
            className="text-sm p-4 font-semibold rounded-full text-white bg-PrimaryColor hover:bg-PrimaryColorHover cursor-pointer"
          >
            Agregar foto de perfil
          </label>
        </div>
      )}
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
    </form>
  );
}

export default UpdateProfileImage;
