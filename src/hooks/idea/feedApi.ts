import axiosInstance from "@/configs/axios/axiosConfig";
import { useAuth } from "@/router/AuthContext";
import { listReq } from "@/hooks/idea/ideaApi";

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

export interface feedData {
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
  const { accessToken, isAuthenticated } = useAuth();

  const feedListApi = async (param: listReq) => {
    try {
      if (isAuthenticated === true) {
        const response = await axiosInstance.get("/api/feeds", {
          params: param,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data.result.feedList;
      } else {
        const response = await axiosInstance.get(`/api/feeds`, {
          params: param,
        });
        return response.data.result.feedList;
      }
    } catch (error) {
      console.error("데이터 요청 오류:", error);
      throw error;
    }
  };

  return {
    feedListApi,
  };
};
