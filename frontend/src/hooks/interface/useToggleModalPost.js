function useToggleModalPost(contextSetter, setterValue) {
  const toggleShowModal = () => {
    contextSetter(!setterValue);
  };
  return { toggleShowModal };
}

export default useToggleModalPost;
