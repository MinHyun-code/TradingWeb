import axiosInstance from "@/configs/axios/axiosConfig";
import { useEffect, useState } from "react";
import { useAuth, isAuthenticated } from "@/router/AuthContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export type boardData = {
  boardId: string;
  heroImgUrl: string;
  subject: string;
  contents: string;
  cretName: string;
  cretUserGrade: string;
  cretDatetime: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tagList: string[];
  youLike: boolean;
  youBlock: boolean;
  youAreFollowing: boolean;
};

export type boardListReq = {
  page: number;
  pageSize: number;
};

export type boardAddReq = {
  subject: string;
  contents: string;
  tagList: string[] | null;
};

// 아이디어 조회 API
export const useIdeaList = () => {
  const [dataList, setDataList] = useState<boardData[]>();
  const { accessToken, isAuthenticated } = useAuth();

  const ideaListApi = async (param: boardListReq) => {
    try {
      if (isAuthenticated === true) {
        const response = await axiosInstance.get("/api/boards", {
          params: param,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setDataList(response.data.result.boardList);
      } else {
        const response = await axiosInstance.get(`/api/boards`, {
          params: param,
        });
        setDataList(response.data.result.boardList);
      }
    } catch (error) {
      console.error("데이터 요청 오류:", error);
    }
  };

  return {
    ideaListApi,
    dataList,
  };
};

// 아이디어 추가 API
export const useIdeaAdd = () => {
  const { accessToken } = useAuth();
  const ideaAddApi = async (param: boardAddReq) => {
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

// 좋아요 토글 API
export const useIdeaLikeToggle = () => {
  const { accessToken } = useAuth();
  const { toast } = useToast();
  const [result, setResult] = useState<boolean>(false);
  const ideaLikeToggleApi = async (param: string) => {
    try {
      await axiosInstance.post(
        `/api/boards/toggle-like`,
        { boardId: param },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setResult(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "좋아요 중 오류가 발생했습니다.";
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
    ideaLikeToggleApi,
    result,
  };
};
