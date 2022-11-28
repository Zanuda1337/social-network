import { instance } from "src/api/api";
import { TDefaultResponse } from "src/api/types";
import { TGetUsersResponse } from "src/api/usersApi/usersApi.types";

const usersApi = {
  getUsers: (page: number, limit: number) =>
    instance.get<TGetUsersResponse>(`users?page=${page}&count=${limit}`),
  follow: (userId: number) =>
    instance.post<TDefaultResponse>(`follow/${userId}`),
  unfollow: (userId: number) =>
    instance.delete<TDefaultResponse>(`follow/${userId}`),
};

export default usersApi;
