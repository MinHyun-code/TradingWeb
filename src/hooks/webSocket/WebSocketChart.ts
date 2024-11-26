import { useState, useEffect } from "react";

export type CoinData = {
  market: string;  // 추가된 'market' 속성
  type: string;
  code: string;
  trade_date: string;
  trade_time: string;
  trade_timestamp: number;
  trade_price: number;
  trade_volume: number;
  ask_bid: string;
}

const useWebSocketChart = (url: string) => {
  const [data, setData] = useState<CoinData[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connected");
      const message = JSON.stringify([
        {
          "ticket": "test",
        },
        {
          "type": "trade",
          "codes": ["KRW-BTC"], // 관심 있는 코인 코드
        },
      ]);
      ws.send(message);
    };

    ws.onmessage = (event) => {
      // 만약 Blob 형식으로 데이터가 오면 처리
      if (event.data instanceof Blob) {
        // Blob을 텍스트로 변환
        event.data.text().then((text) => {
          try {
            const message = JSON.parse(text);
            console.log("Received data:", message);
            setData((prevData) => [...prevData, message]);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        });
      } else {
        try {
          const message = JSON.parse(event.data);
          console.log("Received data:", message);
          setData((prevData) => [...prevData, message]);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { data };
};

export default useWebSocketChart;
