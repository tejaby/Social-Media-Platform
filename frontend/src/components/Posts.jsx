import imagesData from "../static/post/post";

function Posts() {
  return (
    <div>
      {imagesData.map((image) => (
        <div key={image.username}>
          <p>Username: {image.username}</p>
          <img
            src={image.img}
            alt={image.username}
            style={{ maxWidth: "400px" }}
          />
        </div>
      ))}
    </div>
  );
}

export default Posts;
