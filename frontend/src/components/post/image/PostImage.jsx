function PostImage({ post }) {
  return (
    <img
      src={post.image}
      alt={`Imagen de ${post.author.username}`}
      className="w-full h-full object-cover"
    />
  );
}

export default PostImage;
