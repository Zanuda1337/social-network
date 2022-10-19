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
