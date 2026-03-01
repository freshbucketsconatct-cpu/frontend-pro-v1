import { AxiosRequestConfig } from "axios";

export interface ApiCallParams extends AxiosRequestConfig {
  headers?: Record<string, string>;
}

export interface ErrorResponse {
  message: string;
}

export interface ErrResponse {
  message?: string;
  data: { message: string };
}
