import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";

// ApiResponse Class
type apiResponse<> = {
  message: string;
  result: string;
};

const axiosInstance = axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    "x-appkey": import.meta.env.VITE_APP_KEY,
  },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<apiResponse, unknown>) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.log("401 error");
      } else if (status === 403) {
        console.log("403 error");
      } else if (status === 500) {
        console.log("500 error");
      }

      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
