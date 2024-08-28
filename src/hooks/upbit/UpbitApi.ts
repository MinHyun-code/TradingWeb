import axiosInstance from "@/configs/axios/axiosConfig";
import { useEffect, useState } from "react";

interface itemData {
  market: string;
  korean_name: string;
  english_name: string;
}

type itemResult = {
  KRW: itemData[];
  BTC: itemData[];
  USDT: itemData[];
};

// 업비트 종목 조회 API
export const useUpbitMarket = () => {
  const [dataList, setDataList] = useState<itemResult>();
  const [KRWList, setKRWList] = useState<itemData[]>([]);
  const [BTCList, setBTCList] = useState<itemData[]>([]);
  const [USDTList, setUSDTList] = useState<itemData[]>([]);

  const upbitMarketApi = async () => {
    try {
      const response = await axiosInstance.get("/upbit-api/v1/market/all");
      const data: itemData[] = response.data;
      const KRW: itemData[] = [];
      const BTC: itemData[] = [];
      const USDT: itemData[] = [];

      for (const item of data) {
        const unit = item.market.split("-");
        if (unit[0] === "KRW") {
          KRW.push(item);
        } else if (unit[0] === "BTC") {
          BTC.push(item);
        } else if (unit[0] === "USDT") {
          USDT.push(item);
        }
      }

      setKRWList(KRW);
      setBTCList(BTC);
      setUSDTList(USDT);
    } catch (error) {
      console.error("오류:", error);
    }
  };

  useEffect(() => {
    // 상태가 업데이트된 후 dataList를 설정
    setDataList({
      KRW: KRWList,
      BTC: BTCList,
      USDT: USDTList,
    });
  }, [KRWList, BTCList, USDTList]);

  return {
    upbitMarketApi,
    dataList,
  };
};
