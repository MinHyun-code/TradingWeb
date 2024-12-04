import React, { useState, useEffect, useCallback } from "react";
import useWebSocket from "@/hooks/webSocket/WebSocketGrid";
import { ItemData, useUpbitMarket, useUpbitPrice } from "@/hooks/upbit/UpbitApi";
import { FixedSizeList as List } from 'react-window';

type CoinData = {
  logo?: string;
  coin: string;
  trade_price: number;
  trade_percent: number;
  acc_trade_price_24h?: number;
};

const CoinGrid: React.FC = () => {
  const { upbitMarketApi, dataList } = useUpbitMarket();
  const { upbitPriceApi, priceList } = useUpbitPrice();
  const [coinData, setCoinData] = useState<CoinData[]>([]);
  const [isWebSocketReady, setIsWebSocketReady] = useState(false);

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
        priceList.map((item) => ({
          coin: item.market,
          logo: `/images/coin/${item.english_name.replace(" ", "-").toLowerCase()}.png`,
          trade_price: item.trade_price,
          trade_percent: item.trade_percent,
          acc_trade_price_24h: item.acc_trade_price_24h,
        }))
      );
      setIsWebSocketReady(true);
    }
  }, [priceList]);

  const { data } = useWebSocket(
    "wss://api.upbit.com/websocket/v1",
    isWebSocketReady ? dataList?.KRW : null
  );

  const processData = useCallback((newData: any) => {
    try {
      const parsedData = typeof newData === "string" ? JSON.parse(newData) : newData;

      if (parsedData.code && parsedData.trade_price && parsedData.trade_volume) {
        const updatedData: CoinData = {
          coin: parsedData.code,
          trade_price: parsedData.trade_price,
          trade_percent: (parsedData.trade_price-parsedData.prev_closing_price) / parsedData.prev_closing_price * 100,
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

  return (
    <div>
      <List
      height={500}
      itemCount={coinData.length}
      itemSize={50} // 각 항목의 높이
      width="100%"
      >
        {({ index, style }) => (
          <div style={style} className="flex items-center">
            <div className="w-1/12">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img
                  className="aspect-square h-full w-full"
                  alt="Image"
                  src={coinData[index].logo || "/images/no-image.png"}

                />
              </span>
            </div>
            <div className="w-2/12">{coinData[index].coin}</div>
            <div className="w-2/12">{coinData[index].trade_price}</div>
            <div className="w-3/12">{coinData[index].trade_percent}</div>
            <div className="w-3/12">{coinData[index].acc_trade_price_24h}</div>
          </div>
        )}
      </List>
    </div>
  );
};

export default CoinGrid;
