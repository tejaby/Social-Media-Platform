// components
import EditableUser from "../../components/profile/EditableUser";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";

// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";

// context
import { useContext, useState } from "react";

// utils
import { formatDate } from "../../utils/dateUtils";

function UserSettings() {
  const { theme } = useContext(InterfaceContext);
  const { user } = useContext(UserContext);

  const formattedDate = formatDate(user.date_joined);

  const [isEditing, setIsEditing] = useState(false);
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

  const renderUserInfo = (label, value, editLabel, fieldName) => (
    <div
      className="flex flex-col sm:flex-row items-start justify-between sm:items-center px-4 py-4 md:py-6 hover:bg-colorHover dark:hover:bg-darkColorHover cursor-pointer"
      onClick={() => handleEditing(value, editLabel, fieldName)}
    >
      <span className="basis-1/2 text-black dark:text-white">{label}</span>
      <span className="basis-1/2 text-sm text-secondaryText dark:text-secondaryTextDark">
        {value}
      </span>
    </div>
  );

  return !isEditing ? (
    <div>
      <div className="p-2 border-b-2 border-colorHover dark:border-darkColorHover">
        <h1 className="text-center text-lg font-semibold text-black dark:text-white">
          Información de la cuenta
        </h1>
      </div>
      <div className="mt-6">
        {renderUserInfo(
          "Nombre",
          user.first_name,
          "Cambiar nombre",
          "first_name"
        )}
        {renderUserInfo(
          "Apellido",
          user.last_name,
          "Cambiar apellido",
          "last_name"
        )}
        {renderUserInfo(
          "Nombre de usuario",
          `${user.username}`,
          "Cambiar nombre de usuario",
          "username"
        )}
        {renderUserInfo(
          "Correo electrónico",
          user.email,
          "Cambiar el correo electrónico",
          "email"
        )}
        <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center px-4 py-4 md:py-6 hover:bg-colorHover dark:hover:bg-darkColorHover">
          <span className="basis-1/2 text-black dark:text-white">
            Creación de la cuenta
          </span>
          <span className="basis-1/2 text-sm text-secondaryText dark:text-secondaryTextDark">
            {user.date_joined && `Se unió: ${formattedDate}`}
          </span>
        </div>
        <div className="flex gap-2 items-center px-4 py-6 hover:bg-colorHover dark:hover:bg-darkColorHover cursor-pointer">
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
            <span className="text-black dark:text-white">
              Eliminar tu cuenta
            </span>
            <span className="text-sm text-secondaryText dark:text-secondaryTextDark">
              Averigua cómo puedes eliminar tu cuenta.
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <EditableUser setIsEditing={setIsEditing} field={field} />
  );
}

export default UserSettings;
