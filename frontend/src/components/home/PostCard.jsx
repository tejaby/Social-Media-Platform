// components
import HomePostsList from "../../components/post/grid/HomePostsList";
import SvgButton from "../../components/ui/SvgButton";

// context
import { PostContext } from "../../context/Post";

// react
import { useContext } from "react";

function PostCard() {
  const { allPosts } = useContext(PostContext);

  return (
    <div className="flex flex-col gap-2">
      {allPosts.map((post) => (
        <div key={post.id} className="flex flex-col border-b-2">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-1">
              <img
                src={`${
                  post.author.profile_picture
                    ? post.author.profile_picture
                    : "/user-defect.png"
                }`}
                alt=""
                className="w-10 h-10 object-cover rounded-full"
              />
              <span className="font-bold">{post.author.username}</span>
            </div>
            <SvgButton
              name="dots"
              options={{ width: "24px", height: "24px" }}
            />
          </div>
          <div>
            <HomePostsList username={post.author.username} image={post.image} />
            <div className="flex gap-1">
              <span className="font-semibold">{post.author.username}</span>
              <p className="text-base">{post.content}</p>
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <div className="flex gap-2">
              <div className="flex items-center">
                <SvgButton
                  name="heart"
                  options={{ width: "24px", height: "24px" }}
                />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center">
                <SvgButton
                  name="message-circle-2"
                  options={{ width: "24px", height: "24px" }}
                />
                <span>3</span>
              </div>
            </div>
            <div className="flex items-center">
              <span>54</span>
              <SvgButton
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

export default PostCard;
