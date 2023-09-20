// components
import Posts from "../components/Posts";

// hooks
import useApiFetch from "../hooks/post/useApiFetch";

function Explore() {
  const { error } = useApiFetch();

  return (
    <div className="container mx-auto">
      <Posts />
    </div>
  );
}

export default Explore;
