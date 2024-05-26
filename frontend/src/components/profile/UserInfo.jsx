function UserInfo({ label, value, editLabel, fieldName, onEdit }) {
  return (
    <div
      className="flex flex-col sm:flex-row items-start justify-between sm:items-center px-4 py-4 md:py-6 hover:bg-colorHover dark:hover:bg-darkColorHover cursor-pointer"
      onClick={() => onEdit(value, editLabel, fieldName)}
    >
      <span className="basis-1/2 text-black dark:text-white">{label}</span>
      <span className="basis-1/2 text-sm sm:text-base text-secondaryText dark:text-secondaryTextDark">
        {value}
      </span>
    </div>
  );
}

export default UserInfo;
