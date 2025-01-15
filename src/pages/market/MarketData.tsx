import React, { useState, useEffect, useCallback } from "react";
import useWebSocket from "@/hooks/webSocket/WebSocketGrid";
import { ItemData, useUpbitMarket, useUpbitPrice, CoinData, upbitPriceRes } from "@/hooks/upbit/UpbitApi";
import Decimal from 'decimal.js';
import MarketGrid from './MarketGrid';

const MarketData: React.FC = () => {
  const { upbitMarketApi, dataList } = useUpbitMarket();
  const { upbitPriceApi, priceList } = useUpbitPrice();
  const [coinData, setCoinData] = useState<CoinData[]>([]);
  const [isWebSocketReady, setIsWebSocketReady] = useState(false);

  const { data } = useWebSocket(
    "wss://api.upbit.com/websocket/v1",
    isWebSocketReady ? dataList?.KRW ?? [] : [] // null 또는 undefined일 때 빈 배열을 전달
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
        priceList.map((item: CoinData) => ({
          logo: item.english_name 
            ? `/images/coin/${item.english_name.replace(" ", "-").toLowerCase()}.png` 
            : "/images/no-image.png", // 만약 english_name이 undefined라면 기본 이미지로 처리
          english_name: item.english_name,
          market: item.market,
          trade_price: item.trade_price,
          trade_percent: item.trade_percent,
          acc_trade_price_24h: item.acc_trade_price_24h
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
          market: parsedData.code,
          trade_price: parsedData.trade_price,
          trade_percent: Number(new Decimal(new Decimal(new Decimal(parsedData.trade_price).minus(new Decimal(parsedData.prev_closing_price))).div(new Decimal(parsedData.prev_closing_price))).times(new Decimal(100)).toFixed(2)),
        };

        setCoinData((prevData) => {
          const existingCoin = prevData.find((coin) => coin.market === updatedData.market);

          if (
            !existingCoin ||
            existingCoin.trade_price !== updatedData.trade_price
          ) {
            return existingCoin
              ? prevData.map((coin) =>
                  coin.market === updatedData.market ? { ...coin, ...updatedData } : coin
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

  return (
    <div className="">
      <MarketGrid coinData={coinData}/>
    </div>
  );
};

export default MarketData;
