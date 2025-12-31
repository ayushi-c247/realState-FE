import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { getLoggedInUserDeviceInfo } from "../tools/device-info";
import { getInitialState, removeInitialState } from "../tools/token-service";

export const createHttpInstance = (version = "v1"): AxiosInstance =>
  axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/${version}/api`,
    timeout: 240000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
export const createHttpInstanceForStudent = (version = "v2"): AxiosInstance =>
  axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/${version}/api`,
    timeout: 240000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
export const setupInterceptors = (
  httpInstance: AxiosInstance
): AxiosInstance => {
  httpInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const loggedInUserDeviceDetails = getLoggedInUserDeviceInfo();

      if (typeof window !== "undefined") {
        const token = getInitialState("token") ?? null;
        config.headers.set(
          "Authorization",
          token ? `Bearer ${String(token.toString())}` : undefined
        );
        config.headers.set(
          "user-device-details",
          JSON.stringify(loggedInUserDeviceDetails)
        );
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  httpInstance.interceptors.response.use(
    <T>(response: AxiosResponse<T>): T => response.data,
    (error) => {
      const { config, data, status } = error.response || {};
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;

        if (
          status === 401 &&
          currentPath !== "/logout" &&
          currentPath !== "/login"
        ) {
          removeInitialState();
          window.location.href = "/login";
        }

        if (status === 403 && config?.method === "get") {
          window.location.href = "/403";
        }

        if (status === 400 && config?.method === "get") {
          window.location.href = "/404";
        }

        if (status === 500 && config?.method === "get") {
          window.location.href = "/500";
        }
      }

      if (data) {
        return Promise.reject({ ...data, status });
      }

      return Promise.reject({ status, message: error.message });
    }
  );

  return httpInstance;
};

const httpJson = setupInterceptors(createHttpInstance("v1"));
const httpJsonV2 = setupInterceptors(createHttpInstanceForStudent("v2"));

export { httpJsonV2 };
export default httpJson;
