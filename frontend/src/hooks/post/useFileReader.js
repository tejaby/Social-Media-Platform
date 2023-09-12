// context
import { InterfaceContext } from "../../context/Interface";
import { PostContext } from "../../context/Post";

// react
import { useContext } from "react";

function useFileReader() {
  const { setCondition } = useContext(InterfaceContext);
  const { setCover, setImage } = useContext(PostContext);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(e.target.files[0]);
      setCondition(true);

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setCover(reader.result);
      };
    }
  };

  return handleChangeFile;
}

export default useFileReader;
