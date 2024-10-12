import axiosInstance from "@/configs/axios/axiosConfig";
import { useState } from "react";
import { useAuth } from "@/router/AuthContext";

export type feedListReq = {
  page: number;
  pageSize: number;
  code?: string;
  type?: string;
};

// type feedListRes = {
//   totalElements: number;
//   pageable: pageable;
//   last: boolean;
//   feedList: feedData[];
// };

// type pageable = {
//   pageNumber: number;
//   pageSize: number;
// };

export type feedData = {
  feedId: string;
  coinId: string;
  coinCode: string;
  coinName: string;
  coinImgUrl: string | null;
  subject: string;
  contents: string;
  cretId: string;
  createdByName: string;
  createdByProfilePicUrl: string;
  createdDatetime: string;
  createdByUserGrade: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tagList: string[];
  youLike: boolean;
  youBlock: boolean;
  youAreFollowing: boolean;
};

// 아이디어 조회 API
export const useFeedList = () => {
  const [feedList, setFeedList] = useState<feedData[]>();
  const { accessToken, isAuthenticated } = useAuth();

  const feedListApi = async (param: feedListReq) => {
    try {
      if (isAuthenticated === true) {
        const response = await axiosInstance.get("/api/feeds", {
          params: param,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setFeedList(response.data.result.feedList);
      } else {
        const response = await axiosInstance.get(`/api/feeds`, {
          params: param,
        });
        setFeedList(response.data.result.feedList);
      }
    } catch (error) {
      console.error("데이터 요청 오류:", error);
    }
  };

  return {
    feedListApi,
    feedList,
  };
};
