import { TProfile } from "src/features/Profile/Profile.types";

export interface IGetProfileResponse extends TProfile {
  message?: string;
}
