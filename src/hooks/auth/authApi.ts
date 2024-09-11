import axiosInstance from "@/configs/axios/axiosConfig";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/router/AuthContext";
import { useNavigate } from "react-router-dom";

export interface LoginData {
  email: string;
  password: string;
  authLogin: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface MailAuthData {
  email: string;
  code: string;
}

// 이메일 인증 여부 API
export const useCheckAuthEmail = () => {
  const checkAuthEmailApi = async (email: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/auth/check-email-status?email=${email}`
      );
      if (response.status === 200) {
        const emailStatus = response.data.result.emailStatus;
        return emailStatus;
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };

  return {
    checkAuthEmailApi,
  };
};

// 로그인 API
export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const loginApi = async (param: LoginData) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", param);

      if (response.status === 200) {
        toast({
          title: "로그인 되었습니다.",
          description: response.data.result.userRes.activitySummary,
          duration: 2000,
        });

        login(response.data.result.userRes.email);
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "로그인 중 오류가 발생했습니다.";
        toast({
          description: errorMessage,
          duration: 2000,
        });
      } else {
        toast({
          description: "예기치 못한 오류가 발생했습니다.",
          duration: 2000,
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
          duration: 2000,
        });
      } else {
        toast({
          description: "예기치 못한 오류가 발생했습니다.",
          duration: 2000,
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
  const navigate = useNavigate();
  const signUpApi = async (param: SignUpData) => {
    try {
      const response = await axiosInstance.post(`/api/auth/signup`, param);
      if (response.status === 200) {
        toast({
          title: "",
          description: "회원가입 되었습니다. 이메일 인증을 진행해주세요.",
          duration: 2000,
        });
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "회원가입 중 오류가 발생했습니다.";
        toast({
          description: errorMessage,
          duration: 2000,
        });
      } else {
        toast({
          description: "예기치 못한 오류가 발생했습니다.",
          duration: 2000,
        });
      }
    }
  };
  return {
    signUpApi,
  };
};

// 메일 전송 API
export const useMailSend = () => {
  const { toast } = useToast();
  const mailSendApi = async (param: string) => {
    try {
      const response = await axiosInstance.post(`/api/auth/email/send`, param);

      if (response.status === 200) {
        toast({
          title: "",
          description: "메일 전송하였습니다.",
          duration: 2000,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "메일 전송 중 오류가 발생했습니다.";
        toast({
          description: errorMessage,
          duration: 2000,
        });
      } else {
        toast({
          description: "예기치 못한 오류가 발생했습니다.",
          duration: 2000,
        });
      }
    }
  };
  return {
    mailSendApi,
  };
};

// 메일 인증 API
export const useMailAuth = () => {
  const { toast } = useToast();
  const mailAuthApi = async (param: MailAuthData) => {
    try {
      const response = await axiosInstance.post(`/api/auth/email`, param);

      if (response.status === 200) {
        toast({
          title: "",
          description: "인증 되었습니다.",
          duration: 2000,
        });

        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "메일 전송 중 오류가 발생했습니다.";
        toast({
          description: errorMessage,
          duration: 2000,
        });
      } else {
        toast({
          description: "예기치 못한 오류가 발생했습니다.",
          duration: 2000,
        });
      }
    }
  };
  return {
    mailAuthApi,
  };
};
