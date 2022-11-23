import { instance } from "src/api/api";
import { IAuthMeResponse, ILoginResponse } from "src/api/authApi/authApi.types";
import { TDefaultResponse } from "src/api/types";

const authApi = {
  me: () => instance.get<IAuthMeResponse>(`auth/me`),
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
  ) => {
    const data = {
      email,
      password,
      rememberMe,
    };
    return instance.post<ILoginResponse>(
      `auth/login`,
      captcha ? { ...data, captcha } : data
    );
  },
  logout: () => instance.delete<TDefaultResponse>("auth/login"),
  getCaptcha: () => instance.get<{ url: string }>("security/get-captcha-url"),
};

export default authApi;
