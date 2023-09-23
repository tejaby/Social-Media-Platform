// context
import { PostContext } from "../../context/Post";

import { useContext } from "react";

function HomePostsList() {
  const { userPosts } = useContext(PostContext);

  return (
    <div className="max-w-3xl mx-auto my-3">
      <div className="grid grid-cols-1 gap-1 md:gap-2 sm:pt-2">
        {userPosts.map((p) => (
          <div key={p.id} className="min-h-screen max-h-screen">
            <img src={p.image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePostsList;
