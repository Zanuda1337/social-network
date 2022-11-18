import { TBackendUser, TFrontendUser } from "src/features/Users/Users.types";

export const getTotalPages: (limit: number, totalCount: number) => number = (
  limit,
  totalCount
) => Math.ceil(totalCount / limit);

export const convertBackToFrontUsers: (
  users: TBackendUser[]
) => TFrontendUser[] = (users) =>
  users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      uniqueUrlName: user.uniqueUrlName,
      photos: user.photos,
      isFollowed: user.followed,
    };
  });
