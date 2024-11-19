import axiosInstance from "@/configs/axios/axiosConfig";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export type reportFormReq = {
  cretName: string;
  title: string;
  targetType: string;
  targetId: string;
}

export type reportReq = {
  targetType: string;
  targetId: string;
  contents: string;
}



// 사용자 신고
export const useReport = () => {
  const { toast } = useToast();
  const reportApi = async (param: reportReq) => {
    try {
      await axiosInstance.get(`/user-reports`, {
        params: param,
      });
      toast({
        description: '신고되었습니다.',
        duration: 2000,
      });
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
        error.response.data?.result?.message ||
        "신고 등록 중 오류가 발생했습니다.";
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
    reportApi
  };
};
