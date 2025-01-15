import { useState, useEffect, useRef, useCallback } from "react";
import { ItemData } from "../upbit/UpbitApi";

export type CoinData = {
  market: string;
  type: string;
  code: string;
  trade_date: string;
  trade_time: string;
  trade_timestamp: number;
  trade_price: number;
  trade_volume: number;
  ask_bid: string;
};

const useWebSocketGrid = (url: string, dataList: ItemData[]) => {
  const [data, setData] = useState<CoinData[]>([]);
  const wsRef = useRef<WebSocket | null>(null); // WebSocket 인스턴스를 저장
  const previousDataListRef = useRef<ItemData[]>([]); // 이전 dataList를 저장하여 불필요한 재연결 방지
  const previousDataRef = useRef<CoinData[]>([]); // 이전 데이터 값을 추적하여 중복 업데이트 방지

  // 데이터 변경 시 WebSocket 메시지 전송
  const sendWebSocketMessage = useCallback((ws: WebSocket, dataList: ItemData[]) => {
    const codes = dataList.map((item) => item.market);
    const message = JSON.stringify([
      { ticket: "test" },
      { type: "trade", codes },
    ]);
    ws.send(message);
  }, []);

  useEffect(() => {
    // dataList가 비어있으면 WebSocket 연결을 만들지 않음
    if (!dataList || dataList.length === 0) return;

    // dataList가 변경되었을 때만 WebSocket 연결을 생성하고 재연결을 최소화
    if (JSON.stringify(previousDataListRef.current) !== JSON.stringify(dataList)) {
      if (wsRef.current) {
        wsRef.current.close(); // 기존 WebSocket 연결 종료
      }

      const ws = new WebSocket(url);
      wsRef.current = ws; // 새로운 WebSocket 연결 저장

      ws.onopen = () => {
        console.log("WebSocket connected");
        sendWebSocketMessage(ws, dataList); // 연결 후 WebSocket 메시지 전송
      };

      ws.onmessage = (event) => {
        try {
          let messageData = event.data;

          if (messageData instanceof Blob) {
            messageData = messageData.text(); // Blob을 텍스트로 변환
          }

          messageData.then((textData: string) => {
            const parsedData: CoinData[] = JSON.parse(textData); // JSON 파싱

            // 이전 데이터와 비교하여 변경된 경우에만 상태 업데이트
            if (JSON.stringify(parsedData) !== JSON.stringify(previousDataRef.current)) {
              setData(parsedData); // 데이터가 변경된 경우만 상태 업데이트
              previousDataRef.current = parsedData; // 이전 데이터 갱신
            }
          });
        } catch (error) {
          console.error("Error parsing WebSocket data", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
      };

      // 이전 dataList 값을 추적하여 불필요한 WebSocket 연결을 방지
      previousDataListRef.current = dataList;

      return () => {
        if (wsRef.current) {
          wsRef.current.close(); // 컴포넌트 unmount 시 WebSocket 연결 종료
        }
      };
    }
  }, [url, dataList, sendWebSocketMessage]); // dataList 변경 시에만 실행

  return { data };
};

export default useWebSocketGrid;
