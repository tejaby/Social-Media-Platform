function UseSvgLoader({ name, options = {} }) {
  const { width, height } = options;

  return (
    <img
      src={`../public/${name}.svg`}
      alt="name"
      style={{ width: width, height, height }}
    />
  );
}

export default UseSvgLoader;
