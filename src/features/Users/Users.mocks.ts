import { TGetUsersResponse } from "src/features/Users/Users.types";

export const usersMocks: TGetUsersResponse = {
  error: null,
  items: [
    {
      id: 1,
      name: "Polina",
      followed: false,
      photos: { small: null, large: null },
      uniqueUrlName: null,
    },
    {
      id: 2,
      name: "Michael",
      followed: false,
      photos: { small: null, large: null },
      uniqueUrlName: null,
    },
    {
      id: 3,
      name: "George",
      followed: true,
      photos: { small: null, large: null },
      uniqueUrlName: null,
    },
    {
      id: 4,
      name: "Richard",
      followed: false,
      photos: { small: null, large: null },
      uniqueUrlName: null,
    },
    {
      id: 5,
      name: "Violet",
      followed: false,
      photos: { small: null, large: null },
      uniqueUrlName: null,
    },
    {
      id: 6,
      name: "Tommy",
      followed: false,
      photos: { small: null, large: null },
      uniqueUrlName: null,
    },
    {
      id: 7,
      name: "Joel",
      followed: false,
      photos: { small: null, large: null },
      uniqueUrlName: null,
    },
  ],
  totalCount: 7,
};
