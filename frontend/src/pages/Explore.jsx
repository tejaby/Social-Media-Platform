// components
import Posts from "../components/Posts";

// hooks
import useApiFetch from "../hooks/useApiFetch";

function Explore() {
  useApiFetch();

  return (
    <div className="container mx-auto">
      <Posts />
    </div>
  );
}

export default Explore;
