export interface IPost {
  id: number;
  authorId: number;
  authorName: string;
  date: number;
  postText: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
}
export interface IGetProfileResponse extends TProfile {}
export type TProfile = {
  userId: number;
  aboutMe: string | null;
  contacts: {
    facebook: string | null;
    website: string | null;
    vk: string | null;
    twitter: string | null;
    instagram: string | null;
    youtube: string | null;
    github: string | null;
    mainLink: string | null;
  };
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string;
  photos: {
    small: string | null;
    large: string | null;
  };
};
