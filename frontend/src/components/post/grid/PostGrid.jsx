function PostGrid({ src, alt }) {
  return (
    <img
      className="h-48 sm:h-60 lg:h-72 w-full max-w-full object-cover object-center"
      src={src}
      alt={alt}
    />
  );
}

export default PostGrid;
