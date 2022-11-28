import React, { useCallback, useEffect, useState } from "react";
import classes from "./Users.module.scss";
import clsx from "clsx";
import User from "src/features/Users/User/User";
import {
  clearUsers,
  fetchUsers,
  follow,
  unfollow,
  usersSelector,
} from "src/features/Users/Users.slice";
import { TOption } from "src/components/Select/Select.types";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import UsersSkeleton from "src/features/Users/UsersSkeleton";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import { LIMIT } from "src/features/Users/Users.consts";

const Users: React.FC = () => {
  const { usersList, isUsersFetching, followingInProgressList } =
    useAppSelector(usersSelector);
  const dispatch = useAppDispatch();

  const [portion, setPortion] = useState<number>(1);

  const setUsers = useCallback(
    (page: number, limit: number) => {
      setPortion(page + 1);
      dispatch(fetchUsers({ page: page, limit: limit }));
    },
    [dispatch, portion]
  );
  const handleFollowClick = useCallback(
    (id: number) => dispatch(follow(id)),
    [dispatch]
  );
  const handleUnfollowClick = useCallback(
    (id: number) => dispatch(unfollow(id)),
    [dispatch]
  );

  useEffect(() => {
    dispatch(clearUsers());
    setUsers(portion, LIMIT);
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;
    const handleScroll = () => {
      const bodyHeight = body.scrollHeight - window.innerHeight;
      if (bodyHeight - window.scrollY <= 600 && !isUsersFetching) {
        setUsers(portion, LIMIT);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [isUsersFetching]);

  return (
    <div className={clsx("container", "main", classes["users-container"])}>
      <div className={clsx("block", classes.wrapper)}>
        <div className={classes.header}>
          <p className={classes.text}>Filter: friends</p>
          <button className={clsx("more", classes.more)}>
            <div />
          </button>
        </div>
        <div className={classes.users}>
          {isUsersFetching && !usersList.length ? (
            <UsersSkeleton />
          ) : (
            usersList.map((user) => (
              <User
                key={user.id}
                id={user.id}
                name={user.name}
                uniqueUrlName={user.uniqueUrlName}
                photos={user.photos}
                isFollowed={user.isFollowed}
                followingInProgressList={followingInProgressList}
                onFollowClick={handleFollowClick}
                onUnfollowClick={handleUnfollowClick}
              />
            ))
          )}
        </div>
        <div className={classes.preloader}>
          {isUsersFetching && <SvgSelector id="preloader-small" />}
        </div>
        )
      </div>
    </div>
  );
};

export default Users;
