import axiosInstance from "@/configs/axios/axiosConfig";
import { useAuth } from "@/router/AuthContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export type FollowReq = {
  targetId: string;
};

export type FollowingRes = {
  userId: string;
  name: string;
  profilePicUrl: string | null;
  userGrade: string;
};

// 팔로우하기 API
export const useFollow = () => {
  const { accessToken } = useAuth();
  const { toast } = useToast();
  const followApi = async (param: FollowReq) => {
    try {
      await axiosInstance.post(`/api/my-page/follow`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast({
        description: "팔로우 하였습니다.",
        duration: 2000,
      });
      return true;
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
      return false;
    }
  };

  return {
    followApi,
  };
};

// 팔로잉 목록 API
export const useFollowingList = () => {
  const { accessToken } = useAuth();
  const { toast } = useToast();
  const [followingList, setFollowingList] = useState<FollowingRes>();
  const followingListApi = async () => {
    try {
      const response = await axiosInstance.get(`/api/my-page/followings`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "팔로잉 목록 조회 중 오류가 발생했습니다.";
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
    followingListApi,
    followingList,
  };
};
