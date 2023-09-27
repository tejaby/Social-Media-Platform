function useFileReader(cover, setCover) {
  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setCover(reader.result);
      };
    }
  };

  return { handleChangeFile };
}

export default useFileReader;
