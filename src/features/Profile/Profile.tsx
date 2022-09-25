import React from "react";
import Info from "src/features/Profile/Info/Info";
import PostCreator from "src/features/Profile/PostCreator/PostCreator";
import Post from "src/features/Profile/Post/Post";
const Profile: React.FC = () => (
  <>
    <Info />
    <PostCreator />
    <Post />
    <Post />
  </>
);

export default Profile;
