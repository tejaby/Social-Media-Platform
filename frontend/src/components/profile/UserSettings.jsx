// components
import UserInfo from "../../components/profile/UserInfo";
import EditableUser from "../../components/profile/EditableUser";
import UpdatePassword from "./UpdatePassword";
import UseSvgLoader from "../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";

// context
import { useContext, useState } from "react";

// utils
import { formatDate } from "../../utils/dateUtils";

function UserSettings() {
  const { theme } = useContext(InterfaceContext);
  const { user } = useContext(UserContext);

  const formattedDate = formatDate(user.date_joined);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [field, setField] = useState([]);

  const handleEditing = (fieldValue, fieldLabel, fieldName) => {
    setIsEditing(true);
    setField({
      value: fieldValue,
      label: fieldLabel,
      name: fieldName,
      id: user.id,
    });
  };

  const handlePasswordChange = () => {
    setIsEditing(true);
    setIsChangingPassword(true);
  };

  return !isEditing ? (
    <>
      <div className="border-b-2 pb-2 border-colorHover dark:border-darkColorHover">
        <h1 className="text-center text-lg font-semibold text-black dark:text-white">
          Información de la cuenta
        </h1>
      </div>
      <div className="mt-6">
        <UserInfo
          label="Nombre"
          value={user.first_name}
          editLabel="Cambiar nombre"
          fieldName="first_name"
          onEdit={handleEditing}
        />
        <UserInfo
          label="Apellido"
          value={user.last_name}
          editLabel="Cambiar apellido"
          fieldName="last_name"
          onEdit={handleEditing}
        />
        <UserInfo
          label="Nombre de usuario"
          value={user.username}
          editLabel="Cambiar nombre de usuario"
          fieldName="username"
          onEdit={handleEditing}
        />
        <UserInfo
          label="Correo electrónico"
          value={user.email}
          editLabel="Cambiar el correo electrónico"
          fieldName="email"
          onEdit={handleEditing}
        />
        <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center px-4 py-4 md:py-6 hover:bg-colorHover dark:hover:bg-darkColorHover">
          <span className="basis-1/2 text-black dark:text-white">
            Creación de la cuenta
          </span>
          <span className="basis-1/2 text-sm text-secondaryText dark:text-secondaryTextDark">
            {user.date_joined && `Se unió: ${formattedDate}`}
          </span>
        </div>
        <div
          className="flex gap-2 items-center px-4 py-6 hover:bg-colorHover dark:hover:bg-darkColorHover cursor-pointer"
          onClick={handlePasswordChange}
        >
          {theme === "light" ? (
            <UseSvgLoader
              name="key"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="keyDark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
          <div className="flex flex-col">
            <span className="text-black dark:text-white">
              Cambia tu contraseña
            </span>
            <span className="text-sm text-secondaryText dark:text-secondaryTextDark">
              Cambia tu contraseña en cualquier momento.
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center px-4 py-6 hover:bg-colorHover dark:hover:bg-darkColorHover cursor-pointer">
          {theme === "light" ? (
            <UseSvgLoader
              name="heart-broken"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="heart-brokenDark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
          <div className="flex flex-col">
            <span className="text-colorError">Eliminar tu cuenta</span>
            <span className="text-sm text-secondaryText dark:text-secondaryTextDark">
              Averigua cómo puedes eliminar tu cuenta.
            </span>
          </div>
        </div>
      </div>
    </>
  ) : !isChangingPassword ? (
    <EditableUser setIsEditing={setIsEditing} field={field} />
  ) : (
    <UpdatePassword
      setIsEditing={setIsEditing}
      setIsChangingPassword={setIsChangingPassword}
    />
  );
}

export default UserSettings;
