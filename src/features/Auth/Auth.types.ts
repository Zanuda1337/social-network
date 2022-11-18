export interface IAuthMeResponse {
  data: {
    id: number;
    login: string;
    email: string;
  };
  resultCode: number;
  messages: string[];
}
