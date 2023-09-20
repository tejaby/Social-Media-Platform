// context
import { InterfaceContext } from "../../context/Interface";

// react
import { useContext, useState } from "react";

function useFileReader() {
  const { setCondition } = useContext(InterfaceContext);

  const [cover, setCover] = useState(null);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setCondition(true);

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setCover(reader.result);
      };
    }
  };

  return { handleChangeFile, cover, setCover };
}

export default useFileReader;
