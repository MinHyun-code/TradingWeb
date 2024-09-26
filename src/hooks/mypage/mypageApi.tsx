import axiosInstance from "@/configs/axios/axiosConfig";
import { useState } from "react";
import { useAuth } from "@/router/AuthContext";

// 팔로우하기 API
export const useIdeaAdd = () => {
  const { accessToken } = useAuth();
  const ideaAddApi = async (param: boardAddReq) => {
    console.log(accessToken);
    try {
      const response = await axiosInstance.post(`/api/boards`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.data.result.boardList);
    } catch (error) {
      console.error("데이터 요청 오류:", error);
    }
  };

  return {
    ideaAddApi,
  };
};
