import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie, setCookie } from "../../common/Cookie";

// ApiResponse Class
type apiResponse<T> = {
  message: string;
  result: T;
};

const axiosInstance = axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    "x-appkey": import.meta.env.VITE_APP_KEY,
  },
});

// 토큰 관리 인터페이스
interface Tokens {
  accessToken: string;
}

// AxiosRequestConfig 확장하여 headers가 반드시 존재한다고 타입 지정
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  headers: {
    [key: string]: string;
  };
}

// 토큰 갱신 요청 상태
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// 토큰 갱신 후 대기 중인 요청 재시도
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 토큰 갱신 대기 큐에 추가
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// 응답 인터셉터: 401 에러 처리 및 토큰 갱신
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<apiResponse<Tokens>>) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig & { _retry?: boolean };
    // 401 에러 처리

    // 로그인은 토큰 재발급 로직 X
    if (error.response && error.response.status === 401 && originalRequest.url != '/api/auth/login') {
      if (originalRequest && !originalRequest._retry) {
        if (isRefreshing) {
          // 이미 갱신 요청 중이면 대기
          return new Promise((resolve) => {
            addRefreshSubscriber((newToken: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }

        // 새로운 토큰 갱신 요청 처리
        originalRequest._retry = true;
        isRefreshing = true;
        try {
          // Refresh Token을 사용하여 새로운 Access Token 요청
          const response = await axiosInstance.post<apiResponse<Tokens>>(
            "/api/auth/reissue-access-token", // 실제 토큰 갱신 API URL
            {
              userId: getCookie("userId"),
              refreshTokenKey: getCookie("refreshToken"),
            }
          );

          // 새 토큰 저장
          const tokens = response.data.result;

          setCookie('accessToken', tokens.accessToken, {
            path: '/',
            secure: '/',
          });

          isRefreshing = false;
          onRefreshed(tokens.accessToken);

          // 원래 요청 재시도
          if(originalRequest.url && originalRequest.url.startsWith('/api/')) {
            originalRequest.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
          }
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          window.location.href = "/login"; // 토큰 갱신 실패 시 로그인 화면으로 리디렉션
          return Promise.reject(refreshError);
        }
      }
    }

    // 403, 500 등의 다른 에러 처리
    if (error.response) {
      const { status } = error.response;
      if (status === 403) {
        console.log("403 error");
      } else if (status === 500) {
        console.log("500 error");
      }
    }

    return Promise.reject(error);
  }
);


// 요청 인터셉터 추가
axiosInstance.interceptors.request.use((config) => {
  const accessToken = getCookie("accessToken");

  // accessToken 재발급 & 로그인 API 제외 & 외부 API 호출일 경우엔 제외
  if (config.url && !config.url.includes("/api/auth/reissue-access-token") && !config.url.includes("/api/auth/login") && config.url.startsWith('/api/')) {

    // 토큰이 존재하면 Authorization 헤더에 Bearer 토큰 추가
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  else {
    config.headers["noAuth"] = true;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
