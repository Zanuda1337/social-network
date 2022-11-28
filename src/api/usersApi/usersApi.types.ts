export type TBackendUser = {
  followed: boolean;
  id: number;
  name: string;
  uniqueUrlName: string | null;
  photos: { small: null | string; large: null | string };
};

export type TGetUsersResponse = {
  error: null | string;
  items: TBackendUser[];
  totalCount: number;
};
