export type TBackendUser = {
  followed: boolean;
  id: number;
  name: string;
  uniqueUrlName: string | null;
  photos: { small: null | string; large: null | string };
};
export type TFrontendUser = {
  id: number;
  name: string;
  uniqueUrlName: string | null;
  photos: { small: null | string; large: null | string };
  isFollowed: boolean;
};

export type TGetUsersResponse = {
  error: null | string;
  items: TBackendUser[];
  totalCount: number;
};
