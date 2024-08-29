import axiosInstance from "@/configs/axios/axiosConfig";
import { useEffect, useState } from "react";

interface ItemData {
  market: string;
  korean_name: string;
  english_name: string;
}

type ItemResult = {
  KRW: ItemData[];
  BTC: ItemData[];
  USDT: ItemData[];
};

export interface ChartParam {
  market: string; // 코드
  unit: number | null; // 분 단위 (1, 3, 5 ,10, 15, 30, 60 240)
  count: number; // 캔들 개수 (최대 200개)
  convertingPriceUnit: string; // 화폐 단위 (ex. KRW)
  to: Date | null; // 마지막 캔들 시각, 비워서 요청 시 가장 최근 캔들
  type: string; // 구분자 (minutes, days, weeks, months)
}

export type ChartResult = {
  market: string;
  candle_date_time_utc: Date;
  candle_date_time_kst: Date;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
};

// 업비트 종목 조회 API
export const useUpbitMarket = () => {
  const [dataList, setDataList] = useState<ItemResult>();
  const [KRWList, setKRWList] = useState<ItemData[]>([]);
  const [BTCList, setBTCList] = useState<ItemData[]>([]);
  const [USDTList, setUSDTList] = useState<ItemData[]>([]);

  const upbitMarketApi = async () => {
    try {
      const response = await axiosInstance.get("/upbit-api/v1/market/all");
      const data: ItemData[] = response.data;
      const KRW: ItemData[] = [];
      const BTC: ItemData[] = [];
      const USDT: ItemData[] = [];

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

// 업비트 시세 조회 API
export const useUpbitChart = () => {
  const [dataList, setDataList] = useState<ChartResult[]>();

  const upbitChartApi = async (param: ChartParam) => {
    try {
      const BASE_PATH = "/upbit-api/v1/candles/";
      let CHART_PATH = BASE_PATH + param.type;
      if (param.type === "minutes") {
        CHART_PATH += "/" + param.unit;
      }
      const response = await axiosInstance.get(CHART_PATH, { params: param });
      setDataList(response.data);
    } catch (error) {
      console.error("오류:", error);
    }
  };

  return {
    upbitChartApi,
    dataList,
  };
};
