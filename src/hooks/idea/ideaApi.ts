import axiosInstance from "@/configs/axios/axiosConfig";
import { useState } from "react";
import { XMLParser } from "fast-xml-parser";

interface boardListRes {
  boardList: boardData[];
}

type boardData = {
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

// 아이디어 조회 API
export const useIdeaList = () => {
  const [dataList, setDataList] = useState<boardListRes>();

  const IdeaListApi = async (param: boardListReq) => {
    try {
      const response = await axiosInstance.get(`/api/boards`, {
        params: param,
      });

      console.log(response);
    } catch (error) {
      console.error("데이터 요청 오류:", error);
    }
  };

  return {
    IdeaListApi,
    dataList,
  };
};
