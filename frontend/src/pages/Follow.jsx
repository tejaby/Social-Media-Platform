// components
import FollowDetails from "../components/profile/FollowDetails";

import React from "react";

function Follow({
  user,
  followers,
  following,
  setShowFollowPage,
  isFollowersTabActive,
  setIsFollowersTabActive,
}) {
  return (
    <div className="max-w-3xl mx-auto sm:my-2">
      <FollowDetails
        user={user}
        followers={followers}
        following={following}
        setShowFollowPage={setShowFollowPage}
        isFollowersTabActive={isFollowersTabActive}
        setIsFollowersTabActive={setIsFollowersTabActive}
      />
    </div>
  );
}

export default Follow;
