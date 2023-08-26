function UseSvgLoader({ name = "error-404", options = {} }) {
  const { width = "48px", height = "48px" } = options;

  return (
    <img
      src={`../public/${name}.svg`}
      alt="name"
      style={{ width: width, height: height }}
    />
  );
}

export default UseSvgLoader;
