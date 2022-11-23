import React, { useCallback, useEffect } from "react";
import Info from "src/features/Profile/Info/Info";
import PostCreator from "src/features/Profile/PostCreator/PostCreator";
import Post from "src/features/Profile/Post/Post";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import {
  addPost,
  getProfileData,
  profileSelector,
  setPostText,
  setStatusEditing,
  setStatusInput,
  putProfileStatus,
  updateProfileStatus,
} from "./Profile.slice";
import { IPost } from "src/features/Profile/Profile.types";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import InfoSkeleton from "src/features/Profile/Info/InfoSkeleton";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import { userIdSelector } from "src/features/Auth/Auth.slice";

const Profile: React.FC = () => {
  const userId = Number(useParams().id);
  const profile = useAppSelector(profileSelector);
  const currentUserId = useAppSelector(userIdSelector);
  const dispatch = useAppDispatch();

  const handlePublishPost = useCallback(
    (post: IPost) => dispatch(addPost(post)),
    []
  );
  const handlePostTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) =>
      dispatch(setPostText(event.target.value)),
    [dispatch]
  );
  const handleStatusChange = useCallback(
    () => dispatch(updateProfileStatus()),
    [dispatch]
  );
  const handleStatusInputChange = useCallback(
    (status: string) => dispatch(setStatusInput(status)),
    [dispatch]
  );

  const getProfile = useCallback(
    () => dispatch(getProfileData(userId)),
    [userId, dispatch]
  );

  const handleStatusClick = useCallback(() => {
    dispatch(setStatusEditing(true));
    dispatch(setStatusInput(profile.status ? profile.status : ""));
  }, [profile.status, dispatch]);
  const handleClickAwayStatus = useCallback(
    () => dispatch(setStatusEditing(false)),
    [dispatch]
  );

  const isCurrentUserProfile = userId === currentUserId;
  useEffect(() => {
    getProfile();
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
