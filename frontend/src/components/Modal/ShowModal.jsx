// components
import ModalPost from "./post/ModalPost";
import ModalProfile from "./profile/ModalProfile";

function ShowModal() {
  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-black-rgba text-center z-50">
      <ModalPost />
    </div>
  );
}

export default ShowModal;
