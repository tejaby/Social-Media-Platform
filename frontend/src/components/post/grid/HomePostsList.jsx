function HomePostsList({ username, image }) {
  return (
    <img src={image} alt={username} className="w-full h-full object-cover" />
  );
}

export default HomePostsList;
