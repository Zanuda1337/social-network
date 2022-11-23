export interface IAuthMeResponse {
  data: {
    id: number;
    login: string;
    email: string;
  };
  resultCode: number;
  messages: string[];
}

export interface ILoginResponse {
  resultCode: number;
  messages: string[];
  data: { userId: number } | {};
}
