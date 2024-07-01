function UserSearchResults({ searchTerm, searchResults, handleUserPage }) {
  return (
    <div className="xs:absolute xs:top-full xs:left-1/2 w-full h-screen xs:w-3/4 xs:h-auto xs:max-h-96 overflow-y-auto xs:transform xs:-translate-x-1/2 xs:rounded shadow shadow-colorHover dark:shadow-darkColorHover bg-white dark:bg-DarkColor pb-16 xs:pb-0">
      {searchResults.length === 0 ? (
        <div className="p-8 text-center">
          <span className="text-secondaryText dark:text-secondaryTextDark">
            {searchTerm
              ? "No se encontraron usuarios"
              : "Prueba a buscar personas"}
          </span>
        </div>
      ) : (
        searchResults.map((user) => (
          <div
            className="flex justify-start items-center gap-2 rounded sm:hover:bg-colorHover sm:dark:hover:bg-darkColorHover p-2 cursor-pointer"
            onClick={() => {
              handleUserPage(user.username);
            }}
            key={user.id}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={`${
                  user.profile_picture
                    ? user.profile_picture
                    : "/user-defect.png"
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
        ))
      )}
    </div>
  );
}

export default UserSearchResults;
