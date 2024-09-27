import axiosInstance from "@/configs/axios/axiosConfig";
import { useAuth } from "@/router/AuthContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

type FollowAddReq = {
  targetId: string;
};

// 팔로우하기 API
export const useFollowAdd = () => {
  const { accessToken } = useAuth();
  const { toast } = useToast();
  const [result, setResult] = useState<boolean>(false);
  const followAddApi = async (param: FollowAddReq) => {
    try {
      await axiosInstance.post(`/my-page/follow`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setResult(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "팔로우 중 오류가 발생했습니다.";
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
  useEffect(() => {}, [result]);

  return {
    followAddApi,
    result,
  };
};
