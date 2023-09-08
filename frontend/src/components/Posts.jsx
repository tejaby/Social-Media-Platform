function Posts({ post }) {
  return (
    <div>
      {post.map((image) => (
        <div key={image.id}>
          <p>Username: {image.author}</p>
          <img
            src={image.image}
            alt={image.author}
            style={{ maxWidth: "400px" }}
          />
        </div>
      ))}
    </div>
  );
}

export default Posts;
