import axiosInstance from "@/configs/axios/axiosConfig";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export interface ItemData {
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

export type upbitPriceRes = {
  english_name: string;
  market: string;
  trade_date?: string;
  trade_time?: string;
  trade_date_kst?: string;
  trade_time_kst?: string;
  trade_timestamp?: number;
  opening_price?: number;
  high_price?: number;
  low_price?: number;
  trade_price?: number;
  prev_closing_price?: number;
  change?: string;
  change_price?: number;
  change_rate?: number;
  signed_change_price?: number;
  signed_change_rate?: number;
  trade_volume?: number;
  acc_trade_price?: number;
  acc_trade_price_24h?: number;
  acc_trade_volume?: number;
  acc_trade_volume_24h?: number;
  highest_52_week_price?: number;
  highest_52_week_date?: string;
  lowest_52_week_price?: number;
  lowest_52_week_date?: string;
  timestamp?: number;
}

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


// 업비트 시세 단일 건 조회 API
export const useUpbitPrice = () => {
  const { toast } = useToast();
  const [priceList, setPriceList] = useState<upbitPriceRes[]>();

  const upbitPriceApi = async (coinList: ItemData[]) => {
    try {
      const param = coinList.map((coin) => coin.market).join(",");

      setPriceList(coinList.map((item) => ({
        market: item.market,
        english_name: item.english_name,
      })));

      const response = await axiosInstance.get(`/upbit-api/v1/ticker?markets=`+param);

      // setPriceList(response.data)
      setPriceList((prevList) => {
        return response.data.reduce((updatedList, newCoin) => {
          // 기존 리스트에서 해당 market 값이 있는지 확인
          const existingCoin = updatedList.find((coin) => coin.market === newCoin.market);
  
          if (existingCoin) {
            // 기존 값이 있으면 업데이트 (예시로 trade_price만 업데이트)
            return updatedList.map((coin) =>
              coin.market === newCoin.market
                ? { ...coin, 
                  trade_price: newCoin.trade_price,
                  trade_volume: newCoin.trade_volume,
                  acc_trade_price_24h: newCoin.acc_trade_price_24h,
                }  // 필요한 값만 업데이트
                : coin
            );
          } else {
            // 기존 값이 없으면 새로운 coin 추가
            return [...updatedList, newCoin];
          }
        }, prevList); // prevList는 이전 priceList 상태
      });
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
        error.response.data?.result?.message ||
        "시세 조회 중 오류가 발생했습니다.";
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
    upbitPriceApi,
    priceList
  };
};
