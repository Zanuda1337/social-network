import React, { useCallback, useEffect, useState } from "react";
import classes from "./Users.module.scss";
import clsx from "clsx";
import User from "src/features/Users/User/User";
import {
  fetchUsersApi,
  follow,
  followApi,
  unfollow,
  unfollowApi,
} from "src/features/Users/Users.slice";
import { TOption } from "src/components/Select/Select.types";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import Pagination from "src/features/Users/Pagination/Pagination";
import UsersSkeleton from "src/features/Users/UsersSkeleton";
import { getTotalPages } from "src/features/Users/Users.utils";

const Users: React.FC = () => {
  const [users, totalCount, isUsersFetching, followingInProgressList] =
    useAppSelector((state) => [
      state.users.usersList,
      state.users.totalCount,
      state.users.isUsersFetching,
      state.users.followingInProgressList,
    ]);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(30);

  const setUsers = useCallback(
    (page: number, limit: number) =>
      dispatch(fetchUsersApi({ page: page, limit: limit })),
    [dispatch, page, limit]
  );
  const handleFollowClick = useCallback(
    (id: number) => dispatch(follow(id)),
    [dispatch]
  );
  const handleUnfollowClick = useCallback(
    (id: number) => dispatch(unfollow(id)),
    [dispatch]
  );
  const handleIncrementPage = useCallback(() => {
    setPage(page + 1);
    setUsers(page + 1, limit);
  }, [page, limit, dispatch]);
  const handleDecrementPage = useCallback(() => {
    setPage(page - 1);
    setUsers(page - 1, limit);
  }, [page, limit, dispatch]);
  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      setUsers(newPage, limit);
    },
    [dispatch, limit]
  );
  const handleLimitChange = useCallback(
    (value: number) => {
      setLimit(value);
      if (page > getTotalPages(value, totalCount)) {
        setPage(getTotalPages(value, totalCount));
        setUsers(getTotalPages(value, totalCount), value);
        return;
      }
      setUsers(page, value);
    },
    [page, totalCount]
  );

  const limitOptions: TOption[] = [
    { value: 90, label: "90" },
    { value: 60, label: "60" },
    { value: 30, label: "30" },
  ];

  useEffect(() => {
    setUsers(page, limit);
  }, []);

  return (
    <div className={clsx("container", "main", classes["users-container"])}>
      <div className={clsx("block", classes.wrapper)}>
        <div className={classes.header}>
          <p className={classes.text}>Filter: friends</p>
          <button className={clsx("more", classes.more)}>
            <div></div>
          </button>
        </div>
        <div className={classes.users}>
          {isUsersFetching ? (
            <UsersSkeleton />
          ) : (
            users.map((user) => (
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
        <Pagination
          totalCount={totalCount}
          totalPages={getTotalPages(limit, totalCount)}
          page={page}
          bunchCount={users.length}
          limit={limit}
          limitOptions={limitOptions}
          onIncrementPage={handleIncrementPage}
          onDecrementPage={handleDecrementPage}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </div>
    </div>
  );
};

export default Users;
