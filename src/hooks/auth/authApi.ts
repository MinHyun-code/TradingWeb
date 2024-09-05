import axiosInstance from "@/configs/axios/axiosConfig";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export interface LoginData {
  email: string;
  password: string;
  authLogin: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  profile: string;
}

// 로그인 API
export const useLogin = () => {
  const { toast } = useToast();

  const loginApi = async (param: LoginData) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", param);
      console.log(response);
      if (response.status === 200) {
        toast({
          title: "로그인 되었습니다.",
          description: response.data.result.userRes.activitySummary,
          duration: 3000,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "로그인 중 오류가 발생했습니다.";
        toast({
          description: errorMessage,
          duration: 3000,
        });
      } else {
        toast({
          description: "예기치 못한 오류가 발생했습니다.",
          duration: 3000,
        });
      }
      console.error("오류:", error);
    }
  };

  return {
    loginApi,
  };
};

// 구글 간편 로그인 API
export const useLoginGoogle = () => {
  const { toast } = useToast();
  const loginGoogleApi = async (token: string | undefined) => {
    try {
      const response = await axiosInstance.post(
        `/api/auth/google/verify`,
        token
      );

      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "로그인 중 오류가 발생했습니다.";
        toast({
          description: errorMessage,
          duration: 3000,
        });
      } else {
        toast({
          description: "예기치 못한 오류가 발생했습니다.",
          duration: 3000,
        });
      }
    }
  };
  return {
    loginGoogleApi,
  };
};

// 회원가입
export const useSignUp = () => {
  const { toast } = useToast();
  const signUpApi = async (param: SignUpData) => {
    try {
      const response = await axiosInstance.post(`/api/auth/signup`, param);

      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "회원가입 중 오류가 발생했습니다.";
        toast({
          description: errorMessage,
          duration: 3000,
        });
      } else {
        toast({
          description: "예기치 못한 오류가 발생했습니다.",
          duration: 3000,
        });
      }
    }
  };
  return {
    signUpApi,
  };
};
