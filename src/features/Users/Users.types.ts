export type TFrontendUser = {
  id: number;
  name: string;
  uniqueUrlName: string | null;
  photos: { small: null | string; large: null | string };
  isFollowed: boolean;
};
