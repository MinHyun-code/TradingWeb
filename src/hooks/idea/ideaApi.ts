import axiosInstance from "@/configs/axios/axiosConfig";
import { useAuth } from "@/router/AuthContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export interface boardData {
  boardId: string;
  heroImgUrl: string;
  subject: string;
  contents: string;
  cretName: string;
  cretUserGrade: string;
  cretDatetime: string;
  cretId: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tagList: string[];
  youLike: boolean;
  youBlock: boolean;
  youAreFollowing: boolean;
};

export type listReq = {
  page: number;
  pageSize: number;
  code?: string;
  type?: string;
};

export type boardAddReq = {
  subject: string;
  contents: string;
  tagList: string[] | null;
};

// 아이디어 조회 API
export const useIdeaList = () => {
  const { accessToken, isAuthenticated } = useAuth();

  const ideaListApi = async (param: listReq) => {
    try {
      if (isAuthenticated === true) {
        const response = await axiosInstance.get("/api/boards", {
          params: param,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data.result.boardList;
      } else {
        const response = await axiosInstance.get(`/api/boards`, {
          params: param,
        });
        return response.data.result.boardList;
      }
    } catch (error) {
      console.error("데이터 요청 오류:", error);
      throw error;
    }
  };

  return {
    ideaListApi
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
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { toast } = useToast();
  const ideaLikeToggleApi = async (param: string) => {
    try {
      // 로그인 안했을 경우 로그인 화면으로 이동
      if(accessToken === null) {
        navigate("/login");
        return;
      }
      await axiosInstance.post(
        `/api/boards/toggle-like`,
        { boardId: param },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return true;
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
      return false;
    }
  };

  return {
    ideaLikeToggleApi,
  };
};
