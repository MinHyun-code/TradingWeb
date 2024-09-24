import axiosInstance from "@/configs/axios/axiosConfig";
import { useState } from "react";

export type boardData = {
  boardId: string;
  heroImgUrl: string;
  subject: string;
  contents: string;
  cretName: string;
  cretUserGrade: string;
  cretDataTime: Date;
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
  tagList: string[];
};

// 아이디어 조회 API
export const useIdeaList = () => {
  const [dataList, setDataList] = useState<boardData[]>();

  const ideaListApi = async (param: boardListReq) => {
    try {
      const response = await axiosInstance.get(`/api/boards`, {
        params: param,
      });

      console.log(response.data.result.boardList);

      setDataList(response.data.result.boardList);
    } catch (error) {
      console.error("데이터 요청 오류:", error);
    }
  };

  return {
    ideaListApi,
    dataList,
  };
};

// 아이디어 조회 API
export const useIdeaAdd = () => {
  const ideaAddApi = async (param: boardAddReq) => {
    try {
      const response = await axiosInstance.post(`/api/boards`, param, {
        headers: {
          Authorization: "Bearer your-token",
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
