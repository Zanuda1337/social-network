import React from "react";
import Info from "src/features/Profile/Info/Info";
import PostCreator from "src/features/Profile/PostCreator/PostCreator";
import Post from "src/features/Profile/Post/Post";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { addPost, setPostText, setStatus } from "./Profile.slice";
import { IPost } from "src/features/Profile/Profile.types";
const Profile: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const handlePublishPost = (post: IPost) => dispatch(addPost(post));
  const handlePostTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => dispatch(setPostText(event.target.value));
  const handleStatusChange = (status: string) => dispatch(setStatus(status));
  return (
    <>
      <Info profile={profile} onStatusChange={handleStatusChange} />
      <PostCreator
        postText={profile.postText}
        onPostTextChange={handlePostTextChange}
        onPublish={handlePublishPost}
      />
      {[...profile.posts].reverse().map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </>
  );
};

export default Profile;
