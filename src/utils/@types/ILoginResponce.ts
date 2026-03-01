import { ICommonResponse } from "./ICommonResponse";

export interface ILoginResponce extends ICommonResponse {
  data: {
    id: string;
    user_id: number;
    email: string;
    Role: string;
    avatar: string | null;
    token: string;
  };
}

export interface ILoginRequest {
  email: string;
  password: string;
}
