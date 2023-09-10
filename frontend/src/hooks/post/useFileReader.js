import { useState } from "react";

function useFileReader() {
  const [cover, setCover] = useState("");

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setCover(reader.result);
    };
  };

  return { handleChangeFile, setCover, cover };
}

export default useFileReader;
