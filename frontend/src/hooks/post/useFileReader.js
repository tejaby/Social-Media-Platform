import { useState } from "react";

function useFileReader() {
  const [cover, setCover] = useState("");
  const [image, setImage] = useState("");

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setImage(e.target.files[0]);
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setCover(reader.result);
      };
    }
  };

  return { handleChangeFile, image, setImage, cover, setCover };
}

export default useFileReader;
