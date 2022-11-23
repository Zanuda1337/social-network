import { instance } from "src/api/api";
import { IGetProfileResponse } from "src/api/profileApi/profileApi.types";
import { TDefaultResponse } from "src/api/types";

const profileApi = {
  getProfile: (userId: number) =>
    instance.get<IGetProfileResponse>(`profile/${userId}`),
  getStatus: (userId: number) =>
    instance.get<string | null>(`profile/status/${userId}`),
  updateStatus: (status: string) =>
    instance.put<TDefaultResponse>(`profile/status`, {
      status,
    }),
};

export default profileApi;
