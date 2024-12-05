import React, { useState, useEffect, useCallback } from "react";
import useWebSocket from "@/hooks/webSocket/WebSocketGrid";
import { ItemData, useUpbitMarket, useUpbitPrice, CoinData } from "@/hooks/upbit/UpbitApi";
import Decimal from 'decimal.js';
import MarketGrid from './MarketGrid';

const MarketData: React.FC = () => {
  const { upbitMarketApi, dataList } = useUpbitMarket();
  const { upbitPriceApi, priceList } = useUpbitPrice();
  const [coinData, setCoinData] = useState<CoinData[]>([]);
  const [isWebSocketReady, setIsWebSocketReady] = useState(false);

  const { data } = useWebSocket(
    "wss://api.upbit.com/websocket/v1",
    isWebSocketReady ? dataList?.KRW : null
  );

  useEffect(() => {
    upbitMarketApi();
  }, []);

  useEffect(() => {
    if (dataList && dataList.KRW && dataList.KRW.length > 0) {
      const codes: ItemData[] = dataList.KRW.map((item) => ({
        market: item.market,
        english_name: item.english_name,
        korean_name: item.korean_name,
      }));
      upbitPriceApi(codes);
    }
  }, [dataList]);

  useEffect(() => {
    if (priceList && priceList.length > 0) {
      setCoinData(
        priceList.map((item:CoinData) => ({
          coin: item.market,
          logo: `/images/coin/${item.english_name.replace(" ", "-").toLowerCase()}.png`,
          trade_price: formatTradePrice(item.trade_price),
          trade_percent: item.trade_percent,
          acc_trade_price_24h: formatToMillion(item.acc_trade_price_24h),
        }))
      );
      setIsWebSocketReady(true);
    }
  }, [priceList]);

  const processData = useCallback((newData: any) => {
    try {
      const parsedData = typeof newData === "string" ? JSON.parse(newData) : newData;

      if (parsedData.code && parsedData.trade_price && parsedData.trade_volume) {
        const updatedData: CoinData = {
          coin: parsedData.code,
          trade_price: formatTradePrice(parsedData.trade_price),
          trade_percent: new Decimal(new Decimal(new Decimal(parsedData.trade_price).minus(new Decimal(parsedData.prev_closing_price))).div(new Decimal(parsedData.prev_closing_price))).times(new Decimal(100)).toFixed(2),
        };

        setCoinData((prevData) => {
          const existingCoin = prevData.find((coin) => coin.coin === updatedData.coin);

          if (
            !existingCoin ||
            existingCoin.trade_price !== updatedData.trade_price
          ) {
            return existingCoin
              ? prevData.map((coin) =>
                  coin.coin === updatedData.coin ? { ...coin, ...updatedData } : coin
                )
              : [...prevData, updatedData];
          }

          return prevData;
        });
      }
    } catch (error) {
      console.error("Error parsing WebSocket data", error);
    }
  }, []);

  useEffect(() => {
    if (data && isWebSocketReady) {
      processData(data);
    }
  }, [data, isWebSocketReady, processData]);

  const formatTradePrice = (number:number) => {
    if (isNaN(number)) return number; // 숫자가 아닌 경우 그대로 반환
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatToMillion = (number:number) => {
    if (typeof number !== "number" || isNaN(number)) {
      return ""; // 유효하지 않은 입력 처리
    }
    if (number >= 1_000_000) {
      const value = new Decimal(new Decimal(number).div(new Decimal(1000000))).toFixed(0); // 소수점 0자리로 고정
      return `${Number(value).toLocaleString('ko-KR')}M`;
    }
    return number.toLocaleString('ko-KR'); // 1백만 미만은 일반 스타일로 표시
  };

  return (
    <div>
      <MarketGrid coinData={coinData}/>
    </div>
  );
};

export default MarketData;
