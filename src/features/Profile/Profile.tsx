import React, { useCallback, useEffect } from "react";
import Info from "src/features/Profile/Info/Info";
import PostCreator from "src/features/Profile/PostCreator/PostCreator";
import Post from "src/features/Profile/Post/Post";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import {
  addPost,
  fetchProfile,
  fetchProfileStatus,
  setPostText,
  setStatus,
  setStatusEditing,
  setStatusInput,
  updateProfileStatus,
} from "./Profile.slice";
import { IPost } from "src/features/Profile/Profile.types";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import InfoSkeleton from "src/features/Profile/Info/InfoSkeleton";
import SvgSelector from "src/components/SvgSelector/SvgSelector";

const Profile: React.FC = () => {
  const userId = Number(useParams().id);
  const profile = useAppSelector((state) => state.profile);
  const currentUserId = useAppSelector((state) => state.user.userId);
  const dispatch = useAppDispatch();

  const handlePublishPost = useCallback(
    (post: IPost) => dispatch(addPost(post)),
    []
  );
  const handlePostTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) =>
      dispatch(setPostText(event.target.value)),
    []
  );
  const handleStatusChange = useCallback(
    () => dispatch(updateProfileStatus()),
    []
  );
  const handleStatusInputChange = useCallback(
    (status: string) => dispatch(setStatusInput(status)),
    []
  );

  const setProfile = useCallback(
    () => dispatch(fetchProfile(userId)),
    [userId]
  );
  const setProfileStatus = useCallback(
    () => dispatch(fetchProfileStatus(userId)),
    [userId]
  );

  const handleStatusClick = useCallback(() => {
    dispatch(setStatusEditing(true));
    dispatch(setStatusInput(profile.status ? profile.status : ""));
  }, [profile.status]);
  const handleClickAwayStatus = useCallback(
    () => dispatch(setStatusEditing(false)),
    []
  );

  const isCurrentUserProfile = userId === currentUserId;
  useEffect(() => {
    setProfile();
    setProfileStatus();
  }, [userId]);

  return (
    <div className={clsx("container", "main")}>
      {profile.isProfileFetching ? (
        <InfoSkeleton />
      ) : (
        <Info
          status={profile.status}
          statusInput={profile.statusInput}
          userName={profile.fullName}
          photos={profile.photos}
          uniqueUrlName={profile.uniqueUrlName}
          isCurrentUserProfile={isCurrentUserProfile}
          isStatusUpdating={profile.isStatusUpdating}
          isEdit={profile.isStatusEditing}
          onStatusClick={handleStatusClick}
          onClickAwayStatus={handleClickAwayStatus}
          onStatusChange={handleStatusChange}
          onStatusInputChange={handleStatusInputChange}
        />
      )}
      {profile.isProfileFetching ? (
        <div className={"preloader"}>
          <SvgSelector id="preloader" />
        </div>
      ) : (
        <>
          {isCurrentUserProfile && (
            <PostCreator
              postText={profile.postText}
              onPostTextChange={handlePostTextChange}
              onPublish={handlePublishPost}
            />
          )}
          {[...profile.posts].reverse().map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Profile;
