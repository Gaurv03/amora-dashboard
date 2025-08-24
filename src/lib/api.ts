import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

// Define the base URL for your API
const BASE_URL = import.meta.env.VITE_API_KEY;

type BaseResponse<T> = {
  response: any;
  status: number;
  statusCode?: number;
  message: string;
  data?: T;
  pagination?: T;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const onUnauthorized = {
  listeners: [] as (() => void)[],
  subscribe(fn: () => void) {
    this.listeners.push(fn);
  },
  emit() {
    this.listeners.forEach((fn) => fn());
  },
};

export const apiCall = async <T, R>(
  endpoint: string,
  method: "get" | "post" | "put" | "delete",
  body?: R,
  headers?: Record<string, string>
): Promise<BaseResponse<T>> => {
  const isGet = method === "get";
  const isFormUrlEncoded =
    headers?.["Content-Type"] === "application/x-www-form-urlencoded";

  let params: any = undefined;
  let data: any = undefined;

  if (isGet) {
    // Handle GET: support query string, URLSearchParams, or object
    if (typeof body === "string") {
      params = Object.fromEntries(new URLSearchParams(body));
    } else if (body instanceof URLSearchParams) {
      params = Object.fromEntries(body);
    } else if (body && typeof body === "object") {
      params = body;
    }
    // No data for GET
  } else {
    // Handle POST/PUT: support form or JSON
    if (isFormUrlEncoded) {
      if (typeof body === "string") {
        data = body;
      } else if (body instanceof URLSearchParams) {
        data = body.toString();
      } else if (body && typeof body === "object") {
        data = new URLSearchParams(body as any).toString();
      }
    } else {
      data = body;
    }
  }

  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    headers: { ...authHeader(), ...headers },
    ...(params ? { params } : {}),
    ...(data ? { data } : {}),
  };

  try {
    const response: AxiosResponse<BaseResponse<T>> =
      await axiosInstance.request<BaseResponse<T>>(config);
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      onUnauthorized.emit();
      return {
        status: 401,
        message: "Unauthorized",
        data: undefined,
        response: error.response,
      };
    }
    return {
      status: error?.response?.status || 500,
      message: error?.message || "Unknown error",
      data: undefined,
      response: error?.response,
    };
  }
};

export default axiosInstance;

export function authHeader() {
  const user = localStorage.getItem("auth_token");
  if (user) {
    return { Authorization: `Bearer ${user}` };
  }
  return {};
}
