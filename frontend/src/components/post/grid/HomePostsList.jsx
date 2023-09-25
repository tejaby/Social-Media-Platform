// context
import { PostContext } from "../../../context/Post";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";

import { useContext } from "react";

function HomePostsList() {
  const { followingPosts } = useContext(PostContext);

  return (
    <div className="flex flex-col gap-2">
      {followingPosts.map((post) => (
        <div key={post.id} className="flex flex-col">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-1">
              <UseSvgLoader
                name="user"
                options={{ width: "24px", height: "24px" }}
              />
              <span>yostintejaby</span>
            </div>
            <UseSvgLoader
              name="dots"
              options={{ width: "24px", height: "24px" }}
            />
          </div>
          <div>
            <img
              src={post.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div>
              <p>Este es un ejemplo de pie de foto 🔥</p>
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <div className="flex">
              <div className="flex items-center">
                <UseSvgLoader
                  name="heart"
                  options={{ width: "24px", height: "24px" }}
                />
                <span>18</span>
              </div>
              <div className="flex items-center">
                <UseSvgLoader
                  name="message-circle-2"
                  options={{ width: "24px", height: "24px" }}
                />
                <span>3</span>
              </div>
            </div>
            <div className="flex items-center">
              <span>54</span>
              <UseSvgLoader
                name="chart-line"
                options={{ width: "24px", height: "24px" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePostsList;
