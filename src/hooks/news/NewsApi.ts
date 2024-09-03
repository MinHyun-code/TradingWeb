import axiosInstance from "@/configs/axios/axiosConfig";
import { useState } from "react";
import { XMLParser } from "fast-xml-parser";

// RSS 피드의 기본 구조를 정의
interface RssFeed {
  rss: {
    $: {
      version: string;
    };
    channel: Channel;
  };
}

interface Channel {
  title: string;
  link: string;
  description: string;
  item: Item[];
}

export interface Item {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  "media:content"?: MediaContent;
}

interface MediaContent {
  "@_url": string; // URL 속성의 이름에 맞추어 타입 정의
  "@_medium"?: string;
}

// 뉴스 조회 API
export const useNewsList = () => {
  const [dataList, setDataList] = useState<RssFeed>();

  const newsListApi = async (path: string) => {
    try {
      const response = await axiosInstance.get(path);

      // XML 파서 설정
      const parser = new XMLParser({
        ignoreAttributes: false, // 네임스페이스 포함
        attributeNamePrefix: "@_",
      });

      // XML 문자열을 JavaScript 객체로 변환
      setDataList(parser.parse(response.data));
    } catch (error) {
      console.error("데이터 요청 오류:", error);
    }
  };

  return {
    newsListApi,
    dataList,
  };
};
